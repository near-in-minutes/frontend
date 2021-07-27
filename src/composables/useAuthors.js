import { ref } from "vue";
import { getAllAuthors, findOneAuthor } from "@/services/airtable";
import initCache from "./cache";

const EXCLUSIONS = [];

const cache = initCache();
const CACHE_KEY = "authors";

export function useAuthors() {
  const authors = ref([]);
  const status = ref("");

  async function fetchAllAuthorsWithContributions() {
    waitFor(async () => {
      return await checkCache(async () => {
        const results = await getAllAuthors();
        return results.map((a) => {
          return {
            id: a.id,
            ...a.fields,
          };
        });
      });
    });
  }

  async function fetchAllAuthors() {
    waitFor(async () => {
      return await checkCache(async () => {
        const results = await getAllAuthors();
        return results
          .map((a) => {
            return {
              id: a.id,
              ...a.fields,
              githubAvatar: `${a.fields.github}.png`,
              githubUname: a.fields.github.replace("https://github.com/", ""),
            };
          })
          .filter((a) => !EXCLUSIONS.includes(a.githubUname))
          .sort((a, b) => new Date(a.joined) - new Date(b.joined));
      });
    });
  }

  async function fetchOneAuthor(id, expand = false) {
    waitFor(async () => {
      return await checkCache(async () => {
        const result = await findOneAuthor(id, expand);
        return {
          id: result.id,
          ...result.fields,
          github: {
            url: result.fields.github,
            avatar: `${result.fields.github}.png`,
            name: result.fields.github.replace("https://github.com/", ""),
          },
        };
      }, `author-${id}`);
    });
  }

  return {
    status,
    authors,
    fetchAllAuthors,
    fetchAllAuthorsWithContributions,
    fetchOneAuthor,
  };

  /*
  HELPER FUNCTIONS
  */

  async function checkCache(asyncCall, key = CACHE_KEY) {
    if (!(cache.isEmpty(key) || cache.isStale())) {
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
    authors.value = results;
    status.value = "ready";
  }
}
