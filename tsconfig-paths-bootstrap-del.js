// const tsConfig = require('./tsconfig.json');
// const tsConfigPaths = require('tsconfig-paths');

// const baseUrl = './dist'; // Either absolute or relative path. If relative it's resolved to current working directory.
// tsConfigPaths.register({
//     baseUrl,
//     paths: tsConfig.compilerOptions.paths,
// });

// const tsConfigPaths = require('tsconfig-paths');
// const path = require('path');
// const fs = require('fs');

// // Load tsconfig.json
// const baseTsConfigPath = path.resolve(__dirname, 'tsconfig.json');
// const baseTsConfig = JSON.parse(fs.readFileSync(baseTsConfigPath, 'utf8'));

// // Load tsconfig.build.json
// const buildTsConfigPath = path.resolve(__dirname, 'tsconfig.build.json');
// const buildTsConfig = JSON.parse(fs.readFileSync(buildTsConfigPath, 'utf8'));

// // Merge configurations
// const mergedTsConfig = {
//     ...baseTsConfig,
//     ...buildTsConfig,
//     compilerOptions: {
//         ...baseTsConfig.compilerOptions,
//         ...buildTsConfig.compilerOptions,
//     },
// };

// console.log('Base URL:', path.resolve(__dirname, mergedTsConfig.compilerOptions.outDir));
// console.log('Registering tsconfig paths:', mergedTsConfig.compilerOptions.paths);

// tsConfigPaths.register({
//     baseUrl: path.resolve(__dirname, mergedTsConfig.compilerOptions.outDir),
//     paths: mergedTsConfig.compilerOptions.paths,
// });

// console.log('Paths registered successfully');

// // Test if the module can be resolved
// try {
//     require('@filters/all-exceptions.filter');
//     console.log('Module resolved successfully');
// } catch (err) {
//     console.error('Error resolving module:', err);
// }

// const fs = require('fs');
// const path = require('path');
// const tsConfigPaths = require('tsconfig-paths');

// // Read tsconfig.build.json
// const tsConfigPath = path.resolve(__dirname, './tsconfig.build.json');
// const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));

// // If tsConfig.build.json extends another file, merge them
// if (tsConfig.extends) {
//     const parentConfigPath = path.resolve(__dirname, tsConfig.extends);
//     const parentConfig = JSON.parse(fs.readFileSync(parentConfigPath, 'utf8'));
//     Object.assign(tsConfig, parentConfig, tsConfig);
// }

// // Log the content of tsconfig.build.json
// console.log('Read tsconfig.build.json:', tsConfig);

// // Check if the compilerOptions property exists
// if (!tsConfig.compilerOptions) {
//     console.error('Error: compilerOptions not found in tsConfig.build.json');
//     process.exit(1);
// }

// // Log the paths and outDir
// console.log('Registering tsconfig paths:', tsConfig.compilerOptions.paths);
// console.log('Base URL:', path.resolve(__dirname, tsConfig.compilerOptions.outDir));

// // Register tsconfig paths
// tsConfigPaths.register({
//     baseUrl: path.resolve(__dirname, tsConfig.compilerOptions.outDir),
//     paths: tsConfig.compilerOptions.paths,
// });

// console.log('Paths registered successfully');

// // List files in the dist directory for debugging
// console.log(
//     'Files in dist directory:',
//     fs.readdirSync(path.resolve(__dirname, tsConfig.compilerOptions.outDir))
// );

// // Check if the specific module exists
// const modulePath = path.resolve(
//     __dirname,
//     tsConfig.compilerOptions.outDir,
//     'core/filters/all-exceptions.filter.js'
// );
// if (!fs.existsSync(modulePath)) {
//     console.error(`Module not found: ${modulePath}`);
//     process.exit(1);
// }

// console.log(`Module found: ${modulePath}`);

// const fs = require('fs');
// const path = require('path');
// const tsConfigPaths = require('tsconfig-paths');

// // Read tsconfig.build.json
// const tsConfigPath = path.resolve(__dirname, './tsconfig.build.json');
// const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));

