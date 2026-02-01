import { RefObject } from "react";

export type Review = {
  _id?: number
  name: string;
  review: string;
  
};

export type ReviewListProps = {
  reviewsState: Review[],
  reviewsContainerRef: RefObject<HTMLDivElement | null>,
};

export type ReviewFormProps = {
  onAddReview: (review: Review) => void;
};
