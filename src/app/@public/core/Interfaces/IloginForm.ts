import { IUser } from './IUser';
import { IMenuUser } from './IMenuUser';
export interface ILogin {
    email: String,
    password: any
}

export interface IResultLogin {
    status: boolean;
    message: string;
    token?: string;
    user?: IUser;
    menu?: IMenuUser
}