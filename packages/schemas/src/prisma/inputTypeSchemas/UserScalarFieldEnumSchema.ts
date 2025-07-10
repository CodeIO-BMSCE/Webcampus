import { z } from "zod";

export const UserScalarFieldEnumSchema = z.enum([
  "id",
  "email",
  "password",
  "name",
  "createdAt",
  "updatedAt",
]);

export default UserScalarFieldEnumSchema;
