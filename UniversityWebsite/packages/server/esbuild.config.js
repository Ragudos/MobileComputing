import esbuild from "esbuild";

/**
 * @type {import('esbuild').BuildOptions}
 */
const config = {
    entryPoints: ["src/index.ts"],
    bundle: true,
    outdir: "dist",
    minify: true,
    format: "cjs",
    platform: "node",
    outExtension: { ".js": ".cjs" },
};

await esbuild.build(config);
