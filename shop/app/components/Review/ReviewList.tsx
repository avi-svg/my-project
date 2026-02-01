import {ReviewListProps} from '@/types/ReviewsTypes';
import ReviewCard from './ReviewCard';
import styles from './ReviewList.module.css';



const ReviewList = ({reviewsState, reviewsContainerRef}: ReviewListProps) => {
    return(
        <div className={styles.reviewList} ref={reviewsContainerRef}>
        {reviewsState.map((review) => {
            return(
            <ReviewCard 
                key={review._id}
                name={review.name}
                review={review.review}
            />
            )
        })}
      </div>
    )
}


export default ReviewList;