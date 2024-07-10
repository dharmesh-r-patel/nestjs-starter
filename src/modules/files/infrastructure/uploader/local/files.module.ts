import { Module } from '@nestjs/common';

import { FilesLocalController } from './files.controller';
import { FilesLocalService } from './files.service';

@Module({
    controllers: [FilesLocalController],
    providers: [FilesLocalService],
    exports: [FilesLocalService],
})
export class FilesLocalModule {}
