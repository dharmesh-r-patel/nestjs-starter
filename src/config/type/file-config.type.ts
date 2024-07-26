/**
 * Enum representing the available file storage drivers.
 *
 * @enum {string}
 */

export enum FileDriver {
    /** Local file storage driver. */
    LOCAL = 'local',

    /** Amazon S3 storage driver. */
    S3 = 's3',

    /** Amazon S3 with pre-signed URLs storage driver. */
    S3_PRESIGNED = 's3-presigned',
}

/**
 * Configuration settings for file storage.
 *
 * @typedef {Object} FileConfig
 * @property {FileDriver} driver - The file storage driver to use. This determines where and how files are stored.
 * @property {string} [accessKeyId] - The AWS access key ID for S3 storage. Required if `driver` is `S3` or `S3_PRESIGNED`.
 * @property {string} [secretAccessKey] - The AWS secret access key for S3 storage. Required if `driver` is `S3` or `S3_PRESIGNED`.
 * @property {string} [awsDefaultS3Bucket] - The default S3 bucket name for file storage. Required if `driver` is `S3` or `S3_PRESIGNED`.
 * @property {string} [awsS3Region] - The AWS S3 region where the bucket is located. Required if `driver` is `S3` or `S3_PRESIGNED`.
 * @property {number} maxFileSize - The maximum allowed file size for uploads, in bytes.
 */

export type FileConfig = {
    driver: FileDriver;
    accessKeyId?: string;
    secretAccessKey?: string;
    awsDefaultS3Bucket?: string;
    awsS3Region?: string;
    maxFileSize: number;
};
