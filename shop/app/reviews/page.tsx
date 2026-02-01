"use client";

import { Review } from "@/types/ReviewsTypes";
import styles from "./page.module.css";
import { useState, useEffect, useRef} from "react";
import ReviewForm from "../components/Review/ReviewForm";
import ReviewList from "../components/Review/ReviewList";

const Reviews = () => {
  const [reviewsState, setReviewsState] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);

  const reviewsContainerRef = useRef<HTMLDivElement | null>(null)

  const handleAddReview = (newReview: Review) => {
    setReviewsState((prev) => {
      return [...prev, newReview];
    });
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/reviews?page=${page}&limit=5`);
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        
        const data = await response.json();


        setReviewsState((prevData) => {
          console.log(data)
          return [...prevData, ...data]
        });
        
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("unkown error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [page]);


  useEffect(() => {
    const container = reviewsContainerRef.current;
    container?.addEventListener('scroll', handelScroll);
    
    return () => {
      container?.removeEventListener('scroll', handelScroll);
    }
  }, [loading, fetching])

      const handelScroll = () => {
        if (reviewsContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = reviewsContainerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 5 && !fetching && !loading) {
                setPage((prevPage) => prevPage + 1);
            }
        }
    }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Product Reviews</h1>

      {
        loading &&<p>Loading...</p>
      }
      {
        error && <p>{error}</p>
      }

      <ReviewList reviewsState={reviewsState} reviewsContainerRef={reviewsContainerRef}/>
      <ReviewForm onAddReview={handleAddReview} />
    </div>
  );
};

export default Reviews;
