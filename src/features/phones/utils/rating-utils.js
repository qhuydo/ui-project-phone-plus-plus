export function countRating(ratings) {
  if (!ratings)
    return {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
  const ratingCount = [0, 0, 0, 0, 0];
  for (const rating of ratings) {
    ratingCount[(+rating.points ?? 0) - 1] += 1;
  }

  return {
    1: ratingCount[0],
    2: ratingCount[1],
    3: ratingCount[2],
    4: ratingCount[3],
    5: ratingCount[4],
  };
}
