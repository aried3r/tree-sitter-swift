// Runs `tree-sitter generate` from the repository root for the node-gyp build.
//
// binding.gyp cannot call the CLI directly: on Windows, gyp runs actions from
// the build/ directory and rewrites every bare action argument as a path
// relative to it, so `generate` becomes `../generate`.
const { spawnSync } = require("child_process");
const path = require("path");

const result = spawnSync("tree-sitter generate --no-bindings", {
  cwd: path.join(__dirname, ".."),
  stdio: "inherit",
  shell: true,
});

if (result.error) {
  throw result.error;
}
process.exit(result.status === null ? 1 : result.status);
