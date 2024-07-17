import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { countries } from './data/countries-currencies-timezones';

export const seed = async (): Promise<void> => {
    for (const country of countries) {
        const resCountry = await prisma.countries.create({
            data: {
                name: country.name,
                nice_name: country.nice_name,
                iso: country.iso,
                iso3: country.iso3,
                num_code: country.num_code.toString(),
                dial_code: country.dial_code,
                capital: country.capital,
                continent: country.continent,
            },
        });

        const resCurrency = await prisma.currencies.create({
            data: {
                code: country.currency.code,
                name: country.currency.name,
                name_plural: country.currency.name_plural,
                symbol: country.currency.symbol,
                symbol_native: country.currency.symbol_native,
                decimal_digits: country.currency.decimal_digits,
                rounding: country.currency.rounding,
                country_code: country.iso,
            },
        });

        const resTimezone = await prisma.timezone.create({
            data: {
                value: country.timezone.value,
                offset: country.timezone.offset,
                offset_in_minutes: country.timezone.offset_in_minutes,
                abbr: country.timezone.abbr,
                text: country.timezone.text,
            },
        });

        await prisma.countries.update({
            where: { id_country: resCountry.id_country },
            data: {
                id_currency: resCurrency.id_currency,
                id_timezone: resTimezone.id_timezone,
            },
        });

        // currency: {
        //     code: 'AFN',
        //     name: 'Afghan Afghani',
        //     name_plural: 'Afghan Afghanis',
        //     symbol: '؋',
        //     symbol_native: '؋',
        //     decimal_digits: 2,
        //     rounding: 0,
        // },

        console.log(resCountry);
    }
};

void seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// // import { countries } from './data/countries';
// // import { countriesjson } from './data/countries-json';
// // import { currencies } from './data/currencies';

// export const seed = async (): Promise<void> => {
//     // Create countries
//     // await prisma.countries.createMany({
//     //     data: countries,
//     //     skipDuplicates: true,
//     // });
//     // for (const ctrjsn of countriesjson) {
//     //     const existingCountry = await prisma.countries.findFirst({
//     //         where: { iso: ctrjsn.code },
//     //     });
//     //     if (existingCountry) {
//     //         // hi
//     //     } else {
//     //         console.log('NOT FOUND', ctrjsn);
//     //         await prisma.countries.create({
//     //             data: {
//     //                 iso: ctrjsn.code,
//     //                 name: ctrjsn.name,
//     //                 nice_name: ctrjsn.name,
//     //                 iso3: ctrjsn.code,
//     //                 dial_code: ctrjsn.phoneCode,
//     //             },
//     //         });
//     //     }
//     // }
//     // for (const ctrjsn of countriesjson) {
//     //     const existingCountry = await prisma.currencies.findFirst({
//     //         where: { code: ctrjsn.currency },
//     //     });
//     //     if (existingCountry) {
//     //         // hi
//     //     } else {
//     //         console.log('NOT FOUND', ctrjsn);
//     //         // await prisma.countries.create({
//     //         //     data: {
//     //         //         iso: ctrjsn.code,
//     //         //         name: ctrjsn.name,
//     //         //         nice_name: ctrjsn.name,
//     //         //         iso3: ctrjsn.code,
//     //         //         dial_code: ctrjsn.phoneCode,
//     //         //     },
//     //         // });
//     //     }
//     // }
//     // for (const currency of currencies) {
//     //     console.log('hi', currency);
//     //     // Check if there is a matching currency in the `currencies` table
//     //     const existingCountry = await prisma.countries.findFirst({
//     //         where: { iso: currency.code },
//     //     });
//     //     await prisma.currencies.create({
//     //         data: {
//     //             code: currency.currency.code,
//     //             name: currency.currency.name,
//     //             name_plural: currency.currency.name_plural,
//     //             symbol: currency.currency.symbol,
//     //             symbol_native: currency.currency.symbol_native,
//     //             decimal_digits: currency.currency.decimal_digits,
//     //             rounding: currency.currency.rounding,
//     //             country_code: currency.code,
//     //         },
//     //     });
//     //     if (existingCountry) {
//     //         await prisma.countries.update({
//     //             where: { idCountry: existingCountry.idCountry },
//     //             data: {
//     //                 continent: currency.continent,
//     //                 capital: currency.capital,
//     //             },
//     //         });
//     //         // // Upsert (create or update) the country
//     //         // await prisma.countries.upsert({
//     //         //     where: { iso: currency.code },
//     //         //     update: countryData,
//     //         //     create: countryData,
//     //         // });
//     //     }
//     // }
// };

// // void seed();

// void seed()
//     .catch((e) => {
//         console.error(e);
//         process.exit(1);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });
