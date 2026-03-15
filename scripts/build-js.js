const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const isWatch = process.argv.includes('--watch');
const isMinify = process.argv.includes('--minify');

const buildOptions = {
  entryPoints: ['src/assets/js/main.js'],
  bundle: true,
  outfile: '_site/assets/js/main.js',
  minify: isMinify,
  sourcemap: !isMinify,
  target: ['es2020'],
  format: 'iife',
  banner: {
    js: '/* Internet mais segura - https://github.com/vicentesarmento/internet_mais_segura */'
  }
};

async function build() {
  try {
    // Ensure output directory exists
    const outputDir = path.dirname(buildOptions.outfile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    if (isWatch) {
      const ctx = await esbuild.context(buildOptions);
      await ctx.watch();
      console.log('👀 Watching JavaScript files...');
    } else {
      await esbuild.build(buildOptions);
      console.log('✅ JavaScript built successfully');
    }
  } catch (error) {
    console.error('❌ JavaScript build failed:', error);
    process.exit(1);
  }
}

build();
