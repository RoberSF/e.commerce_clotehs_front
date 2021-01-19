import { IUser } from './IUser';


export interface IRegisterForm {
    name: string,
    lastname: string,
    email: string,
    password: string,
    birthday: string,
    role?: string,
    active?: boolean
}

export interface IResultRegister {
    status: boolean;
    message: string;
    token?: string;
    user?: IUser;
}