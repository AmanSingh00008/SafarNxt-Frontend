import fs from "node:fs/promises";
import { FileBlob, PresentationFile } from "@oai/artifact-tool";

const sourcePath = "C:/Users/Aman/OneDrive/Desktop/Aman.pptx";
const presentation = await PresentationFile.importPptx(await FileBlob.load(sourcePath));
const snapshot = await presentation.inspect({
  kind: "slide,textbox,shape,image,table,chart,notes,layout",
  maxChars: 30000,
});
await fs.writeFile(".ppt-build/source-inspection.ndjson", snapshot.ndjson);
const montage = await presentation.export({ format: "webp", montage: true, scale: 0.65 });
await fs.writeFile(".ppt-build/source-montage.webp", new Uint8Array(await montage.arrayBuffer()));
console.log(snapshot.ndjson);
