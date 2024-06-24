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

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/reviews/doctor/${id}`);
                const patientReviews: IReview[] = response.data.map((review: IReview) => ({
                    patient: {
                        name: review.patient.name,
                    },
                    rating: review.rating,
                    review: review.review,
                    createdAt: review.createdAt,
                }));
                
                setReviews(patientReviews);
                
                const totalRating = patientReviews.reduce((sum, review) => sum + review.rating, 0);
                const calculatedOverallRating = patientReviews.length ? totalRating / patientReviews.length : 0;
                setOverallRating(calculatedOverallRating);

                setLoading(false);
            } catch (err) {
                setError("Error fetching reviews data");
                setLoading(false);
            }
        };

        fetchDoctorData();
    }, [id]);

    return { reviews, overallRating, loading, error };
};
