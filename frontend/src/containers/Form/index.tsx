import { RenderRemoteData } from 'aidbox-react/lib/components/RenderRemoteData';
import { Link } from 'react-router-dom';
import { useForm } from './hooks';

export function Form() {
    const [formRD] = useForm();
    return (
        <div>
            <Link to="/">{`<- Back`}</Link>
            <RenderRemoteData remoteData={formRD}>
                {(form) => <pre>{JSON.stringify(form.model.layout, undefined, 4)}</pre>}
            </RenderRemoteData>
        </div>
    );
}
