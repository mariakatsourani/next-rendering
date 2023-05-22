import path from "path";
import { promises as fs } from "fs";

// Pass the json file name to get back an object of the passed type (Type)
export async function getJson<ParsedType>(fileName: string) {
  // Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), "json");

  // Read the json data file data.json
  const fileContents = await fs.readFile(
    `${jsonDirectory}/${fileName}.json`,
    "utf8"
  );

  // Parse json to clean up newlines etc.
  return JSON.parse(fileContents) as ParsedType;
}
