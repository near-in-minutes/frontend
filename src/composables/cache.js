// simple cache implementation
const TIMEOUT = 12 * 60 * 60 * 1000; // 1 NEAR epoch (12 hours)
const DEBUG = false;

let singleton;
export default function initCache(timeout = TIMEOUT, debug = DEBUG) {
  if (singleton) return singleton;

  singleton = new Cache({ timeout, debug });
  return singleton;
}

class Cache {
  constructor({ timeout, debug }) {
    this.timeout = timeout;
    this.timestamp = 0;
    this.data = {};

    this.debug = debug;
    this.debug && console.log("cache initialized");
  }

  size(collection) {
    const check = this.data[collection] ? this.data[collection].length : -1;
    this.debug && console.log(`size? [${collection}: ${check}]`);
    return check;
  }

  isEmpty(collection) {
    const check = this.data[collection]
      ? Object.keys(this.data[collection]).length === 0
      : true;
    this.debug && console.log(`isEmpty? [${collection}: ${check}]`);
    return check;
  }

  hasItem(collection, id) {
    const check = this.find(collection, id) !== -1;
    this.debug && console.log(`hasItem? [${collection}: ${check}]`);
    return check;
  }

  hasItems(collection, ids) {
    return ids.every((id) => this.hasItem(collection, id));
  }

  isStale() {
    const check = Date.now() - this.timestamp > this.timeout;
    this.debug && console.log(`isStale? [${check}]`);
    return check;
  }

  find(collection, id) {
    // in some cases we're just passing the collection key
    if (!id && !!this.data[collection]) return true;

    // otherwise we need to find the id in a larger collection
    let index = -1;
    if (!this.data[collection]) return index;
    for (let i = 0; i < this.data[collection].length; i++) {
      if (this.data[collection][i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  read(collection) {
    this.debug && console.log(`reading from cache: [${collection}]`);
    return this.data[collection];
  }

  write(collection, data) {
    this.debug && console.log(`writing to cache: [${collection}]`);
    if (this.data[collection]) {
      if (collection === "authors") {
        this.data[collection] = data;
      } else {
        this.data[collection] = this.data[collection].concat(data);
      }
    } else {
      this.data[collection] = data;
    }
    this.timestamp = Date.now();
  }
}
