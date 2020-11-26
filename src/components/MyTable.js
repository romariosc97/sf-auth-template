import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

export default function MyTable(props) {
  const deleteRecord = (accountId) => {
    const accountAxios = axios.create({
      withCredentials: true,
    });
    Swal.queue([{
      title: 'Are you sure?',
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Confirmar',
      text:"You won't be able to revert this!",
      showLoaderOnConfirm: true,
      showCancelButton: true,
      icon: 'warning',
      preConfirm: () => {
          return accountAxios.delete(`http://localhost:8080/api/account/delete/${accountId}`, {accountId:accountId})
          .then(data => {
            let accounts_tmp = [];
            props.setAccounts(accounts_tmp => accounts_tmp.filter((v, i) => v.Id !== accountId));
          })
          .catch((err) => {
              Swal.insertQueueStep({
                icon: 'error',
                title: err
              })
          })
      }
    }])
  };
  return (
    <Fragment>
      <div className="table-container">
        <table className="table is-bordered is-fullwidth">
          <thead>
            <tr>
              {props.fields.map((v,i) => {
                return <th key={i}>{v}</th>;
              })}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { props.data.length>0 ? props.data.map((v,i) => {
              return (
                <tr key={i}>
                  {
                    props.fields.map((row, iA) => {
                      return <td key={iA}>{v[row]}</td>;
                    })
                  }
                  <td className='table-actions'>
                    <button className='button is-primary'><FontAwesomeIcon icon={faEdit} /></button>
                    <button onClick={() => deleteRecord(v.Id)} className='button is-danger'><FontAwesomeIcon icon={faTrash} /></button>
                  </td>
                </tr>
              );
            }) : <tr><td className='has-text-centered' colSpan={props.fields.length+1}><div className='icon has-text-info my-spinner-c'><span className="my-spinner"></span></div></td></tr>}
          </tbody>
        </table>
      </div>
    </Fragment>
  )
}
