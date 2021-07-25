export const dateSort = (a, b) => {
  let diff = new Date(b.play.date) - new Date(a.play.date)
  if (diff === 0) {
    return b.play.id - a.play.id
  } else {
    return diff
  }
}
