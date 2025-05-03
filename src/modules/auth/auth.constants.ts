import { StringValue } from 'ms';

export const authValues: TAuthValues = {
    jwt: {
        secret: process.env.JWT_SECRET || 'secret',
        expirationTime: (process.env.JWT_EXPIRATION_TIME as StringValue) || '240H',
    },
};

type TAuthValues = {
    jwt: {
        secret: string;
        expirationTime: StringValue;
    };
};
