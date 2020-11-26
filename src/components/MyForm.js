import React, {Fragment} from 'react';
import { Button, Form } from 'react-bulma-components';
const { Input, Field, Control, Label, Help } = Form;

export default function MyForm(props) {
    const createRecord = (e) => {
        e.preventDefault();
        props.onSubmitFunction();
    };
    return (
        <Fragment>
            <form onSubmit={(e) => {createRecord(e)}}>
                <div className="columns is-multiline">
                    {props.fields.map((v,i) => {
                        return (
                            <div className={"column is-"+props.fieldProperties[v]['size']} key={i}>
                                <Field>
                                    <Control>
                                        <Label>{v}</Label>
                                        <Input disabled={props.loadingScreen} required value={props.value[v]} name={v} onChange={(e) => {
                                            props.updateInput(e);
                                        }} />
                                        <Help color="danger"></Help>
                                    </Control>
                                </Field>   
                            </div>  
                        );
                    })}
                </div>
                <div className="columns">
                    <div className="column is-12">
                        <Button.Group className="is-centered">
                            <Button type="submit" loading={props.submitBtnStatus} disabled={props.submitBtnStatus} color="primary">SEND</Button>
                        </Button.Group>
                    </div>
                </div>
            </form>
        </Fragment>
    )
}
