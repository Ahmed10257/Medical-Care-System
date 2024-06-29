import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { ICountPatientReview, IDoctor, IReview } from "../interfaces/DoctorData";

//---------------------Fetch Data Of Doctor---------------------------------------
export const useDoctorData = () => {
    const [dataDoctor, setDataDoctor] = useState<IDoctor | null>(null);
    const [loadingPage, setLoadingPage] = useState(true);
    const [error, setError] = useState<string>('');
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/doctor/${id}`);
                setDataDoctor(response.data);
                setLoadingPage(false);
            } catch (err) {
                setError("Error fetching doctor data");
                setLoadingPage(false);
            }
        };

        fetchDoctorData();
    }, [id]);

    return { dataDoctor, loadingPage, error };
};

//----------calculate avarage Rating and top old heighest rating for doctor---------
export const OverallViewRating = () => {
    const [allRating, setAllRating] = useState<IReview[]>([]);
    const [loadingPage, setLoadingPage] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [overallRating, setOverallRating] = useState<number>(0);

    const [featuredReview, setFeaturedReview] = useState<IReview | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchRatingReviews = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/reviews/doctor/${id}`);

                const patientRating: IReview[] = response.data.data.map((review: IReview) => ({
                    rating: review.rating,
                }));

                setAllRating(patientRating);

                // Calculate overall rating
                const totalRating = patientRating.reduce((sum, review) => sum + review.rating, 0);
                const calculatedOverallRating =patientRating.length? totalRating / patientRating.length :0;
                setOverallRating(Math.round(calculatedOverallRating));

                // Find the featured review (highest rated and oldest)
                const sortedReviewsByRating = allRating.sort((a, b) => {
                    if (b.rating !== a.rating) {
                        return b.rating - a.rating;
                    } else {
                        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                    }
                });

                setFeaturedReview(sortedReviewsByRating.length > 0 ? sortedReviewsByRating[0] : null);

                setLoadingPage(false);
            } catch (err) {
                setError("Error fetching doctor data");
                setLoadingPage(false);
            }
        };

        fetchRatingReviews();
    }, [id]);

    return { featuredReview,overallRating,loadingPage, error };
};

//---------------------Fetch Reviews of doctor  with limit rows (5)-------------
export const useReviewsOfDoctor = () => {
    const { id } = useParams<{ id: string }>();
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [limit,setLimit] = useState<number>(5);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        const fetchReviewsData = async () => {
            try {                                 
                const response = await axios.get(`http://127.0.0.1:3000/reviews/doctor/${id}?limit=${limit}`);

                const patientReviews: IReview[] = response.data.data.map((review: IReview) => ({
                    _id:review._id,
                    patient: { name: review.patient.name },
                    rating: review.rating,
                    review: review.review,
                    createdAt: review.createdAt,
                }));                
                setReviews(patientReviews);
                setTotal(response.data.total);

                setLoading(false);
            } catch (err) {
                setError("Error fetching reviews data");
                setLoading(false);
            }
        };

        fetchReviewsData();
    }, [id, limit]);

    return { reviews, loading, error, limit,setLimit, total };
};

//-------------------fetch count of patient make Reviews--------------------
export const useFetchCountPatientReview = () => {
    const [countPatientReview, setCountPatientReview] = useState<ICountPatientReview[]>([]);
  
    useEffect(() => {
      const fetchCount = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:3000/reviews/count-patients-per-doctor");
          setCountPatientReview(response.data);
        } catch (error) {
          console.error("Error fetching patient review count:", error);
        }
      };
  
      fetchCount();
    }, []); 
  
    return countPatientReview;
  };