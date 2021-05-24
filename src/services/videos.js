// Inspired by: https://github.com/learn-near-programing/near-topics/blob/main/src/services/examples.js
import { getCollection } from "./db";

export const getAllVideos = async (locale) => {
  return await getCollection(locale);
};

export const getVideos = async (locale, limit = 3) => {
  const collection = await getCollection(locale);
  return collection.slice(0, limit);
};

export const findVideoById = async (locale, id) => {
  const videos = await getCollection(locale);
  return videos.find((video) => video.id === id);
};
