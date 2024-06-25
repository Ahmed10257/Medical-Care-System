import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { IDoctor, IReview } from "../interfaces";

export const useDoctorData = () => {
    const { id } = useParams<{ id: string }>();
    const [dataDoctor, setDataDoctor] = useState<IDoctor | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/doctor/${id}`);
                
                
                setDataDoctor(response.data);
                setLoading(false);
            } catch (err) {
                setError("Error fetching doctor data");
                setLoading(false);
            }
        };

        fetchDoctorData();
    }, [id]);

    return { dataDoctor, loading, error };
};



export const useReviewsOfDoctor = () => {
    const { id } = useParams<{ id: string }>();
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [overallRating, setOverallRating] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [featuredReview, setFeaturedReview] = useState<IReview | null>(null);

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/reviews/doctor/${id}`);
                console.log(response.data);
                const patientReviews: IReview[] = response.data.map((review: IReview) => ({
                    patient: {
                        name: review.patient.name,
                    },
                    rating: review.rating,
                    review: review.review,
                    createdAt: review.createdAt,
                }));

                setReviews(patientReviews);

                // Calculate overall rating
                const totalRating = patientReviews.reduce((sum, review) => sum + review.rating, 0);
                const calculatedOverallRating = patientReviews.length ? totalRating / patientReviews.length : 0;
                setOverallRating(calculatedOverallRating);

                // Find the featured review (highest rated and oldest)
                const sortedReviewsByRating = [...patientReviews].sort((a, b) => {
                    if (b.rating !== a.rating) {
                        return b.rating - a.rating; 
                    } else {
                        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(); 
                    }
                });

                setFeaturedReview(sortedReviewsByRating.length > 0 ? sortedReviewsByRating[0] : null);

                setLoading(false);
            } catch (err) {
                setError("Error fetching reviews data");
                setLoading(false);
            }
        };

        fetchDoctorData();
    }, [id]);

    return { reviews, overallRating,featuredReview, loading, error};
};
