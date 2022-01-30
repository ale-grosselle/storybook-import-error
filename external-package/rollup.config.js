const path = require('path');
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import OMT from '@surma/rollup-plugin-off-main-thread';

const OMTCustom = OMT();
OMTCustom.resolveImportMeta = () => {
  return 'import.meta.url';
};

/**
 * Generate a rollup config starting from a shared preset
 *
 * @see https://rollupjs.org/guide/en/#big-list-of-options
 *
 * @param {Object} config
 * @param {string} [config.input="src/index.ts"] - Rollup's input parameter. Default: `src/index.ts`
 * @param {string} [config.pkg="package.json"] - Path to project's package.json. Default: `package.json`
 * @param {string} [config.tsconfig="tsconfig.json"] - Path to project's tsconfig.json. Default: `tsconfig.json`
 * @param {boolean} [config.preserveModules=false] - Output files with the same structure as the source files. Default: `false`
 *
 * @return {import("rollup").RollupOptions} Rollup config
 */
export default function config({
  pkg = 'package.json',
  input = 'src/index.ts',
  tsconfig = 'tsconfig.json',
  preserveModules = false,
  exports,
}) {
  const packageJson = require(path.join(process.cwd(), pkg));
  const external = [
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {}),
    ...Object.keys(packageJson.devDependencies || {}),
  ];

  return {
    input,
    output: [
      { dir: 'dist', format: 'amd', sourcemap: true, exports }
    ],
    external,
    plugins: [
      typescript({ tsconfig }),
      commonjs(),
      OMTCustom
    ],
  };
}
