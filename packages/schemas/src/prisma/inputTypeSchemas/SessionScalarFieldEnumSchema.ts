import { z } from "zod";

export const SessionScalarFieldEnumSchema = z.enum([
  "id",
  "userId",
  "expires",
  "createdAt",
  "updatedAt",
]);

export default SessionScalarFieldEnumSchema;
