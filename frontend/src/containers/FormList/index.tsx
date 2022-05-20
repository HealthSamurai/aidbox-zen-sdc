import { Link } from 'react-router-dom';

import { RenderRemoteData } from 'aidbox-react/lib/components/RenderRemoteData';

import { useFormList } from './hooks';

export function FormList() {
    const [formsRD] = useFormList();
    return (
        <RenderRemoteData remoteData={formsRD}>
            {(forms) => {
                return (
                    <ul>
                        {Object.keys(forms).map((name) => (
                            <li>
                                <Link to={`form/${name}`}>{name}</Link>
                            </li>
                        ))}
                    </ul>
                );
            }}
        </RenderRemoteData>
    );
}
