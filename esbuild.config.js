// eslint-disable-next-line @typescript-eslint/no-var-requires
require('esbuild').build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  sourcemap: true,
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  minify: true,
  splitting: false,
  platform: "browser",
  watch: true,
  format: "cjs",
  outdir: 'build'
  // outfile: 'build/index.js',
}).catch(() => process.exit(1))