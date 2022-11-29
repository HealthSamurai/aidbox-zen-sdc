
# Create a form with calculated fields

## Goal

In this tutorial we will learn how to work with calculated fields. The [GAD-7](https://loinc.org/69737-5/) form is taken as an example, because it contains [the "Generalized anxiety disorder 7 item total score" field](https://loinc.org/70274-6/), which can be declared as a sum of seven scored anwers.

## Prerequisites

To accomplish the goal we assume the SDC Forms project is already configured as described in ["Getting Started"](https://docs.aidbox.app/modules-1/aidbox-forms/getting-started).

Next we need an example namespace to put the form we are about to create into. Let's create a file `zrc/tutorial/gad-7.edn` and declare the desired namespace:

```clojure
{ns tutorial.gad-7}
```

Make sure the created Zen file is imported in the project so Zen can (re-) load it. Available forms can be imported via an aggregation file (e.g. `/zrc/forms.edn`) or directly via the entrypoint file `/zrc/sdc-box.edn` like this:

```clojure
{ns sdc-box
 import #{,,, tutorial.gad-7 ,,,}

 ,,,
}
```

> Zen translates namespaces to paths on the filesystem. Ensure the file path corresponds to the namespace it contains. It should be relative to Zen source directory `zrc`.

## TL;DR

Let's summarize steps required to create a calculated form field.

-   Declare a rule under `:sdc/rules` in the document layer using lisp expression
-   Define a form field using the same name as the rule
-   Set field `:sdc-type` attribute to `aidbox.sdc/calculated`

## Form layer

In this step we declare a basic form containing only references to the required `Document` and `Launch` Zen schema definitions.

For sake of simplicity all definitions will be put into a single file. But it is also possible to split definitions of separate form aspects to dedicated files and to import them in a single EDN file.

Add following lines to `/zrc/tutorial/gad-7.edn` file:

```clojure
GAD7Form
{:zen/tags #{aidbox.sdc/Form}
 :title    "GAD-7"
 :version  "1.0.0"
 :document GAD7Document
 :launch GAD7Launch}
```

We just declared some form metadata like `:title` and `:version`. We also added a reference to `GAD7Document`, which describes the schema of the form model. Let's skip `:launch` for now and focus on the subject of this tutorial. The example Launch definition can be found in Appendix for completeness.

## Prepare Document with static fields

The data model of a Form is declared using the `aidbox.sdc/Document` schema and is tagged as `aidbox.sdc/doc`. This schema allows us to describe individual fields this document consists of.

In the example below we define seven fields (69725-0, 68509-9, 69733-4, 69734-2, 69735-9, 69689-8, 69736-7) as described in the [GAD-7 LOINC form](https://loinc.org/69737-5/).

To keep the example short we define common schema `LL358-3` for each answer.

```clojure
;; reusable Answer options schema
LL358-3
{:zen/tags #{zen/schema}
 :type zen/map
 :confirms #{aidbox.sdc.fhir/coding}
 :keys {:score {:type zen/integer}}
 :enum [{:value {:display "Not at all" :code "LA6568-5" :score 0 :system "http://loinc.org"}}
        {:value {:display "Several days" :code "LA6569-3" :score 1 :system "http://loinc.org"}}
        {:value {:display "More than half the days" :code "LA6570-1" :score 2 :system "http://loinc.org"}}
        {:value {:display "Nearly every day" :code "LA6571-9" :score 3 :system "http://loinc.org"}}]}

;; Document schema definition
GAD7Document
{:zen/tags #{zen/schema aidbox.sdc/doc}
 :zen/desc "GAD-7"
 :type zen/map
 :confirms #{aidbox.sdc/Document}
 :keys {:69725-0 {:confirms #{LL358-3}
                  :sdc-type aidbox.sdc/choice
                  :zen/desc "Feeling nervous, anxious, or on edge"}
        :68509-9 {:confirms #{LL358-3}
                  :sdc-type aidbox.sdc/choice
                  :zen/desc "Not being able to stop or control worrying"}
        :69733-4 {:confirms #{LL358-3}
                  :sdc-type aidbox.sdc/choice
                  :zen/desc "Worrying too much about different things"}
        :69734-2 {:confirms #{LL358-3}
                  :sdc-type aidbox.sdc/choice
                  :zen/desc "Trouble relaxing"}
        :69735-9 {:confirms #{LL358-3}
                  :sdc-type aidbox.sdc/choice
                  :zen/desc "Being so restless that it is hard to sit still"}
        :69689-8 {:confirms #{LL358-3}
                  :sdc-type aidbox.sdc/choice
                  :zen/desc "Becoming easily annoyed or irritable"}
        :69736-7 {:confirms #{LL358-3}
                  :sdc-type aidbox.sdc/choice
                  :zen/desc "Feeling afraid, as if something awful might happen"}}}
```

## Declare calculated field

After the basic Document structure is set up we are ready to define a so called "calculated" form field.

Calculation rules are declared under the `:sdc/rules` key.

To calculate the actual GAD7 score we need to sum up all scores from the user input. Let's implement the formula for the rule `:70274-6` using the Lisp `+` expression. With `get-in` we grab the selected score for each answer.

```clojure
GAD7Document
{:zen/tags #{zen/schema aidbox.sdc/doc}

 ;; declare a named rule using expressions
 :sdc/rules {:70274-6 (lisp/+
                       (lisp/get-in [:69725-0 :score])
                       (lisp/get-in [:68509-9 :score])
                       (lisp/get-in [:69733-4 :score])
                       (lisp/get-in [:69734-2 :score])
                       (lisp/get-in [:69735-9 :score])
                       (lisp/get-in [:69689-8 :score])
                       (lisp/get-in [:69736-7 :score]))}
 :keys {:69725-0 {,,,} ;; omitted
        :68509-9 {,,,} ;; omitted
        :69733-4 {,,,} ;; omitted
        :69734-2 {,,,} ;; omitted
        :69735-9 {,,,} ;; omitted
        :69689-8 {,,,} ;; omitted
        :69736-7 {,,,} ;; omitted

        ;; declare a calculated field
        :70274-6 {:type zen/number
                  :sdc-type aidbox.sdc/calculated ;; <-- this is important
                  :zen/desc "GAD-7 Anxiety Severity Score"}}}
```

Finally we declare an additional form field with `:sdc-type` set to `aidbox.sdc/calculated` using the previously defined rule name `:70274-6`. The form field is linked to the corresponding rule via it's name. Calculated form fields will also be stored in the database.

## Review the result

The final form can be reviewed in Aidbox. At `<aidbox-url>/ui/zen-ui` you can review and inspect available Zen schemas including the previously created ones. Any validation errors will be displayed here.

With the Aidbox Forms Editor you can inspect all Form layers at `<aidbox-url>/ui/sdc#/forms/edit?form=tutorial.gad-7%2FGAD7Form`. In this tutorial we skipped the visual representation of a form, which is described in the `Layout` layer, but in real world you surely will render your form. This will be covered in an another tutorial.

## Appendix

### Launch

```clojure
GAD7Launch
{:zen/tags #{aidbox.sdc/Launch}
 :document GAD7Document
 :populate-engine aidbox.sdc/LispPopulate
 :populate {:author (lisp/get-in [:ctx :user])}}

```
