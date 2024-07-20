import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiParam } from '@nestjs/swagger';

import { PaginationResponse, PaginationResponseDto } from '@utils/dto/pagination-response.dto';
import { PaginationQueryDto } from '@utils/dto/pagination.dto';

import { CurrenciesService } from './currencies.service';
import { CreateDto } from './dto/create.dto';
import { Currency } from './dto/currency';
import { UpdateDto } from './dto/update.dto';

const modules = 'currencies';

@ApiTags('Currencies')
@Controller()
export class CurrenciesController {
    constructor(private readonly currenciesService: CurrenciesService) {}

    /***
     * Create currency
     */

    @Post(`v1/${modules}`)
    @HttpCode(HttpStatus.OK)
    @ApiCreatedResponse({
        type: Currency,
        description: 'Create currency',
    })
    async create(@Body() createDto: CreateDto): Promise<Currency> {
        const created = await this.currenciesService.create(createDto);
        return created;
    }

    /***
     * Update
     */

    @Patch(`v1/${modules}/:id_currency`)
    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'id_currency', type: String })
    @ApiOkResponse({
        type: Currency,
        description: 'Update Currency',
    })
    async update(
        @Param('id_currency') id: string,
        @Body() updateDto: UpdateDto
    ): Promise<Currency | null> {
        console.log('UPDATE', id, updateDto);
        const updated = await this.currenciesService.update(id, updateDto);
        return updated;
    }

    /***
     * get all
     */

    @Get(`v1/${modules}`)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: PaginationResponse(Currency) })
    async findAll(@Query() query: PaginationQueryDto): Promise<PaginationResponseDto<Currency>> {
        const get_all = await this.currenciesService.findAll(query);

        return get_all;
    }

    /***
     * Delete
     */

    @Delete(`v1/${modules}/:id_currency`)
    @HttpCode(HttpStatus.OK)
    @ApiParam({ name: 'id_currency', type: String })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: `${modules} has been successfully deleted.`,
    })
    async delete(@Param('id_currency') id: string): Promise<object> {
        const deleted = await this.currenciesService.delete(id);

        return deleted;
    }
}
