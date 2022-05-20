import { useService } from 'aidbox-react/lib/hooks/service';
import { service } from 'aidbox-react/lib/services/service';
import { useParams } from 'react-router';

export function useForm() {
    const { nameSpace, name } = useParams();
    const form = useService(() =>
        service({ url: '$zen-get2', params: { symbol: `${nameSpace}/${name}` } }),
    );
    return form;
}
