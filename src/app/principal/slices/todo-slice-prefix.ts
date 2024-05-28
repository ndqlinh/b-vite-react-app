import { ENDPOINT } from "@config/endpoint";

export const TYPE_PREFIX = {
  TODO: {
    CREATE: `${ENDPOINT.task}/create`,
    LIST: `${ENDPOINT.task}/list`,
    DELETE: `${ENDPOINT.task}/delete`,
    FIND: `${ENDPOINT.task}/find`,
  }
}
