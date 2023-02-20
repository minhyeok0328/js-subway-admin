export class Repository {
  constructor(
    private readonly _key: string,
    private readonly _storage: Storage = localStorage,
  ) {
  }

  get key() {
    return this._key;
  }

  get storage() {
    return this._storage;
  }

  get() {
    return JSON.parse(this.storage.getItem(this.key) || 'null');
  }

  set(data: unknown) {
    this._storage.setItem(this.key, JSON.stringify(data));
  }

  remove() {
    this._storage.removeItem(this.key);
  }
}
