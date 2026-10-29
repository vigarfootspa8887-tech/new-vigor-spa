import records from "@/content/updates.json";
import { selectPublishedUpdates, validateUpdates } from "./updates";

const posts = validateUpdates(records);

export function getUpdates(limit?: number) {
  return selectPublishedUpdates(posts, { limit });
}
