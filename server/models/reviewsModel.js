const mongoose = require ('mongoose');

const reviewSechema = new mongoose.Schema({
    name: {type: String, required: true},
    review: {type: String, required: true},
    date: {type: Date, default: Date.now},
})

const Review = mongoose.model('Review', reviewSechema);

async function createReview(review){
    const newReview = new Review(review);
    await newReview.save();

    return newReview;
}

async function getAllReviews(page = 1, limit = 5){
    const skip = (page - 1) * limit;
    const reviews = await Review.find().skip(skip).limit(limit);
    return reviews;
}

module.exports = {
    createReview,
    getAllReviews,
}