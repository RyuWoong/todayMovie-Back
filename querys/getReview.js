const { reviews } = require('../models');
const db = require('../models');

async function getReview(movieID) {
  const review = await db.reviews.findAll({ attributes: ['rating', 'content', 'platform'] }, { where: movieID });
  return review;
}

module.exports = getReview;
