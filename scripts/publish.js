const path = require('path')

const fsextra = require('fs-extra');

const shell = require('shelljs')
const fs = require('fs');

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const appDirectory = fs.realpathSync(process.cwd());

const lib = resolveApp('lib')
const npmpackage = resolveApp('npmpackage')

fsextra.copySync(lib, npmpackage, {
  dereference: true,
//   filter: file => file !== paths.appHtml,
});

shell.exec('yarn publish npmpackage --registry https://registry.npmjs.org')
