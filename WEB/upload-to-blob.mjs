import { put } from "@vercel/blob";
import { readFileSync, readdirSync, statSync, writeFileSync } from "fs";
import { join, relative } from "path";

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) throw new Error("BLOB_READ_WRITE_TOKEN not set");

const root = "c:/Users/Mohammed Rayhan/MUFEEDA/website/public";
const dirs = ["images", "videos", "logo"];

function walk(dir) {
  let files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files = files.concat(walk(full));
    else files.push(full);
  }
  return files;
}

const mapping = {};
let files = [];
for (const d of dirs) files = files.concat(walk(join(root, d)));

console.log(`Uploading ${files.length} files...`);
for (const filePath of files) {
  const rel = relative(root, filePath).replace(/\\/g, "/");
  const data = readFileSync(filePath);
  const { url } = await put(rel, data, { access: "public", token, addRandomSuffix: false });
  mapping["/" + rel] = url;
  process.stdout.write(".");
}
console.log("\nDone.");
writeFileSync("blob-map.json", JSON.stringify(mapping, null, 2));
console.log(`Mapped ${Object.keys(mapping).length} assets.`);
