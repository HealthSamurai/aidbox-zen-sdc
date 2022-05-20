import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

import { RenderRemoteData } from 'aidbox-react/lib/components/RenderRemoteData';

import { SignIn } from '../SignIn';
import { useApp } from './useApp';
import { FormList } from '../FormList';
import { Form } from '../Form';

export function App() {
    const userRD = useApp();

    return (
        <BrowserRouter>
            <RenderRemoteData remoteData={userRD}>
                {(user) => (
                    <Routes>
                        {user ? (
                            <>
                                <Route path="form/:nameSpace/:name" element={<Form />} />
                                <Route path="*" element={<FormList />} />
                            </>
                        ) : (
                            <>
                                <Route path="signin" element={<SignIn />} />
                                <Route path="*" element={<Navigate to="/signin" />} />
                            </>
                        )}
                    </Routes>
                )}
            </RenderRemoteData>
        </BrowserRouter>
    );
}
