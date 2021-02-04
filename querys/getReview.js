const db = require('../models');

async function getReview(movieID) {
  console.log('movieID', movieID);
  const reviews = await db.reviews.findAll({
    attributes: ['userID', 'rating', 'content', 'platform'],
    where: { movieID },
  });
  return reviews;
}

module.exports = getReview;
