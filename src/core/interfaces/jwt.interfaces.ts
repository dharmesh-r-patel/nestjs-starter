'use strict';

export interface IJWTConfig {
    secret: string;
    algorithm: string;
    expiresInSeconds: number;
    expirationTime: number;
    issuer: string;
    audience: string;
}
