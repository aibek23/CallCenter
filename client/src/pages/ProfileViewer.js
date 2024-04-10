import React, { useState, useEffect, useCallback, useContext } from "react";
import Platzhalter from "../img/Platzhalter-1.jpg";
import { toast, ToastContainer } from "react-toastify";
import { Context } from '../context/Context';
import { useHttp } from "../hooks/http.hook";
import "react-toastify/dist/ReactToastify.css";
import HtmlViewer from "../components/HtmlViewer"
import axios from "axios";
import { useLocation } from 'react-router-dom';
 const ProfileViewer =()=>{
    const location = useLocation();
    const [data, setData] = useState([]);
    const [dataUserlink, setDataUserLink] = useState([]);
    const cardId = location.search.substring(1)
    const auth = useContext(Context)
    const [addBtn, setAddBtn] = useState(false);
    const { loading, request, error, clearError } = useHttp();
    const fetchData = useCallback(async () => {
      try {
        const res = await axios.get(`/api/upload/showid/${cardId}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setData(res.data);
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
    }, []);

    const registerHandler = async () => {
      try {
        const res = await axios.get(`/api/user/showid/${cardId}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setDataUserLink(res.data);
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
  
    useEffect(() => {
      registerHandler()
    }, []);
    useEffect(() => {
      error &&
        toast.error(`${error}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      clearError();
    }, [error, clearError]);
  
    const logoutHandler = () => {
      localStorage.removeItem("localST");
      window.location.reload();
    };
  
    useEffect(() => {
      fetchData()
    }, []);
  
    const handleImageError = (e) => {
      e.target.src = Platzhalter;
    };
  
    return (
      <div className="row mt-5">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="col-md-4">
          <div className="mt-4 d-flex justify-content-center">
            <div className="rounded-circle">
              <img
                style={{
                  height: "200px",
                  width: "250px",
                  borderRadius: "10px",
                }}
                src={`${window.location.protocol}//${window.location.host}/uploads/profile/${data?.imageSrc}`}
                className="rounded-circle"
                alt="Vacancy Thumbnail"
                onError={handleImageError}
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-center">
              <span>{dataUserlink.username}</span>
            </div>
          </div>
          
        </div>
        <div className="col-md-8">
     
          <div className="mb-5">
           <HtmlViewer htmlContent={data?.description} />
          </div>
       
      </div>
      </div>
    );
}

export default ProfileViewer;