// // If tsConfig.build.json extends another file, merge them
// if (tsConfig.extends) {
//     const parentConfigPath = path.resolve(__dirname, tsConfig.extends);
//     const parentConfig = JSON.parse(fs.readFileSync(parentConfigPath, 'utf8'));
//     Object.assign(tsConfig, parentConfig, tsConfig);
// }

// // Log the content of tsconfig.build.json
// console.log('Read tsconfig.build.json:', tsConfig);

// // Check if the compilerOptions property exists
// if (!tsConfig.compilerOptions) {
//     console.error('Error: compilerOptions not found in tsConfig.build.json');
//     process.exit(1);
// }

// // Log the paths and outDir
// console.log('Registering tsconfig paths:', tsConfig.compilerOptions.paths);
// console.log('Base URL:', path.resolve(__dirname, tsConfig.compilerOptions.outDir));

// // Register tsconfig paths
// tsConfigPaths.register({
//     baseUrl: path.resolve(__dirname, tsConfig.compilerOptions.outDir),
//     paths: tsConfig.compilerOptions.paths,
// });

// console.log('Paths registered successfully');

// // Check if the specific module exists
// const modulePath = path.resolve(
//     __dirname,
//     tsConfig.compilerOptions.outDir,
//     'core/filters/all-exceptions.filter.js'
// );
// if (!fs.existsSync(modulePath)) {
//     console.error(`Module not found: ${modulePath}`);
//     process.exit(1);
// }

// const fs = require('fs');
// const path = require('path');
// const tsConfigPaths = require('tsconfig-paths');

// // Read tsconfig.build.json
// const tsConfigPath = path.resolve(__dirname, './tsconfig.build.json');
// const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));

// // Log the content of tsconfig.build.json
// console.log('Read tsconfig.build.json:', tsConfig);

// // Check if the compilerOptions property exists
// if (!tsConfig.compilerOptions) {
//     console.error('Error: compilerOptions not found in tsconfig.build.json');
//     process.exit(1);
// }

// // Log the paths and outDir
// console.log('Registering tsconfig paths:', tsConfig.compilerOptions.paths);
// console.log('Base URL:', tsConfig.compilerOptions.outDir);

// // Register tsconfig paths
// tsConfigPaths.register({
//     baseUrl: tsConfig.compilerOptions.outDir,
//     paths: tsConfig.compilerOptions.paths,
// });

// console.log('Paths registered successfully');

// const tsConfig = require('./tsconfig.build.json');
// const tsConfigPaths = require('tsconfig-paths');

// console.log('Registering tsconfig paths:', tsConfig.compilerOptions);

// console.log('Registering tsconfig paths:', tsConfig.compilerOptions.paths);
// console.log('Base URL:', tsConfig.compilerOptions.outDir);

// tsConfigPaths.register({
//     baseUrl: tsConfig.compilerOptions.outDir,
//     paths: tsConfig.compilerOptions.paths,
// });

// console.log('Paths registered successfully');

// // Try resolving a known path
// const resolvedPath = tsConfigPaths.matchPath('@filters/all-exceptions.filter');
// console.log('Resolved path for @filters/all-exceptions.filter:', resolvedPath);

// const tsConfig = require('./tsconfig.json');
// const tsConfigPaths = require('tsconfig-paths');

// console.log('Base URL:', tsConfig.compilerOptions.outDir);
// console.log('Registering tsconfig paths:', tsConfig.compilerOptions.paths);

// tsConfigPaths.register({
//     baseUrl: tsConfig.compilerOptions.outDir,
//     paths: tsConfig.compilerOptions.paths,
// });

// console.log('Paths registered successfully');

// const tsConfig = require('./tsconfig.json');
// const tsConfigPaths = require('tsconfig-paths');

// console.log(
//     'CALEEEEEEEEEEEEEEEEEEEEEEEEE',
//     tsConfig.compilerOptions.paths,
//     tsConfig.compilerOptions.outDir
// );

// // const baseUrl = './dist'; // Either absolute or relative path. If relative it's resolved to current working directory.
// tsConfigPaths.register({
//     baseUrl: tsConfig.compilerOptions.outDir,
//     paths: tsConfig.compilerOptions.paths,
// });
