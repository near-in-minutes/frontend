/* eslint-disable */
import { findOneContent, getMostRecent ,findAllTranslationsForContent} from '@/services/airtable';
import { ref } from 'vue';

export function useContent(locale) {
  const content = ref([]);
  const limit = ref(3);
  const contentId = ref('');
  const status = ref('');

  function setLimit(lim) {
    limit.value = parseInt(lim);
  }

  function setContentId(id) {
    contentId.value = id;
  }

  async function fetchMostRecent() {
    status.value = 'fetching';
    content.value = await getMostRecent(locale.value, limit.value);
    status.value = 'ready';
  }

  async function fetchOneContent(id) {
    status.value = 'fetching';
    content.value = await findOneContent(id);
    status.value = 'ready';
  }

  async function fetchTranslationsForContent(id) {
    status.value = 'fetching';
    content.value = await findAllTranslationsForContent(id);
    status.value = 'ready';
  }


  return {
    status,
    content,
    contentId,
    limit,
    setLimit,
    setContentId,
    fetchMostRecent,
    fetchOneContent,
    fetchTranslationsForContent
  };
}
