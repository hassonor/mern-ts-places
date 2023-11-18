import { Request } from 'express';

export class Helpers {
    static firstLetterUppercase(str: string): string {
        const valueString = str.toLowerCase();
        return valueString.split(' ').map((value: string) => `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`).join(' ');
    }

    static lowerCase(str: string): string {
        return str.toLowerCase();
    }

    static generateRandomIntegers(integerLength: number): number {
        const characters = '0123456789';
        let result = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < integerLength; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return parseInt(result, 10);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static parseJson(prop: string): any {
        try {
            return JSON.parse(prop);
        } catch (err) {
            return prop;
        }
    }

    static getQueryParamsWithPagination(req: Request, defaultLimit = 100, defaultPage = 1,): {
        page: number,
        limit: number,
        sortString: string,
        filterString: string
    } {
        let page = parseInt(req.query.page as string) || 1;
        let limit = parseInt(req.query.limit as string) || defaultLimit;

        if (!Number.isInteger(page) || page <= 0) {
            page = defaultPage;
        }

        if (!Number.isInteger(limit) || limit <= 0) {
            limit = defaultLimit;
        }

        const sort = req.query.sort ? JSON.parse(req.query.sort as string) : {};
        const filter = req.query.filter ? JSON.parse(req.query.filter as string) : {};

        return {
            page,
            limit,
            sortString: JSON.stringify(sort),
            filterString: JSON.stringify(filter)
        };
    }

    static isDataURL(value: string): boolean {
        const dataUrlRegex = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\\/?%\s]*)\s*$/i;
        return dataUrlRegex.test(value);
    }
}