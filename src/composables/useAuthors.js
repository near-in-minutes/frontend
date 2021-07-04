import { ref } from 'vue';
import { getAllAuthors } from '@/services/airtable';
import initCache from './cache';

const EXCLUSIONS = [];

const cache = initCache();
const CACHE_KEY = 'authors';

export function useAuthors() {
  const authors = ref([]);
  const status = ref('');

  async function fetchAllAuthorsWithContributions() {
    waitFor(async () => {
      return await checkCache(async () => {
        const results = await getAllAuthors();
        return results.map(a => {
          return {
            id: a.id,
            ...a.fields
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
          .map(a => {
            return {
              id: a.id,
              ...a.fields,
              githubAvatar: `${a.fields.github}.png`,
              githubUname: a.fields.github.replace('https://github.com/', '')
            };
          })
          .filter(a => !EXCLUSIONS.includes(a.githubUname))
          .sort((a, b) => new Date(a.joined) - new Date(b.joined));
      });
    });
  }

  return { status, authors, fetchAllAuthors, fetchAllAuthorsWithContributions };

  /*
  HELPER FUNCTIONS
  */

  async function checkCache(asyncCall) {
    if (!(cache.isEmpty(CACHE_KEY) || cache.isStale())) {
      return cache.read(CACHE_KEY);
    } else {
      const results = await asyncCall();
      cache.write(CACHE_KEY, results);
      return results;
    }
  }

  async function waitFor(fn) {
    status.value = 'fetching';
    const results = await fn();
    authors.value = results;
    status.value = 'ready';
  }
}
