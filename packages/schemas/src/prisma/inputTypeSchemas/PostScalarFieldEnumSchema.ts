import { z } from "zod";

export const PostScalarFieldEnumSchema = z.enum([
  "id",
  "title",
  "content",
  "published",
  "authorId",
]);

export default PostScalarFieldEnumSchema;
