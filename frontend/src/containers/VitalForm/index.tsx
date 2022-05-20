import { parseEDNString } from 'edn-data';
import React, { ReactNode } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';

import s from './VitalForm.module.css';

const EDNString = `{ns vitals
 import #{zenbox aidbox.sdc}

 VitalsDocument
 {:zen/tags #{zen/schema aidbox.sdc/doc}
  ;:type "box.sdc-example/VitalsDocument"
  :type zen/map
  :confirms #{aidbox.sdc/Document}
  :keys {:blood-pressure-dias {:type zen/number, :zen/desc "Blood pressure diastolic"},
         :blood-pressure-sys {:type zen/number, :zen/desc "Blood pressure Systolic"},
         :resp-rate {:type zen/integer, :zen/desc "Resp rate"},
         :heart-rate {:type zen/integer, :zen/desc "Heart rate"},
         :body-height {:type zen/integer, :zen/desc "Body height"},
         :sao2-%-blda-pulseox {:type zen/number, :zen/desc "SaO2 % BldA PulseOx"},
         :brach-a-l-bp-sys {:type zen/number, :zen/desc "Brach a-L BP sys"},
         :weight {:type zen/integer, :zen/desc "Weight"},
         :body-temperature {:type zen/number, :zen/desc "Body temperature"}
         :bmi {:type zen/number, :zen/desc "BMI"}}}

 VitalsForm
 {:zen/tags #{aidbox.sdc/Form}
  :document VitalsDocument
  :engine aidbox.sdc/Hiccup
  :layout [:fukudo
   [:header "Vitals"]
   [:field {:bind [:body-temperature], :label "Temperature", :unit "F"}]
   [:field {:type "double", :bind [:blood-pressure-dias :blood-pressure-sys], :label "Blood Pressure", :unit "mmHg"}]
   [:box
    [:col [:label "Blood Pressure"]]
    [:col [:input {:bind [:blood-pressure-dias]}]]
    [:col [:input {:bind [:blood-pressure-sys]}]]
   ]
   [:field {:bind [:heart-rate], :label "Pulse Rate", :unit "bpm"}]
   [:field {:bind [:resp-rate], :label "Respiratory rate", :unit "bpm"}]
   [:field {:bind [:sao2-%-blda-pulseox], :label "Oxygen saturation", :unit "%SpO2"}]
   [:field {:bind [:weight], :label "Weight", :unit "lbs"}]
   [:field {:bind [:body-height], :label "Height"}]
   [:field {:bind [:bmi], :label "BMI"}]
  ]
 }
}`;

const EDNPlainObject: any = parseEDNString(EDNString);
const formEDN: any = EDNPlainObject.map.find((x: any) => x[0].sym === 'VitalsForm')?.[1];
const formLayout: any = formEDN.map.find((x: any) => x[0].key === 'layout')?.[1];

function renderFukudoFormItem(item: any): ReactNode | null {
    console.log('renderFukudoFormItem call', item);
    if (!(item instanceof Array)) return null;

    if (item[0].key === 'field') {
        const attrsEDN = item[1].map;
        if (!attrsEDN) return null;
        const bindEDN = attrsEDN.find((x: any) => x[0].key === 'bind')?.[1];
        const fieldType = attrsEDN.find((x: any) => x[0].key === 'type')?.[1];
        if (fieldType === 'double') {
            const attrs = {
                binds: [bindEDN[0]?.key, bindEDN[1]?.key],
                label: attrsEDN.find((x: any) => x[0].key === 'label')?.[1],
            };

            return (
                <div className={s.fukudo_row}>
                    <label className={s.fukudo_label} htmlFor={`fukudo-input-${attrs.binds[0]}`}>
                        {attrs.label}
                    </label>
                    <input
                        name={attrs.binds[0]}
                        type="number"
                        id={`fukudo-input-${attrs.binds[0]}`}
                    />
                    /
                    <input
                        name={attrs.binds[1]}
                        type="number"
                        id={`fukudo-input-${attrs.binds[1]}`}
                    />
                </div>
            );
        } else {
            const attrs = {
                bind: bindEDN ? bindEDN[0].key : null,
                label: attrsEDN.find((x: any) => x[0].key === 'label')?.[1],
            };

            return (
                <div className={s.fukudo_row}>
                    <label className={s.fukudo_label} htmlFor={`fukudo-input-${attrs.bind}`}>
                        {attrs.label}
                    </label>
                    <input name={attrs.bind} type="number" id={`fukudo-input-${attrs.bind}`} />
                </div>
            );
        }
    }
    if (item[0].key === 'header') {
        return <h2 className={s.fukudo_header}>{item[1]}</h2>;
    }
    if (item[0].key === 'row') {
        return (
            <div className={s.fukudo_row}>
                {item.slice(1).map((child: any) => renderFukudoFormItem(child))}
            </div>
        );
    }
    if (item[0].key === 'box') {
        return (
            <div className={`${s.fukudo_row} ${s.fukudo_box}`}>
                {item.slice(1).map((child: any) => renderFukudoFormItem(child))}
            </div>
        );
    }
    if (item[0].key === 'col') {
        return (
            <div className={s.fukudo_col}>
                {item.slice(1).map((child: any) => renderFukudoFormItem(child))}
            </div>
        );
    }
    if (item[0].key === 'label') {
        return <label className={s.fukudo_label}>{item[1]}</label>;
    }
    if (item[0].key === 'input') {
        const attrsEDN = item[1].map;
        if (!attrsEDN) return null;
        const bindEDN = attrsEDN.find((x: any) => x[0].key === 'bind')?.[1];
        const attrs = {
            bind: bindEDN ? bindEDN[0].key : null,
        };
        return <input name={attrs.bind} type="number" id={`fukudo-input-${attrs.bind}`} />;
    }

    return null;
}

export function VitalForm() {
    // const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    // const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
    // console.log(watch("example")); // watch input value by passing the name of it

    console.log(formLayout);

    return (
        <div className={s.container}>
            <form className={s.fukudo_form}>
                {formLayout.map((item: any) => renderFukudoFormItem(item))}
                <div className={s.fukudo_actions}>
                    <input type="submit" />
                </div>
            </form>
        </div>
    );
}
