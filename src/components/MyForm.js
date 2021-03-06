import React, {Fragment} from 'react';
import { Button, Form } from 'react-bulma-components';
import { useHistory } from "react-router-dom";
const { Input, Select, Field, Control, Label, Help } = Form;

export default function MyForm(props) {
    const createRecord = (e) => {
        e.preventDefault();
        props.onSubmitFunction();
    };
    const history = useHistory()
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
                                        {
                                            props.fieldProperties[v]['type']=='text' ? 
                                            <Input disabled={props.loadingScreen} required value={props.value[v]} name={v} onChange={(e) => {
                                                props.updateInput(e);
                                            }} />
                                            : 
                                            <Select disabled={props.loadingScreen} required value={props.value[v]} name={v} onChange={(e) => {
                                                props.updateInput(e);
                                            }}>
                                                <option value="">Select an option</option>
                                                {props.fieldProperties[v]['values'].map((va,ia) => {
                                                    return (
                                                        <option key={ia} value={va}>{va}</option>
                                                    )
                                                })}
                                            </Select>
                                        }
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
                            <Button type="submit" loading={props.submitBtnStatus} disabled={props.submitBtnStatus} color="link">SEND</Button>
                            <Button type="button" onClick={() => history.goBack()} color="light">GO BACK</Button>
                        </Button.Group>
                    </div>
                </div>
            </form>
        </Fragment>
    )
}
