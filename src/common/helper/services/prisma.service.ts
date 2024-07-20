import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthIndicatorResult } from '@nestjs/terminus';

import { Prisma, PrismaClient } from '@prisma/client';
import * as _ from 'lodash';

import { AllConfigType } from '@config/type/config.type';

// import { ConfigService } from '../services/config.service';

/**
 * Prisma service
 * @export
 * @class PrismaService
 */

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(private readonly configService: ConfigService<AllConfigType>) {
        super({
            datasources: {
                db: {
                    url: configService.get('database.url', { infer: true }), // configService.prismaConfig,
                },
            },
        });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    // async executeRawQuery(query: string, params?: any[]): Promise<any> {
    //     return this.$queryRawUnsafe(query, ...params);
    // }

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
            result = !_.isEmpty(rows) ? rows[0] : null; //do not change null to balnk object
        } else {
            result = rows;
        }

        return result;
    }

    async executeTransaction(
        actions: (prisma: Prisma.TransactionClient) => Promise<any>
    ): Promise<any> {
        return this.$transaction(actions);
    }

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
