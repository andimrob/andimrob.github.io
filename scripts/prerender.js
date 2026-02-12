import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.resolve(root, "public");

async function prerender() {
  const vite = await createServer({
    root,
    server: { middlewareMode: true },
    appType: "custom",
  });

  try {
    const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
    const html = render();

    const indexPath = path.resolve(outDir, "index.html");
    let template = fs.readFileSync(indexPath, "utf-8");

    template = template.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`,
    );

    fs.writeFileSync(indexPath, template);
    console.log("Pre-rendered HTML written to public/index.html");
  } finally {
    await vite.close();
  }
}

prerender();
