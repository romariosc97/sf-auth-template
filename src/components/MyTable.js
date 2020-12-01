import React, {Fragment, useState} from 'react';
import axios from 'axios';
import { Notification } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import MyPagination from './MyPagination';

export default function MyTable(props) {
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const deleteRecord = (objectId) => {
    const myAxios = axios.create({
      withCredentials: true,
    });
    Swal.queue([{
      title: 'Are you sure?',
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Confirm',
      text:"You won't be able to revert this!",
      showLoaderOnConfirm: true,
      showCancelButton: true,
      icon: 'warning',
      preConfirm: () => {
          return myAxios.delete(`http://localhost:8080/api/${props.object}/delete/${objectId}`, {objectId:objectId})
          .then(data => {
            let data_tmp = [];
            props.setData(data_tmp => data_tmp.filter((v, i) => v.Id !== objectId));
            setNotificationStatus(true);
            setNotificationText('Deleted successfully!');
            setTimeout(
              () =>{
                setNotificationStatus(false);
                //setNotificationText('');
              }, 
              3000
            );
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
      {<Notification className={"notification-fixed is-light"+(notificationStatus===true ? " active" : '')} color="success"><b>{notificationText}</b></Notification>}
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
                    <a href={"./edit-"+props.object+"/"+v.Id} className='button is-primary'><FontAwesomeIcon icon={faEdit} /></a>
                    <button onClick={() => deleteRecord(v.Id)} className='button is-danger'><FontAwesomeIcon icon={faTrash} /></button>
                  </td>
                </tr>
              );
            }) : <tr><td className='has-text-centered' colSpan={props.fields.length+1}><div className='icon has-text-info my-spinner-c'><span className="my-spinner"></span></div></td></tr>}
          </tbody>
        </table>
      </div>
      <div className="columns">
        <MyPagination></MyPagination>
      </div>
    </Fragment>
  )
}
