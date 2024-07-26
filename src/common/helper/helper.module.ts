import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

// import { ConfigService } from './services/config.service';
import { PaginationService } from './services/pagination.service';
import { PrismaService } from './services/prisma.service';
import { UtilsService } from './services/util.service';

const providers = [PaginationService, PrismaService, UtilsService]; // ConfigService,

/**
 * @module HelperModule
 *
 * @description
 * The `HelperModule` is a global module that provides common utility services across the application.
 * It is marked as global, meaning its providers are available throughout the application without needing to import the module in other modules.
 *
 * @remarks
 * - The `HttpModule` is imported to allow services within this module to make HTTP requests.
 * - The module exports its services and `HttpModule`, making them available for use in other modules.
 *
 * @example
 * ```typescript
 * @Module({
 *     imports: [HttpModule],
 *     providers: [PaginationService, PrismaService, UtilsService],
 *     exports: [PaginationService, PrismaService, UtilsService, HttpModule],
 * })
 * export class HelperModule {}
 * ```
 */

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
