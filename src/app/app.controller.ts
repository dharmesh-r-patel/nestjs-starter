import { Controller, Get } from '@nestjs/common'; // VERSION_NEUTRAL
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

import { PrismaService } from '@services/prisma.service';
// import { PublicRoute } from 'src/core/decorators/public.request.decorator';

// @Controller({
//     version: VERSION_NEUTRAL,
//     path: '/',
// })
@ApiTags('Health')
@Controller()
export class AppController {
    constructor(
        private readonly healthCheckService: HealthCheckService,
        private readonly prismaService: PrismaService
    ) {}

    @Get('/health')
    @HealthCheck()
    // @PublicRoute()
    public async getHealth() {
        return this.healthCheckService.check([() => this.prismaService.isHealthy()]);
    }
}
