import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

import { RenderRemoteData } from 'aidbox-react/lib/components/RenderRemoteData';

import { SignIn } from '../SignIn';
import { useApp } from './useApp';

export function App() {
    const userRD = useApp();

    return (
        <BrowserRouter>
            <RenderRemoteData remoteData={userRD}>
                {(user) => (
                    <Routes>
                        {user ? (
                            <Route
                                path="*"
                                element={<pre>{JSON.stringify(user, undefined, 4)}</pre>}
                            />
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
