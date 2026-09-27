import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { FileBlob, PresentationFile } from "@oai/artifact-tool";

const workspaceDir = "C:/Users/Aman/OneDrive/Desktop/safarnxt frontend";
const skillDir = "C:/Users/Aman/.codex/plugins/cache/openai-primary-runtime/presentations/26.909.12148/skills/presentations";
const runtimePython = "C:/Users/Aman/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe";
const sourcePath = "C:/Users/Aman/OneDrive/Desktop/Aman.pptx";
const buildDir = path.join(workspaceDir, ".ppt-build");
const finalDir = path.join(workspaceDir, "output");
const finalPath = path.join(finalDir, "Aman_Expanded_Frontend_Role_v2.pptx");
const candidatePath = path.join(buildDir, "candidate-expanded.pptx");

await fs.mkdir(buildDir, { recursive: true });
await fs.mkdir(finalDir, { recursive: true });

const presentation = await PresentationFile.importPptx(await FileBlob.load(sourcePath));

const thankYou = presentation.slides.getItem(7);

const additions = [
  {
    title: "Frontend Development Role",
    body: "• Build a clear, responsive website for SafarNXT visitors\n• Present tours, package details and enquiry options\n• Make navigation easy on desktop, tablet and mobile\n• Add simple interactive elements that help users plan a trip",
    notes: "Role scope adapted for SafarNXT. Frontend principles and responsive-web practices are informed by the user-provided Summer_internship_Report.pdf, pages 9-21.",
  },
  {
    title: "Customer Website Journey",
    body: "• Discover a suitable tour or travel package\n• Review destinations, itinerary and package information\n• Send an enquiry or booking request\n• Receive confirmation and next-step details\n• Share feedback after the trip",
    notes: "Proposed SafarNXT customer journey. This is a product design proposal, not a report of completed features.",
  },
  {
    title: "Frontend Build Priorities",
    body: "• Tour listing and package-detail pages\n• Mobile-friendly layouts with readable content\n• Enquiry and contact forms with basic validation\n• WhatsApp and referral links for quick outreach\n• Browser testing before each release",
    notes: "Proposed frontend scope for SafarNXT. The focus on HTML, CSS, JavaScript, responsive layout, form interaction and browser testing is informed by the user-provided Summer_internship_Report.pdf, pages 17-21.",
  },
  {
    title: "Development Workflow",
    body: "• Understand the trip, audience and booking requirement\n• Plan the page structure and user flow\n• Build the interface with HTML, CSS and JavaScript\n• Test layouts, links and form behaviour across screen sizes\n• Review feedback and improve the user experience",
    notes: "Workflow adapted from the user-provided Summer_internship_Report.pdf, pages 14-16. Applied here as a proposed development process for SafarNXT.",
  },
];

let insertionPoint = presentation.slides.getItem(6);
for (const addition of additions) {
  const slide = presentation.slides.insert({
    after: insertionPoint,
    layoutId: "/ppt/slideLayouts/slideLayout2.xml",
  });
  const title = slide.placeholders.getItem("title");
  const content = slide.placeholders.getItem("content placeholder 2");
  title.text = addition.title;
  content.text = addition.body;
  slide.speakerNotes.textFrame.setText(addition.notes);
  insertionPoint = slide;
}

thankYou.moveTo(presentation.slides.items.length - 1);

const review = await presentation.inspect({
  kind: "slide,textbox,notes",
  maxChars: 20000,
});
await fs.writeFile(path.join(buildDir, "expanded-inspection.ndjson"), review.ndjson);

await (await PresentationFile.exportPptx(presentation)).save(candidatePath);

const { finalizePresentation } = await import(pathToFileURL(
  path.join(skillDir, "container_tools", "artifact_tool_utils.mjs"),
).href);

await finalizePresentation({
  explicitTotalSlideCount: 12,
  workspaceDir,
  candidatePath,
  finalPath,
  pythonExecutable: runtimePython,
  integrityValidatorPath: path.join(skillDir, "container_tools", "inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(skillDir, "container_tools", "inspect_presentation_layout_geometry.py"),
  layoutArgs: [
    "--expected-slide-size-emu", "9144000,6858000",
    "--validate-bullet-geometry",
    "--validate-heading-fit",
  ],
  requiredNativeTableOwnerSlides: [],
  verifyArtifactToolImport: true,
  receiptPath: path.join(buildDir, "Aman_Expanded_Frontend_Role.validation.json"),
});

console.log(finalPath);
