import fs from "node:fs/promises";
import path from "node:path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

type GetFileContentParams = {
  fileName: string;
  variables?: Record<string, string>;
};

/**
 * Reads an HTML file and replaces placeholders (e.g., {RESET_URL}) with actual values.
 *
 * @param fileName - Relative path to the HTML file (e.g. "reset-password.html")
 * @param variables - Key-value pairs to replace in the template
 * @returns HTML string with injected values
 */
export const getFileContent = async ({
  fileName,
  variables = {},
}: GetFileContentParams): Promise<string> => {
  try {
    const absolutePath = path.resolve(__dirname, "../", ...fileName.split("/"));
    let content = await fs.readFile(absolutePath, "utf-8");
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`{${key}}`, "g");
      content = content.replace(regex, value);
    }
    return content;
  } catch (err) {
    console.error(`Error reading or processing file "${fileName}":`, err);
    throw new Error("Could not load email template.");
  }
};
