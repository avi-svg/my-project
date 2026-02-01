import {Review} from "@/types/ReviewsTypes";
import styles from "./ReviewCard.module.css";



const ReviewCard = ({_id, name, review}: Review) => {
  return (
    <div key={_id} className={styles.reviewCard}>
      <h3 className={styles.reviewerName}>{name}</h3>
      <p className={styles.reviewContant}>{review}</p>
    </div>
  );
};

export default ReviewCard;