const db = require("../../db/connection");

function createLookupObject(array, inputkey1, outputkey2) {
  const lookupObject = {};
  if (array.length === 0) return lookupObject;
  array.forEach((obj) => {
    if (!Object.keys(lookupObject).includes(obj[inputkey1])) {
        lookupObject[obj[inputkey1]] = obj[outputkey2];
    }
  });
  return lookupObject;
}


function convertTimestampToDate ({ created_at, ...otherProperties }){
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

module.exports = {convertTimestampToDate, createLookupObject}
