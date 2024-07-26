import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { PaginationService } from '@services/pagination.service';
import { PrismaService } from '@services/prisma.service';
import { UtilsService } from '@services/util.service';
import { PaginationResponseDto } from '@utils/dto/pagination-response.dto';
import { PaginationQueryDto } from '@utils/dto/pagination.dto';
import { DeepPartial } from '@utils/types/deep-partial.type';
import { IPaginationFieldConfig } from '@utils/types/pagination-options';

import { CreateDto } from './dto/create.dto';
import { Currency } from './dto/currency';
import { Query } from './query';

/**
 * @fileoverview
 * This file defines the `CurrenciesService` class, which provides methods to manage currency data.
 * It includes operations for creating, updating, retrieving, and deleting currencies.
 *
 * @module
 * @description
 * The `CurrenciesService` class is responsible for handling business logic related to currencies.
 * It interacts with the database through the `PrismaService` and performs various operations using raw SQL queries.
 */
@Injectable()
export class CurrenciesService {
    private readonly MODULE: string;

    /**
     * Creates an instance of `CurrenciesService`.
     * @param {PaginationService} paginationService - Service to handle pagination logic.
     * @param {PrismaService} prisma - Service to interact with the database.
     * @param {Query} query - Service for SQL query generation.
     * @param {UtilsService} utilsService - Service for utility functions, including dynamic query building.
     */

    constructor(
        private readonly paginationService: PaginationService,
        private readonly prisma: PrismaService,
        private readonly query: Query,
        private readonly utilsService: UtilsService
    ) {
        this.MODULE = 'currency';
    }

    /**
     * Creates a new currency.
     * @param {CreateDto} createDto - Data required to create a new currency.
     * @returns {Promise<Currency>} The created currency object.
     * @throws {HttpException} If the currency code already exists or if an error occurs during creation.
     */

    async create(createDto: CreateDto): Promise<Currency> {
        // Check Code for prevent duplicate
        const find = await this.prisma.executeRawQuery(this.query.findByCode(), createDto);

        if (find) {
            throw new HttpException({ message: 'CODE ALREADY EXIST' }, HttpStatus.CONFLICT);
        }

        // Create
        const inserted = await this.prisma.executeRawQuery(this.query.insert(), createDto, [
            'name',
        ]);

        if (inserted && inserted.insertid) {
            const get = await this.findOne(inserted.insertid);

            return get as any;
        } else {
            throw new HttpException(
                { message: 'Something went wrong' },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * Updates an existing currency by its ID.
     * @param {string} id - The ID of the currency to update.
     * @param {DeepPartial<Currency>} payload - Data to update the currency with.
     * @returns {Promise<Currency | null>} The updated currency object or null if not found.
     * @throws {HttpException} If nothing to update is provided, if the code already exists, or if an error occurs during the update.
     */

    async update(id: string, payload: DeepPartial<Currency>): Promise<Currency | null> {
        if (Object.keys(payload).length === 0) {
            throw new HttpException(
                {
                    message: 'Nothing to be update!',
                },
                HttpStatus.BAD_REQUEST
            );
        }
        if (payload.code) {
            // Check Code

            const find = await this.prisma.executeRawQuery(this.query.findByCode(id), payload);

            if (find) {
                throw new HttpException(
                    {
                        message: 'Code already exists!',
                    },
                    HttpStatus.CONFLICT
                );
            }
        }

        payload.id = id;

        // Update
        const updated = await this.prisma.executeRawQuery(this.query.update(), payload, ['name']);

        if (!updated) {
            throw new HttpException(
                { message: 'Something went wrong' },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }

        if (updated[0]?.updatedid) {
            const get = await this.findOne(id);
            return get;
        } else {
            throw new HttpException({ message: `${this.MODULE} not found` }, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Retrieves a paginated list of currencies.
     * @param {PaginationQueryDto} paginationQuery - Pagination and filtering parameters.
     * @returns {Promise<PaginationResponseDto<Currency>>} A paginated list of currencies.
     */

    async findAll(paginationQuery: PaginationQueryDto): Promise<PaginationResponseDto<Currency>> {
        const baseFields = this.query.pgBaseSelectField();
        const fromQuery = this.query.pgBaseQuery();

        const fieldConfigs: Record<string, IPaginationFieldConfig> = null;

        const { selectQuery, countQuery } = this.utilsService.buildDynamicQuery(
            paginationQuery,
            fieldConfigs,
            baseFields,
            fromQuery,
            'ptbl.id_currency'
        );

        return this.paginationService.paginate<Currency>(selectQuery, countQuery, paginationQuery);

        // const { joinTables, selectFields, filterQuery, sortByQuery } =
        //     this.utilsService.buildDynamicQuery(paginationQuery, fieldConfigs);

        // const selectQuery = `SELECT ${baseFields.join(', ')} ${selectFields} ${fromQuery} ${joinTables.join(' ')} ${filterQuery} ${sortByQuery}`;
        // const countQuery = `SELECT count(*) ${fromQuery} ${joinTables.join(' ')} ${filterQuery}`;

        // const { selectQuery, countQuery } = this.utilsService.queryStatements(
        //     baseFields,
        //     selectFields,
        //     fromQuery,
        //     joinTables,
        //     filterQuery,
        //     sortByQuery
        // );
    }

    /**
     * Deletes a currency by its ID.
     * @param {string} id - The ID of the currency to delete.
     * @returns {Promise<object>} An object indicating the result of the deletion.
     * @throws {HttpException} If an error occurs during deletion or if the currency is not found.
     */

    async delete(id: string): Promise<object> {
        // Delete
        const deleted = await this.prisma.executeRawQuery(this.query.delete(), id);

        if (!deleted) {
            throw new HttpException(
                { message: 'Something went wrong' },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }

        if (deleted[0]?.deletedid) {
            return { status: 'success' };
        } else {
            throw new HttpException({ message: `${this.MODULE} not found` }, HttpStatus.NOT_FOUND);
        }
    }

    /*** HELPER METHODS */

    /**
     * Retrieves a currency by its ID.
     * @param {string} id - The ID of the currency to retrieve.
     * @returns {Promise<Currency>} The currency object.
     */

    async findOne(id: string): Promise<Currency> {
        // Get
        const data = await this.prisma.executeRawQuery(this.query.findById(), { id });

        return data;
    }
}
