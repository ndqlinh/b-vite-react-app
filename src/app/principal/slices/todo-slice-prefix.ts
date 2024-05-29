import { ENDPOINT } from "@config/endpoint";

export const TYPE_PREFIX = {
  TODO: {
    SAVE: `${ENDPOINT.task}/save`,
    LIST: `${ENDPOINT.task}/list`,
    DELETE: `${ENDPOINT.task}/delete`,
    FIND: `${ENDPOINT.task}/find`
  }
}
