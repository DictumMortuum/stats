export const pricesToGroups = data => {
  const rs = [];

  data.map(d => {
    if (rs[d.rank-1] === undefined) {
      rs[d.rank-1] = {
        ...d,
        items: []
      }
    }

    rs[d.rank-1].items.push(d)
    return d
  })

  return rs.filter(d => d.items.length > 0)
}

export const stockFilter = state => d => {
  if(state.checked) {
    return d.stock === true
  } else {
    return true
  }
}

export const boardgameFilter = state => d => {
  if(state.checked) {
    return d.items.filter(stockFilter(state)).length > 0
  } else {
    return true
  }
}

export const pricesDate = data => {
  if(data.length > 0) {
    return new Date(data[0].cr_date).toLocaleDateString('el-GR')
  } else {
    return ""
  }
}
