/* eslint-disable */
const Airtable = require('airtable');
const API_ROOT = 'https://v1.nocodeapi.com/near/airtable';
const BASE_ID = 'kbiDvMDzZglVdlPP';

const headers = new Headers();
headers.append('Content-Type', 'application/json');
var requestOptions = {
  method: 'get',
  redirect: 'follow',
  headers: headers
};

// prettier-ignore
export {
  getAllContent,
  findAllContent,
  findOneContent,
  getMostRecent,
  getAllTranslationsForLocale,
  findOneTranslation,
  findAllTranslations,
  findAllTranslationsForContent,
  getAllAuthors,
  findOneAuthor,
  getAllCollections,
  findOneCollection,
  getSummary
};

//---------------------------------------------------------
// PRIMITIVE HELPERS
//---------------------------------------------------------

async function getAll({ table, view = 'all' }) {
  try {
    const url = `${API_ROOT}/${BASE_ID}?tableName=${table}&view=${view}`;
    const response = await fetch(url, requestOptions);

    const data = await response.text();
    const { records } = JSON.parse(data);

    return records.map(r => ({
      id: r.id,
      fields: r.fields
    }));
  } catch (error) {
    console.log(error);
  }
}

async function getAllFilter({ table, view = 'all', filterByFormula }) {
  try {
    const url = `${API_ROOT}/${BASE_ID}?tableName=${table}&view=${view}&filterByFormula=${filterByFormula}`;
    const response = await fetch(url, requestOptions);

    const data = await response.text();
    const { records } = JSON.parse(data);

    return records.map(r => ({
      id: r.id,
      fields: r.fields
    }));
  } catch (error) {
    console.log(error);
  }
}

async function findOne({ table, id }) {
  try {
    const url = `${API_ROOT}/${BASE_ID}/record?tableName=${table}&id=${id}`;
    const response = await fetch(url, requestOptions);

    const data = await response.text();
    const record = JSON.parse(data);

    return {
      id: record.id,
      fields: record.fields
    };
  } catch (error) {
    console.log(error);
  }
}

/**
 * https://community.airtable.com/t/most-efficient-way-to-retrieve-specific-records-by-id/23224
 */
async function findAll({ table, ids, view = 'all' }) {
  try {
    const filterByFormula = `SEARCH(RECORD_ID(), "${ids.join(',')}") != ""`;
    const url = `${API_ROOT}/${BASE_ID}?tableName=${table}&view=${view}&filterByFormula=${filterByFormula}`;

    const response = await fetch(url, requestOptions);
    const data = await response.text();
    const { records } = JSON.parse(data);

    return records.map(r => ({
      id: r.id,
      fields: r.fields
    }));
  } catch (error) {
    console.log(error);
  }
}

//---------------------------------------------------------
// BASIC FILTERS
//---------------------------------------------------------

// prettier-ignore
async function getAllFiltered(table, view = 'all', filterByFormula = '', options = {}) {
  try {
    const records = await getAllFilter({
      table: table,
      view: view,
      filterByFormula:filterByFormula,
      options:options
    });
    // const records = await base(table).select({ view, filterByFormula, ...options }).all()
    return records.map((r) => ({ id: r.id, fields: r.fields }))
  } catch (error) {
    console.log(error)
  }
}

// prettier-ignore
async function getAllFilteredArray(table, view = 'all', field = '', value = '', options = {}) {
  const filterByFormula = `SEARCH("${value}",ARRAYJOIN(${field},",")) != ""`
  return getAllFiltered(table, view, filterByFormula, options)
}

// prettier-ignore
// async function getAllFilteredString(table, view = 'all', field = '', value = '', options = {}) {
//   const filterByFormula = `SEARCH("${value}",${field}) != ""`
//   return getAllFiltered(table, view, filterByFormula, options)
// }

//---------------------------------------------------------
// CONTENT API
// `content` is a named container for many `translations`
//---------------------------------------------------------

async function getAllContent() {
  return await getAll({ table: 'content', view: 'live' });
}

async function findAllContent(ids) {
  return await findAll({ table: 'content', ids, view: 'live' });
}

async function findOneContent(contentId) {
  return await findOne({ table: 'content', id: contentId });
}

//---------------------------------------------------------
// TRANSLATION API
// `translations` hold link to videos which user consumes as content
//---------------------------------------------------------

async function getMostRecent(locale = 'en', limit = 3) {
  return await getAllFilteredArray('translations', 'recent', 'language', locale, { maxRecords: limit });
}

async function getAllTranslationsForLocale(locale = 'en') {
  return await getAllFilteredArray('translations', 'live', 'language', locale);
}

async function findOneTranslation(translationId) {
  return await findOne({ table: 'translations', id: translationId });
}

async function findAllTranslations(translationIds) {
  return await findAll({ table: 'translations', ids: translationIds });
}

async function findAllTranslationsForContent(contentId) {
  const content = await findOne({ table: 'content', id: contentId });
  if (!content.fields.translations) {
    return 'not found';
  }

  return await findAll({
    table: 'translations',
    ids: content.fields.translations
  });
}

//---------------------------------------------------------
// AUTHORS API
//---------------------------------------------------------

async function getAllAuthors() {
  return await getAll({ table: 'authors' });
}

async function findOneAuthor(authorId, expand = false) {
  const author = await findOne({ table: 'authors', id: authorId });
  if (expand) {
    author.fields.content = await Promise.all(author.fields.content.map(async rec => await findOneContent(rec)));
  }
  return author;
}

//---------------------------------------------------------
// COLLECTIONS API
//---------------------------------------------------------

async function getAllCollections() {
  return await getAll({ table: 'collections' });
}

async function findOneCollection(collectionId) {
  return await findOne({ table: 'collections', id: collectionId });
}

//---------------------------------------------------------
// SUMMARY API
//---------------------------------------------------------

async function getSummary() {
  return await getAllFilteredArray('summary', 'all', 'name', 'all');
}
