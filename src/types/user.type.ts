
export type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export type UserParmas = {
    login: string;
    password: string;
    age: number;
}

export interface IFilterParams{
    loginSubstring: string;
    limit: number;
}

// eslint-disable-next-line no-undef
export interface TypedRequestQuery<T> extends Express.Request {
    query: T;
}
