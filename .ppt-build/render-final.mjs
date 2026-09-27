import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, PresentationFile } from "@oai/artifact-tool";

const deckPath = "C:/Users/Aman/OneDrive/Desktop/safarnxt frontend/output/Aman_Expanded_Frontend_Role.pptx";
const outputDir = ".ppt-build/rendered";
await fs.mkdir(outputDir, { recursive: true });
const presentation = await PresentationFile.importPptx(await FileBlob.load(deckPath));
for (let i = 0; i < presentation.slides.items.length; i += 1) {
  const image = await presentation.slides.getItem(i).export({ format: "png", scale: 2 });
  await fs.writeFile(path.join(outputDir, `slide-${i + 1}.png`), new Uint8Array(await image.arrayBuffer()));
}
const snapshot = await presentation.inspect({ kind: "slide,textbox,notes", maxChars: 16000 });
await fs.writeFile(path.join(outputDir, "inspection.ndjson"), snapshot.ndjson);
console.log(snapshot.ndjson);
