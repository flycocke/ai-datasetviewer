// const isEnvProduction = process.env.NODE_ENV === 'production';
// const isEnvDevelopment = process.env.NODE_ENV === 'development';
// // 注意要和webpack css 的一致

const isPro = process.env.mode === 'production'
const presets = [

];
const compact = false;
const plugins = [

  isPro && ['babel-plugin-clean-code', {
    clearConsole: true,
    consoleLevel: ['log', 'error', 'info', 'warn'],
    clearDebugger: true,
  }]
].filter(Boolean)

module.exports = { presets, plugins ,compact};
