import { bgg_xmlapi, forceError, logError, transformBggData } from "./common";
import XMLParser from 'react-xml-parser';
import pRetry from 'p-retry';

const req = list_id => fetch(`${bgg_xmlapi}/geeklist/${list_id}`)
  .then(forceError)
  .then(res => res.text())
  .then(data => {
    const xml = new XMLParser().parseFromString(data);
    return transformBggData(xml)
  })

export const fetchGeeklist = (list_id, retries) => pRetry(async () => req(list_id), { onFailedAttempt: logError, retries })
