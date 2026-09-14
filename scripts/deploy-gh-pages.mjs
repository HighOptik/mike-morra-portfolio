import { execSync } from "node:child_process";
import { cpSync, existsSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const worktree = join(tmpdir(), "mike-morra-portfolio-gh-pages");

function run(cmd, cwd = root) {
  execSync(cmd, { cwd, stdio: "inherit", env: process.env, shell: true });
}

process.env.VITE_BASE = "/mike-morra-portfolio/";
run("node scripts/fetch-steam-status.mjs public/steam-status.json");
run("npm run build");

writeFileSync(join(dist, ".nojekyll"), "");
writeFileSync(join(dist, "_headers"), "/*.wasm\n  Content-Type: application/wasm\n");

run("git fetch origin gh-pages");
try {
  run(`git worktree remove --force "${worktree}"`);
} catch {
  // no existing worktree
}
if (existsSync(worktree)) rmSync(worktree, { recursive: true, force: true });
run(`git worktree add "${worktree}" origin/gh-pages`);

for (const name of readdirSync(worktree)) {
  if (name === ".git") continue;
  rmSync(join(worktree, name), { recursive: true, force: true });
}
for (const name of readdirSync(dist)) {
  cpSync(join(dist, name), join(worktree, name), { recursive: true });
}

run("git add -A", worktree);
const dirty = execSync("git status --porcelain", { cwd: worktree, encoding: "utf8" }).trim();
if (!dirty) {
  console.log("Live site already matches this build.");
} else {
  run('git commit -m "Publish the GitHub Pages site."', worktree);
  run("git push origin HEAD:gh-pages", worktree);
  console.log("Live: https://highoptik.github.io/mike-morra-portfolio/");
}

run(`git worktree remove --force "${worktree}"`);
