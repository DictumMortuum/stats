import { bgg_xmlapi, forceError, logError } from "./common";
import XMLParser from 'react-xml-parser';
import pRetry from 'p-retry';

const req = list_id => fetch(`${bgg_xmlapi}/geeklist/${list_id}`)
  .then(forceError)
  .then(res => res.text())
  .then(data => {
    var xml = new XMLParser().parseFromString(data);
    console.log(xml)
    // return xml.children.map(d => parseInt(d.attributes.objectid))
    return xml
  })

export const fetchGeeklist = list_id => pRetry(async () => req(list_id), { onFailedAttempt: logError, retries: 3 })
