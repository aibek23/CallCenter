import React, { useState, useEffect, useCallback, useContext } from "react";
import Platzhalter from "../img/Platzhalter-1.jpg";
import { toast, ToastContainer } from "react-toastify";
import { Context } from "../context/Context";
import axios from "axios";
import { useLocation } from "react-router-dom";
import HtmlViewer from "../components/HtmlViewer";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../components/Loader";

const NewsViewer = React.memo(
  (
    {
      /* props */
    }
  ) => {
    const location = useLocation();
    const [data, setData] = useState(null); // Изначально data = null
    const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки
    const [dataUserlink, setDataUserLink] = useState([]);
    const cardId = location.search.substring(1);
    const { token } = useContext(Context);

    const fetchData = useCallback(async () => {
      setIsLoading(true); // Устанавливаем флаг загрузки перед запросом
      try {
        const res = await axios.get(`/api/news/showid/${cardId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);

      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false); // Снимаем флаг загрузки после завершения запроса
      }
    }, [cardId, token]);

    const registerHandler = useCallback(async () => {
      try {
        const res = await axios.get(`/api/user/showid/${cardId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDataUserLink(res.data);
      } catch (error) {
        handleError(error);
      }
    }, [cardId, token]);

    const handleError = (error) => {
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
    };
    setTimeout;
    useEffect(() => {
      fetchData();
      registerHandler();
    }, [fetchData, registerHandler]);

    const handleImageError = (e) => {
      e.target.src = Platzhalter;
    };

    return (
      <div className="container">
        <div className="col-md-12">
          <div className="mb-5">
            {isLoading ? (
              <div><Loader /></div> // Отображаем индикатор загрузки
            ) : data ? (
              <>
                <HtmlViewer htmlContent={data[0].content} />
              </>
            ) : (
              "Ошибка загрузки данных" // Или другое сообщение об ошибке
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default NewsViewer;
