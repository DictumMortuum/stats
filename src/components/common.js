export default ({Filter, Reduce, Init, labels = [], data}) => {
  let temp = data.filter(Filter);

  return {
    labels,
    'series': temp.reduce(Reduce, Init),
    'total': data.length,
    'sample': temp.length
  }
};
