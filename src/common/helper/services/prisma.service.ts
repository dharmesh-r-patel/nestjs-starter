import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { HealthIndicatorResult } from '@nestjs/terminus';

import { Prisma, PrismaClient } from '@prisma/client';

import { ConfigService } from '../services/config.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        const configService = new ConfigService();
        // console.log(
        //     'ConfigService-------------------------------------------------',
        //     configService.prismaConfig
        // );
        super({
            datasources: {
                db: {
                    url: configService.prismaConfig,
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

    async executeRawQuery(query: string, params?: any[]): Promise<any> {
        return this.$queryRawUnsafe(query, ...params);
    }

    async executeTransaction(
        actions: (prisma: Prisma.TransactionClient) => Promise<any>
    ): Promise<any> {
        return this.$transaction(actions);
    }

    async isHealthy(): Promise<HealthIndicatorResult> {
        try {
            const x = await this.$queryRaw`SELECT 1`;
            console.log('RESULTTTTTTTTTTTTTTTTTTTT', x);
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
