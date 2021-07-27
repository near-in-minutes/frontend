import { ref } from "vue";
import { getSummary } from "@/services/airtable";
import initCache from "./cache";

const cache = initCache();
const CACHE_KEY = "summary";

export function useSummary() {
  const summary = ref({});
  const status = ref("");

  async function fetchSummary(id) {
    waitFor(async () => {
      return await checkCache(async () => {
        const results = await getSummary();
        return {
          id: results[0].id,
          ...results[0].fields,
        };
      });
    });
  }

  return { status, summary, fetchSummary };

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
    summary.value = results;
    status.value = "ready";
  }
}
