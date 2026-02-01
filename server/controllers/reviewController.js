const reviewModel = require('../models/reviewsModel')

const createReview = async (req, res) => {

    try {

        const { name, review } = req.body;

        const newReview = await reviewModel.createReview({ name, review });

        res.status(201).json(newReview);
    } catch (e) {
        res.status(500).json({ e: "Error while Creating new Review" });
    }
}

const getAllReviews = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    try {
        const reviews = await reviewModel.getAllReviews(page, limit);
        res.json(reviews);
    } catch (e) {
        res.status(500).json({ e: "Error while getting infromation!" })
    }
}

module.exports = {
    createReview,
    getAllReviews,
}