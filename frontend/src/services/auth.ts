import { RemoteDataResult } from 'aidbox-react/lib/libs/remoteData';
import { setInstanceToken } from 'aidbox-react/lib/services/instance';
import { resetInstanceToken } from 'aidbox-react/lib/services/instance';
import { service } from 'aidbox-react/lib/services/service';
import { Token } from 'aidbox-react/lib/services/token';

import { User } from '../contrib/aidbox';

export interface AppToken extends Token {
    userinfo: any;
}

export interface SigninBody {
    email: string;
    password: string;
}

export function signin(data: SigninBody): Promise<RemoteDataResult<AppToken>> {
    return service({
        url: '/auth/token',
        method: 'POST',
        data: {
            username: data.email,
            password: data.password,
            client_id: 'SPA',
            grant_type: 'password',
        },
    });
}

export const setToken = (token: Token) => {
    setInstanceToken(token);
    localStorage.setItem('token', JSON.stringify(token));
};

export function getUserInfo() {
    return service<User>({
        method: 'GET',
        url: '/auth/userinfo',
    });
}

export function getToken() {
    return localStorage.getItem('token') || undefined;
}

export function removeToken() {
    localStorage.removeItem('token');
}

export function baseLogout() {
    resetInstanceToken();
    removeToken();
    window.location.reload();
}

const axiosNetworkError = 'Network Error';

export function isNetworkError(error: any) {
    return error === axiosNetworkError;
}
