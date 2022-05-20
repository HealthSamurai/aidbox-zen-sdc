import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

import { RenderRemoteData } from 'aidbox-react/lib/components/RenderRemoteData';

import { Form } from '../Form';
import { FormList } from '../FormList';
import { SignIn } from '../SignIn';
import { VitalForm } from '../VitalForm';
import { useApp } from './useApp';

export function App() {
    const userRD = useApp();

    return (
        <BrowserRouter>
            <RenderRemoteData remoteData={userRD}>
                {(user) => (
                    <Routes>
                        <>
                            {user ? (
                                <>
                                    <Route path="form/:nameSpace/:name" element={<Form />} />
                                    <Route path="/" element={<FormList />} />
                                </>
                            ) : (
                                <>
                                    <Route path="signin" element={<SignIn />} />
                                    <Route path="/" element={<Navigate to="/signin" />} />
                                </>
                            )}
                            <Route path="vital" element={<VitalForm />} />
                        </>
                    </Routes>
                )}
            </RenderRemoteData>
        </BrowserRouter>
    );
}
