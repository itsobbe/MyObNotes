import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Note {
  id;
  author;
  message;
  title;
  modified;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public storage: Storage) {
    this.storage.create();
  }

  public async read(objectName, id = null): Promise<any> {
    let dbObject = {};
    await this.storage.forEach((value, key) => {
      if (objectName == key) {
        if (id) {
          value.forEach((item, itemKeyi) => {
            if (item.id == id) {
              dbObject = item;
              return;
            }
          });
        } else {
          if (Object.keys(dbObject).length == 0) {
            dbObject = value;
          }
        }
      }
    });
    return dbObject;
  }

  public async getRows(objectName) {
    let dbObjects = [];
    await this.storage.forEach((value, key) => {
      if (objectName == key && value) {
        value = value.filter((dataItem) => {
          if (dataItem && dataItem !== undefined) {
            return !!dataItem.id;
          }
        });
        if (value && !Array.isArray(value)) {
          value = [value];
        }
        if (value) {
          dbObjects = value;
        }
      }
    });

    dbObjects = dbObjects.sort(function (a, b) {
      return new Date(b.modified).getTime() - new Date(a.modified).getTime();
    });

    return dbObjects;
  }

  public async getObject(objectName, id) {
    let values = await this.getRows(objectName);
    let object = {};
    values.filter((obj) => {
      if (obj.id == id) {
        object = obj;
      }
    });
    return object;
  }

  public async saveObject(key, object) {
    let objects = await this.getRows(key);
    let exists = false;
    objects = objects.map((dbObject) => {
      if (dbObject.id == object.id) {
        dbObject = object;
        exists = true;
      }
      return dbObject;
    });
    if (!exists) {
      object.id = this.generateId();
      objects.push(object);
    }
    object.modified = (new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString('en-GB'));
    this.create(key, objects);
  }

  async deleteObject(objectName, id) {
    let objects = await this.getRows(objectName);
    objects = objects.filter((dbObject) => {
      return dbObject.id !== id;
    });
    this.create(objectName, objects);
  }

  public async create(key: string, object: any) {
    return await this.storage.set(key, object);
  }

  public async update(todo: any) {
    return await this.storage.set(todo.key, todo);
  }

  public async delete(key: string) {
    return await this.storage.remove(key);
  }

  private generateId() {
    return new Date().getTime();
  }

}
