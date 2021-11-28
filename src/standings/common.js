export const dateSort = (a, b) => {
  let diff = new Date(b.date) - new Date(a.date)
  if (diff === 0) {
    return b.id - a.id
  } else {
    return diff
  }
}
