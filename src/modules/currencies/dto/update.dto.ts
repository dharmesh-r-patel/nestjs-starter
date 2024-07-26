// import { PartialType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

import { CreateDto } from './create.dto';

/**
 * @fileoverview
 * This file defines the `UpdateDto` class, which represents the Data Transfer Object (DTO)
 * used for updating an existing currency entity. It extends from the `CreateDto` class,
 * making all fields optional for the update operation.
 *
 * @module
 * @description
 * The `UpdateDto` class is used to define the structure of the data required to update
 * an existing currency entity. It inherits all properties from the `CreateDto` class but
 * makes them optional, allowing partial updates.
 */

export class UpdateDto extends PartialType(CreateDto) {}
