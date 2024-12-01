import { pgTable, text } from "drizzle-orm/pg-core";

export const imageTable = pgTable("images", {
  imageUrl: text("image_url"),
});
