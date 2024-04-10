import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserListItem = ({ props }) => {
  const auth = useContext(Context);
  const registerHandler = async (e) => {
    try {
      const res = await axios.delete(`/api/user/delete/${e}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      toast.info(`пользователь удален`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      let message = error.message;
      toast.error(`${message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  const reassignHandler = async (e) => {
    try {
      const res = await axios.delete(`/api/user/update/${e}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      toast.info(`пользователь обновлен`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      let message = error.message;
      toast.error(`${message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  if (auth.userEmail == "admin@gmail.com") {
    return (
      <>     

        {["admin@gmail.com", "operator1@gmail.com", "operator2@gmail.com", "operator3@gmail.com", "operator4@gmail.com", "operator5@gmail.com"].includes(props.email) ? "" : (
          <tr>
            <th scope="row">{props.id}</th>
            <td>{props.username}</td>
            <td>{props.email}</td>
            {props.role === "user" ? <td>Пользователь  <button onClick={() => { reassignHandler(props._id) }} className='btn-sm btn btn-success' style={{ marginRight: "1rem" }} > reassign </button></td> : <td>Редактор <button onClick={() => { reassignHandler(props._id) }} className='btn-sm btn btn-warning' style={{ marginRight: "1rem" }} > reassign </button>
            </td>}
            <td>
              <button onClick={() => { registerHandler(props._id) }} className='btn-sm btn btn-danger' style={{ marginRight: "1rem" }} > удалить </button><Link to={`/User_viewer/?${props._id}`} className="btn-sm btn btn-info">посмотреть</Link></td>
          </tr >
        )}
      </>
    )
  }
  return (
    <>{["admin@gmail.com", "operator1@gmail.com", "operator2@gmail.com", "operator3@gmail.com", "operator4@gmail.com", "operator5@gmail.com"].includes(props.email) ? "" : (
      <tr>
        <th scope="row">{props.id}</th>
        <td>{props.username}</td>
        <td>{props.email}</td>
        <td><Link to={`/User_viewer/?${props._id}`} className="btn-sm btn btn-info">посмотреть</Link></td>
      </tr>
    )}


    </>
  )
}

export default UserListItem;