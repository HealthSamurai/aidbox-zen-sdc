import { isSuccess } from 'aidbox-react/lib/libs/remoteData';
import { useCallback, useState } from 'react';

import { setToken, signin } from '../../services/auth';

export const useSignIn = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const signIn = useCallback(async () => {
        const values = {email:username, password}
        const signinResponse = await signin(values);
        if (isSuccess(signinResponse)) {
            const { access_token, token_type } = signinResponse.data;
            setToken({ access_token, token_type });
            console.log(JSON.stringify({ text: 'SignIn success', email: values.email }));
            window.location.reload();
        } else {
            alert(
                signinResponse.error.error_description
                    ? signinResponse.error.error_description
                    : JSON.stringify(signinResponse.error),
            );
        }
    }, [username, password]);

    return { signIn, username, password, setUsername, setPassword };
};
