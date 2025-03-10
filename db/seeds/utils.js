const db = require("../../db/connection");

function createLookupObject(array, key1, key2) {
  const lookupObject = {};
  if (array.length === 0) return lookupObject;
  array.forEach((obj) => {
    if (!Object.keys(lookupObject).includes(obj[key1])) {
        lookupObject[obj[key1]] = obj[key2];
    }
  });
  return lookupObject;
}


function convertTimestampToDate ({ created_at, ...otherProperties }){
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

module.exports = {convertTimestampToDate, createLookupObject}
