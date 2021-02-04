const db = require('../models');

async function getMyReview(userID, movieID) {
  console.log('GetMyReivew', userID, movieID);
  const review = await db.reviews.findAll({
    attributes: ['userID', 'rating', 'content', 'platform'],
    where: { movieID, userID },
  });
  return review;
}

module.exports = getMyReview;
