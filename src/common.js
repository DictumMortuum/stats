import { useLocation } from 'react-router-dom';

export const useParams = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search)
  const page = parseInt(params.get("page")) || 1
  const stock = params.get("stock") || 0

  return {
    page,
    stock,
    has_stock: params.has("stock"),
  }
}

export const changePage = (path, history) => (event, value) => {
  if (value === 1) {
    history.push(path)
  } else {
    history.push(path + "?page=" + value)
  }
}

/*
 * Returns the distinct elements of an array.
 */
export const unique = col => [...new Set(col)];

/*
 * Flattens an array.
 */
export const flatten = col => [].concat.apply([], col);

/*
 * Creates a flat array of the distinct elements identified by function f.
 * Useful for extracting collections of elements from the data.
 * If series length < 4, chartist has an issue with that.
 */
export const collection = data => f => {
  let temp = unique(flatten(data.filter(f).map(f)));
  let l = temp.length;

  if (l < 4) {
    return [...temp, ...Array(4 - l).fill("")];
  } else {
    return temp;
  }
};

/*
 * Returns an array from the least amount to the maximum.
 * e.g. discrete([13, 18]) => [13, 14, 15, 16, 17, 18]
 */
export const discrete = data => {
  let distinct = [...new Set(data)].sort();
  let low = distinct[0];
  let high = distinct.slice(-1);
  return Array(high - low + 1).fill(low).map((d, i) => d + i);
};

export const paginate = (array, pageSize, pageNumber) => {
  return array.slice((pageNumber-1) * pageSize, pageNumber * pageSize);
}
