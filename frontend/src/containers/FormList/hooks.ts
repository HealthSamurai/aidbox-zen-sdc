import { useService } from 'aidbox-react/lib/hooks/service';
import { service } from 'aidbox-react/lib/services/service';

export type ZenForms = Record<string, object>;

export function useFormList() {
    const forms = useService(() =>
        service<ZenForms>({ url: '$zen-get2', params: { tag: 'aidbox.sdc/Form' } }),
    );
    return forms;
}
