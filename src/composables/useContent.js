import { ref } from 'vue';
import { findOneContent, findAllContent, getMostRecent, findAllTranslationsForContent } from '@/services/airtable';
import initCache from './cache';

const cache = initCache();

export function useContent(loc) {
  const locale = ref(loc);
  const content = ref([]);
  const limit = ref();
  const contentId = ref('');
  const status = ref('');

  function setLimit(lim) {
    limit.value = parseInt(lim);
  }

  function setContentId(id) {
    contentId.value = id;
  }

  function setLocale(loc) {
    locale.value = loc;
  }

  async function fetchMostRecent() {
    waitFor(async () => {
      const collection = `translations-${locale.value}`;
      return await checkCache(collection, cache.size(collection) >= limit.value, async () => await getMostRecent(locale.value, limit.value));
    });
  }

  async function fetchOneContent(id) {
    waitFor(async () => {
      return await checkCache('content', cache.hasItem('content', id), async () => await findOneContent(id));
    });
  }

  async function fetchAllContent(ids) {
    waitFor(async () => {
      return await checkCache('content', cache.hasItems('content', ids), async () => await findAllContent(ids));
    });
  }

  async function fetchTranslationsForContent(id) {
    waitFor(async () => {
      const collection = `translations-${locale.value}`;
      return await checkCache(collection, cache.hasItem(collection, id), async () => await findAllTranslationsForContent(id));
    });
  }

  return {
    status,
    content,
    contentId,
    limit,
    setLimit,
    setContentId,
    setLocale,
    fetchMostRecent,
    fetchOneContent,
    fetchAllContent,
    fetchTranslationsForContent
  };

  /*
  HELPER FUNCTIONS
  */

  async function checkCache(collection, predicate, asyncCall) {
    if (predicate && !cache.isStale()) {
      return cache.read(collection);
    } else {
      const results = await asyncCall();
      cache.write(collection, results);
      return results;
    }
  }

  async function waitFor(fn) {
    status.value = 'fetching';
    const results = await fn();
    updateContent(results);
    status.value = 'ready';
  }

  function updateContent(results) {
    content.value = results
      .slice(0, limit.value)
      .map(r => ({
        id: r.id,
        ...r.fields
      }))
      .sort((a, b) => a.order - b.order);
  }
}
