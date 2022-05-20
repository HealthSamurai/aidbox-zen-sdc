import React from 'react';

import { useService } from 'aidbox-react/lib/hooks/service';
import { isFailure, success } from 'aidbox-react/lib/libs/remoteData';
import { resetInstanceToken, setInstanceToken } from 'aidbox-react/lib/services/instance';

import { User } from '../../contrib/aidbox';
import { getToken, getUserInfo, removeToken, isNetworkError } from '../../services/auth';

const token = getToken();

interface Context {
    user: User | null;
}

export const InitialDataContext = React.createContext<Context | null>(null);

export const useApp = () => {
    const [userRD] = useService<User | null>(async () => {
        if (!token) {
            return success(null);
        }
        setInstanceToken(JSON.parse(token));
        const response = await getUserInfo();
        if (isFailure(response) && !isNetworkError(response.error)) {
            resetInstanceToken();
            removeToken();
            location.reload();
            return success(null);
        }

        return response;
    });
    return userRD;
};
