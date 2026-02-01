import { Review, ReviewFormProps } from "@/types/ReviewsTypes";
import styles from "./ReviewForm.module.css";
import { BaseSyntheticEvent, useState } from "react";

const ReviewForm = ({ onAddReview }: ReviewFormProps) => {
  const [newReview, setNewReview] = useState<Review>({
    
    name: "",
    review: "",
  });

  const handelNewReviewNameChang = (event: BaseSyntheticEvent) => {
    const { name, value } = event.target;

    setNewReview((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handelSendReview = (event: BaseSyntheticEvent) => {
    event.preventDefault();

    if (newReview.name && newReview.review) {
        onAddReview(newReview);      
        setNewReview({
            
            name: "",
            review: "",
        });
    }
  };

  return (
    <form className={styles.reviewForm} onSubmit={handelSendReview}>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        className={styles.input}
        value={newReview.name}
        onChange={handelNewReviewNameChang}
        required
      />
      <textarea
        name="review"
        className={styles.textarea}
        placeholder="Write your review here..."
        value={newReview.review}
        onChange={handelNewReviewNameChang}
        required
      />
      <button type="submit" className={styles.button}>
        Send Review
      </button>
    </form>
  );
};

export default ReviewForm;
