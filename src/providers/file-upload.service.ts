import { unlink, createWriteStream, createReadStream } from 'fs';
import path = require('path');
import url = require('url');

// import { fsRoot } from '../server-config';

/**
 * Gets the root directory of the file system.
 *
 * @export
 * @returns {string} The absolute path to the root directory.
 */

export const fsRoot = () => {
    return path.resolve(__dirname, '../../');
};

/**
 * Gets the root directory for files storage.
 *
 * @export
 * @returns {string} The absolute path to the files storage directory.
 */

export const filesRoot = () => {
    const fs_root_path = fsRoot() + '/drive';
    return fs_root_path.toString();
};

/**
 * Filters files to allow only image files.
 *
 * @export
 * @param {any} req - The request object.
 * @param {any} file - The file object.
 * @param {any} callback - The callback function to signal whether the file should be accepted or rejected.
 */

export const imageFileFilter = (req: any, file: any, callback: any) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

/**
 * Generates a unique file name based on the original file name and current timestamp.
 *
 * @export
 * @param {any} req - The request object.
 * @param {any} file - The file object.
 * @param {any} callback - The callback function to return the new file name.
 */

export const editFileName = (req: any, file: any, callback: any) => {
    const filename = file.originalname.replace(/[^A-Z0-9.]+/gi, '_');
    callback(null, Date.now() + filename);
};

/**
 * Extracts the base name of a file from its path.
 *
 * @export
 * @param {any} src - The file path.
 * @returns {string} The base name of the file.
 */

export const fileName = (src: any) => {
    return path.basename(src);
};

/**
 * Gets the directory path for profile pictures.
 *
 * @export
 * @returns {string} The absolute path to the profile pictures directory.
 */

/*** Profile Picture */
export const profileDestDir = () => {
    return filesRoot() + '/profile';
};

/**
 * Gets the directory path for multiple files.
 *
 * @export
 * @returns {string} The absolute path to the multiple files directory.
 */

/*** Multiple File */
export const multiFileDestDir = () => {
    return filesRoot() + '/files';
};

/**
 * Copies a file from the source path to the destination path and then deletes the source file.
 *
 * @export
 * @param {any} src - The source file path.
 * @param {any} dest - The destination file path.
 */

export const copyFile = (src: any, dest: any) => {
    src = filesRoot() + url.parse(src).pathname;

    // src = fsRoot() + '/' + url.parse(src).pathname;
    const readStream = createReadStream(src);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    readStream.once('error', (err) => {
        // Logger.debug(err);
    });

    readStream.once('end', () => {
        // Logger.debug("done copying");
    });

    readStream.pipe(createWriteStream(dest));

    unlink(src, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
};

/**
 * Removes a file from the specified path.
 *
 * @export
 * @param {any} userPath - The path of the file to be removed.
 */

export const removeFile = (userPath: any) => {
    const absPath = path.join(filesRoot(), userPath);

    unlink(absPath, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
};
