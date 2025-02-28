const db = require("../../db/connection");

function createLookupObject(array, key1, key2){
  
}

function convertTimestampToDate ({ created_at, ...otherProperties }){
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

module.exports = {convertTimestampToDate, createLookupObject}
