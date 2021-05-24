// Inspired by: https://github.com/learn-near-programing/near-topics/blob/main/src/services/db.js

export const getCollection = async (locale = "en") => {
  return require("./data.json")[locale];
};
