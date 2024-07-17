import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

import { ConfigService } from './services/config.service';
import { PaginationService } from './services/pagination.service';
import { PrismaService } from './services/prisma.service';
import { UtilsService } from './services/util.service';

const providers = [ConfigService, PaginationService, PrismaService, UtilsService];

@Global()
@Module({
    // imports: [],
    // providers: [ConfigService, PrismaService],
    // controllers: [],
    // exports: [ConfigService, PrismaService],
    providers,
    imports: [HttpModule],
    exports: [...providers, HttpModule],
})
export class HelperModule {}

// import { Module } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';

// import { EncryptionService } from './services/encryption.service';
// import { PrismaService } from './services/prisma.service';
// import { TaskService } from './services/task.service';

// @Module({
//   imports: [],
//   providers: [JwtService, EncryptionService, PrismaService, TaskService],
//   controllers: [],
//   exports: [EncryptionService, PrismaService, TaskService],
// })
// export class HelperModule {}
