import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AllConfigType } from '@config/type/config.type';

@Injectable()
export class HomeService {
    constructor(private configService: ConfigService<AllConfigType>) {}

    appInfo() {
        return {
            name: this.configService.get('app.name', { infer: true }),
            description: this.configService.get('app.description', { infer: true }),
            appPrefix: this.configService.get('app.appPrefix', { infer: true }),
            apiPrefix: this.configService.get('app.apiPrefix', { infer: true }),
        };
    }
}
