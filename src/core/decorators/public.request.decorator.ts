import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { PUBLIC_ROUTE_KEY } from '../constants/core.constant';

/**
 * Custom decorator that marks a route as public.
 * This can be used to bypass authentication guards.
 *
 * @returns {CustomDecorator<string>} - A custom decorator that sets metadata for the public route.
 *
 * @example
 * // Usage in a controller method
 * @PublicRoute()
 * @Get('public-endpoint')
 * publicEndpoint() {
 *   return 'This is a public endpoint';
 * }
 */

export const PublicRoute = (): CustomDecorator<string> => SetMetadata(PUBLIC_ROUTE_KEY, true);
