export const pricesDate = data => {
  if(data.length > 0) {
    return new Date(data[0].cr_date).toLocaleDateString('el-GR')
  } else {
    return ""
  }
}
