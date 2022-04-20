import { bgg_xmlapi2, forceError, logError, transformBggData } from "./common";
import XMLParser from 'react-xml-parser';
import pRetry from 'p-retry';

const req = name => fetch(`${bgg_xmlapi2}/collection?username=${encodeURIComponent(name)}&wishlist=1`)
  .then(forceError)
  .then(res => res.text())
  .then(data => {
    const xml = new XMLParser().parseFromString(data);
    return transformBggData(xml)
  })

export const fetchWishList = (name, retries) => pRetry(async () => req(name), { onFailedAttempt: logError, retries })
