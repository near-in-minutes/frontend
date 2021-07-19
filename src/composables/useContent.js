import { ref, reactive, computed } from 'vue';
import { findOneContent, findAllContent, getMostRecent, findAllTranslationsForContent } from '@/services/airtable';
import initCache from './cache';

const cache = initCache();

export function useContent(loc) {
  const locale = ref(loc);
  const content = ref([]);
  const limit = ref(3);
  const contentId = ref('');
  const status = ref('');

  const fetched = reactive({
    prev: -1,
    curr: -1
  });
  const hasMore = computed(() => fetched.curr !== fetched.prev);

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
    waitForLimited(async () => {
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
    hasMore,
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

  async function waitForLimited(fn) {
    status.value = 'fetching';
    const results = await fn();
    updateContent(limitContent(results));
    status.value = 'ready';
  }
    
  function limitContent(results) {
    return results.slice(0, limit.value);
  }

  function updateContent(results) {
    fetched.prev = content.value.length;
    content.value = results
      .map(r => ({
        id: r.id,
        ...r.fields
      }))
      .sort((a, b) => a.order - b.order);
    fetched.curr = content.value.length;
  }
}
