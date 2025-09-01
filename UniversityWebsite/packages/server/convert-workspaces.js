// scripts/convert-workspaces.js
import fs from "fs";

const pkgPath = new URL("../package.json", import.meta.url);
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

function rewriteDeps(deps) {
  if (!deps) return;
  for (const [name, version] of Object.entries(deps)) {
    if (version.startsWith("workspace:*")) {
      // replace with relative file path
      deps[name] = `file:../${name.split("/").pop()}`;
    }
  }
}

rewriteDeps(pkg.dependencies);
rewriteDeps(pkg.devDependencies);
rewriteDeps(pkg.peerDependencies);

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log("✔ Converted workspace:* → file:../ paths");
