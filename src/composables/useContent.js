import { ref, reactive, computed } from 'vue';
import { findOneContent, findAllContent, getMostRecent, findAllTranslationsForContent } from '@/services/airtable';
import initCache from './cache';

const cache = initCache();
const STATUS = { READY: 'ready', FETCHING: 'fetching' };

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
    waitForLimited(fetchRecentFromAirtable);
  }

  async function fetchOneContent(id) {
    waitFor(function () {
      return fetchOneContentFromAirtable(id);
    });
  }

  async function fetchAllContent(ids) {
    waitFor(function () {
      return fetchAllContentFromAirtable(ids);
    });
  }

  async function fetchTranslationsForContent(id) {
    waitFor(function () {
      return fetchMostTranslationsFromAirtable(id);
    });
  }

  const fetchRecentFromAirtable = async () => {
    const collection = `translations-${locale.value}`;
    const recentCache = await checkCache(collection, cache.size(collection) >= limit.value, async () => await getMostRecent(locale.value, limit.value));
    return recentCache;
  };

  const fetchOneContentFromAirtable = async id => {
    const oneContentCache = await checkCache('content', cache.hasItem('content', id), async () => await findOneContent(id));
    return oneContentCache;
  };

  const fetchAllContentFromAirtable = async ids => {
    const allContentCache = await checkCache('content', cache.hasItems('content', ids), async () => await findAllContent(ids));
    return allContentCache;
  };

  const fetchMostTranslationsFromAirtable = async id => {
    const collection = `translations-${locale.value}`;
    const translationsCache = await checkCache(collection, cache.hasItem(collection, id), async () => await findAllTranslationsForContent(id));
    return translationsCache;
  };

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

  //waitFor() expects an airtable function as arg, it then calls the function to retreive data and updates the value of content
  async function waitFor(airtableFunction) {
    status.value = STATUS.FETCHING;
    const results = await airtableFunction();
    updateContent(results);
    status.value = STATUS.READY;
  }

  async function waitForLimited(airtableFunction) {
    status.value = STATUS.FETCHING;
    const results = await airtableFunction();
    updateContent(limitContent(results));
    status.value = STATUS.READY;
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
