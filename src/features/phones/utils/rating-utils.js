import * as dayjs from "dayjs";
import _ from "lodash-es";

export const filterOptions = [
  {
    key: "most-relevance",
    value: "Most relevance",
  },
  {
    key: "newest",
    value: "Newest",
  },
  {
    key: "top-helpful",
    value: "Top helpful",
  },
  {
    key: "1-star",
    value: "1 ★",
  },
  {
    key: "2-star",
    value: "2 ★",
  },
  {
    key: "3-star",
    value: "3 ★",
  },
  {
    key: "4-star",
    value: "4 ★",
  },
  {
    key: "5-star",
    value: "5 ★",
  },
];

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

export function getAvgRatings(comments) {
  const total = (comments ?? []).reduce((partialSum, item) => {
    return partialSum + item.points;
  }, 0);
  const avgRating = (total / (comments?.length ?? 1)).toFixed(1);
  return isNaN(avgRating) ? "0" : avgRating;
}

export function filterCommentAsync(comments, criterion) {
  return new Promise((resolve) => {
    if (!comments || comments.length === 0) {
      return;
    }

    let result = [...comments];
    switch (criterion) {
      case "newest": {
        result = result.sort((a, b) => {
          const dayA = dayjs(a.displayTimestamp, "DD/MM/YYYY HH:mm:ss");
          const dayB = dayjs(b.displayTimestamp, "DD/MM/YYYY HH:mm:ss");
          if (dayA > dayB) return -1;
          else if (dayA < dayB) return 1;
          else return 0;
        });
        break;
      }
      case "top-helpful": {
        result = result.sort((a, b) => {
          if (a.nHelpful > b.nHelpful) return -1;
          else if (a.nHelpful < b.nHelpful) return 1;
          return 0;
        });
        break;
      }
      case "1-star": {
        result = result.filter((item) => item.points === 1);
        break;
      }
      case "2-star": {
        result = result.filter((item) => item.points === 2);
        break;
      }
      case "3-star": {
        result = result.filter((item) => item.points === 3);
        break;
      }
      case "4-star": {
        result = result.filter((item) => item.points === 4);
        break;
      }
      case "5-star": {
        result = result.filter((item) => item.points === 5);
        break;
      }
      default: {
        result = _.sortBy(result, (item) => item.id);
        break;
      }
    }

    resolve(result);
  });
}
