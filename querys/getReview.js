const { reviews } = require('../models');
const db = require('../models');

async function getReview(movieID) {
  console.log('movieID', movieID);
  const review = await db.reviews.findAll({ attributes: ['userID', 'rating', 'content', 'platform'], where: { movieID } });
  return review;
}

module.exports = getReview;
