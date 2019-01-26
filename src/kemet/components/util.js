

const sort = ({labels, sample, total, series: [first]}) => {
  let merged = [];
  const labels_sorted = [];
  const first_sorted = [];

  for (let i = 0; i < labels.length; i++) {
    merged.push({
      'label': labels[i],
      'score': first[i]
    });
  }

  merged = merged.sort((a, b) => b.score - a.score);

  for (let i = 0; i < merged.length; i++) {
    labels_sorted[i] = merged[i].label;
    first_sorted[i] = merged[i].score;
  }

  return {
    labels: labels_sorted,
    sample,
    total,
    series: [
      first_sorted
    ]
  };
};

export {
  sort
};