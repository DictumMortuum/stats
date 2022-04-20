export const base = 'https://raw.githubusercontent.com/DictumMortuum/json-api/master'
export const bgg_xmlapi = 'https://boardgamegeek.com/xmlapi'
export const bgg_xmlapi2 = 'https://api.geekdo.com/xmlapi2'

export const forceError = res => {
  if (res.status === 202) {
    throw new Error("impersonating an error, as we have to retry, since the request is queued on the backend now");
  } else {
    return res
  }
}

export const logError = error => {
  console.log(`Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`);
}

export const transformBggData = data => {
  const objtoid = data.children.map(d => d.attributes.objectid)
  const filtered = objtoid.filter(d => d !== undefined)
  const unique = [...new Set(filtered)]
  return unique.map(d => parseInt(d))
}
