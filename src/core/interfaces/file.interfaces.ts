'use strict';

import { FileDriver } from '@config/type/file-config.type';
export interface IFileConfig {
    driver: FileDriver;
    accessKeyId?: string;
    secretAccessKey?: string;
    awsDefaultS3Bucket?: string;
    awsS3Region?: string;
    maxFileSize: number;
    // encoding: string;
    // buffer: Buffer;
    // fieldname: string;
    // mimetype: string;
    // originalname: string;
    // size: number;
}
