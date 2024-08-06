import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthIndicatorResult } from '@nestjs/terminus';

import { Prisma, PrismaClient } from '@prisma/client';
import * as _ from 'lodash';

import { AllConfigType } from '@config/type/config.type';

// import { ConfigService } from '../services/config.service';

/**
 * PrismaService
 *
 * @description
 * `PrismaService` is a service that extends the PrismaClient class to manage database operations with Prisma ORM. It handles
 * initialization and teardown of database connections, executes raw queries with parameter escaping, supports transactions,
 * and provides a health check for the database connection.
 *
 * @export
 * @class PrismaService
 * @extends PrismaClient
 * @implements {OnModuleInit}
 * @implements {OnModuleDestroy}
 */

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    /**
     * Creates an instance of PrismaService.
     *
     * @param {ConfigService<AllConfigType>} configService - The configuration service for retrieving database connection details.
     */

    constructor(private readonly configService: ConfigService<AllConfigType>) {
        super({
            datasources: {
                db: {
                    url: configService.get('database.url', { infer: true }), // configService.prismaConfig,
                },
            },
        });
    }

    /**
     * Called when the module is initialized. Connects to the database.
     *
     * @returns {Promise<void>}
     */

    async onModuleInit(): Promise<void> {
        await this.$connect();
    }

    /**
     * Called when the module is destroyed. Disconnects from the database.
     *
     * @returns {Promise<void>}
     */

    async onModuleDestroy(): Promise<void> {
        await this.$disconnect();
    }

    // async executeRawQuery(query: string, params?: any[]): Promise<any> {
    //     return this.$queryRawUnsafe(query, ...params);
    // }

    /**
     * Executes a raw query with optional data and field sanitization.
     *
     * @param {any} queryObj - The query object with a `syntax` method to generate the query string.
     * @param {any} [data=null] - Optional data to be used in the query.
     * @param {string[]} [fields=[]] - Optional fields to be sanitized in the data.
     *
     * @returns {Promise<any>} - The result of the query.
     */

    async executeRawQuery(
        queryObj: any = null,
        data: any = null,
        fields: string[] = []
    ): Promise<any> {
        const newObj = Object.assign({}, data);

        if (typeof data == 'object' && data instanceof Object && !(data instanceof Array)) {
            for (const [key, value] of Object.entries(newObj)) {
                const found = fields.includes(key);
                if (found) {
                    const escValue = value as any;
                    // newObj[key] = escValue.replace(/'/g, "\\'");
                    newObj[key] = escValue.replace(/'/g, "''");
                }
            }
        }

        let query: string;
        if (data) {
            query = queryObj.syntax(
                typeof data == 'object' && data instanceof Object && !(data instanceof Array)
                    ? newObj
                    : data
            );
        } else {
            query = queryObj.syntax();
        }

        // return this.$queryRawUnsafe(query, ...params);
        const rows = await this.$queryRawUnsafe(query);

        let result: any;
        if (queryObj.type == 'SELECT_ONE' || queryObj.type == 'INSERT') {
            result = !_.isEmpty(rows) ? rows[0] : null; //do not change null to blank object
        } else {
            result = rows;
        }

        return result;
    }

    /**
     * Executes a transaction with Prisma.
     *
     * @param {(prisma: Prisma.TransactionClient) => Promise<any>} actions - A function containing the transactional operations.
     *
     * @returns {Promise<any>} - The result of the transaction.
     */

    async executeTransaction(
        actions: (prisma: Prisma.TransactionClient) => Promise<any>
    ): Promise<any> {
        return this.$transaction(actions);
    }

    /**
     * Checks the health of the Prisma connection by executing a simple query.
     *
     * @returns {Promise<HealthIndicatorResult>} - The result of the health check.
     */

    async isHealthy(): Promise<HealthIndicatorResult> {
        try {
            await this.$queryRaw`SELECT 1`;
            // console.log('RESULTTTTTTTTTTTTTTTTTTTT', x);
            return Promise.resolve({
                prisma: {
                    status: 'up',
                },
            });
        } catch (e) {
            return Promise.resolve({
                prisma: {
                    status: 'down',
                },
            });
        }
    }
}
