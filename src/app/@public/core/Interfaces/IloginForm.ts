import { IUser } from './IUser';
import { IMenuUser } from './IMenuUser';
export interface ILogin {
    email: string,
    password: any
}

export interface IResultLogin {
    status: boolean;
    message: string;
    token?: string;
    user?: IUser;
    menu?: IMenuUser
}