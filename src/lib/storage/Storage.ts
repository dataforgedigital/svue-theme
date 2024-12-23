import { reactive } from "vue";
import { toCamelCase } from "../utils";
import { Converter } from "../types/converter";

export default class Storage {
  private $data = reactive<Record<string, unknown>>({});

  private $keys: string[] = [];

  constructor(props: Record<string, unknown>) {
    this.__migrate(props);
  }

  attach(key: string, value: unknown, converter?: Converter) {
    key = toCamelCase(key);

    this.$keys = [...new Set([...this.$keys, key])];

    if (converter) {
      try {
        switch (converter) {
          case 'obj':
            value = JSON.parse(value as string);
            break;
          case 'num':
            value = Number(value);
            break;
          case "string":
            value = String(value);
            break;
          case "bool":
            value = Boolean(value);
            break;
          default:
            value = null;
            break;
        }
      } catch (error) {
        value = null;
      }
    }

    this.set(key, value);
  }

  detach(key: string) {
    key = toCamelCase(key);

    this.$keys.splice(this.$keys.indexOf(key), 1);
    delete this.$data[key];
  }

  set(key: string, value: unknown) {
    key = toCamelCase(key);

    if (!this.$keys.includes(key)) {
      throw new Error(`Property ${key} is not defined`);
    }

    this.$data[key] = value;
  }

  get(key: string) {
    key = toCamelCase(key);

    if (!this.$keys.includes(key)) {
      throw new Error(`Property ${key} is not defined`);
    }

    return this.$data[key];
  }

  keys() {
    return this.$keys;
  }

  all() {
    return this.$data;
  }

  private __migrate(props: Record<string, unknown>) {
    for (const key in props) {
      this.attach(key, props[key]);
    }
  }
}
