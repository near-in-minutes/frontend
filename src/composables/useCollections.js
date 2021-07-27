import { ref } from "vue";
import { getAllCollections, findOneCollection } from "@/services/airtable";
import initCache from "./cache";

const cache = initCache();
const CACHE_KEY = "collections";

export function useCollections() {
  const collections = ref([]);
  const status = ref("");

  async function fetchOneCollection(id) {
    waitFor(async () => {
      return await checkCache(async () => {
        const results = await findOneCollection(id);
        return {
          id: results.id,
          ...results.fields,
        };
      }, `collection-${id}`);
    });
  }

  async function fetchAllCollections() {
    waitFor(async () => {
      return await checkCache(async () => {
        const results = await getAllCollections();
        return results.map((c) => {
          return {
            id: c.id,
            ...c.fields,
          };
        });
      });
    });
  }

  return { status, collections, fetchAllCollections, fetchOneCollection };

  /*
  HELPER FUNCTIONS
  */

  async function checkCache(asyncCall, key = CACHE_KEY) {
    if (!cache.isStale() && cache.hasItem(key)) {
      return cache.read(key);
    } else {
      const results = await asyncCall();
      cache.write(key, results);
      return results;
    }
  }

  async function waitFor(fn) {
    status.value = "fetching";
    const results = await fn();
    collections.value = results;
    status.value = "ready";
  }
}
