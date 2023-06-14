export enum StorageType {
  LocalStorage = 'localStorage',
  SessionStorage = 'sessionStorage',
}

export class StorageManager {
  private storage: Storage;

  constructor(storageType: StorageType = StorageType.LocalStorage) {
    if (storageType === StorageType.LocalStorage) {
      this.storage = window.localStorage;
    } else {
      this.storage = window.sessionStorage;
    }
  }

  public getItem(key: string): any {
    const item = this.storage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch (error) {
        console.error(`Failed to parse item '${key}' from storage.`, error);
      }
    }
    return null;
  }

  public setItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      this.storage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Failed to serialize item '${key}' for storage.`, error);
    }
  }

  public removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  public clear(): void {
    this.storage.clear();
  }
}
