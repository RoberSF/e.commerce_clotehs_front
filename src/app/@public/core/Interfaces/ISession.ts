import { IUser } from './IUser';
import { IMenuUser } from './IMenuUser';
export interface ISession {
    expiresIn: string,
    token?: string
}

export interface IMeData {
    status: boolean,
    message?: string,
    user?: IUser,
    menu?: IMenuUser
}

