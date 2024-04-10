import React, { useState, useEffect, useContext, useHistory, lazy, Suspense } from "react";
import { Context } from '../context/Context';
import { toast, ToastContainer } from "react-toastify";
import Platzhalter from "../img/Platzhalter-1.jpg";
import "react-toastify/dist/ReactToastify.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import AddProfile from "../components/AddProfile";
import AddNews from "../components/AddNews";
import axios from "axios";
import HtmlViewer from "../components/HtmlViewer"
import "react-toastify/dist/ReactToastify.css";
import NewsList from '../components/NewsList'
const Profile = () => {
  const [cardId, setCardId] = useState("");
  const [data, setData] = useState([]);
  const [dataEd, setDataEd] = useState("user");
  const [newsData, setNewsData] = useState([]);
  const [addBtn, setAddBtn] = useState(false);
  const [addBtnNews, setAddBtnNews] = useState(false);
  const dataUser = JSON.parse(localStorage.getItem('userData'));
  const auth = useContext(Context);
  const { token, userId } = auth;
  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/upload/showid/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res2 = await axios.get(`/api/user/showid/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDataEd(res2.data.role);
      setData(res.data);

    } catch (error) {
      let message = error.message || "Error fetching data.";
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
  };

  useEffect(() => {
    fetchData();
  }, [])
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`/api/news/showid/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNewsData(response.data);
      } catch (error) {
        console.error('Ошибка при получении новостей:', error);
      }
    };

    fetchNews();
  }, []);
  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
  }

  const handleImageError = (e) => {
    e.target.src = Platzhalter;
  };
  console.log(newsData);
  return (
    <div className="container">
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
            <div className="rounded-lg">
              <img
                style={{
                  height: "200px",
                  width: "250px",
                  borderRadius: "10px",
                }}
                src={`${window.location.protocol}//${window.location.host}/uploads/profile/${data?.image_src}`}
                className="rounded-lg"
                alt="Vacancy Thumbnail"
                onError={handleImageError}
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-center">
              <span>{dataUser.username}</span>
            </div>
          </div>
          <div className="btn red">
            <a href="/" onClick={(e) => logoutHandler(e)}>
              Выйти
            </a>
          </div>
        </div>
        <div className="col-md-8">
          {addBtn ? (<>
            <a className="" onClick={() => setAddBtn(!addBtn)}><IoMdCloseCircle style={{ fontSize: "3rem" }} color="red"></IoMdCloseCircle></a>
            <AddProfile path="/api/upload" _id={dataUser.userId} update={fetchData} setId={setCardId} /></>
          ) : (
            <div>
              <h5>
                О себе
              </h5>
              <HtmlViewer htmlContent={data?.description} />
              {/* <p>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;{data?.description}</p> */}
              <p className="text-center mt-5">
                <a
                  onClick={() => setAddBtn(!addBtn)}
                  style={{ height: "50px", width: "50px", border: "none", padding: "0", }}
                >
                  <IoIosAddCircleOutline style={{ fontSize: "3rem" }} />
                </a>{" "}
              </p>
            </div>

          )}

          {addBtnNews ? (<div className=" border  rounded-lg bg-light p-3">
            <a className="" onClick={() => setAddBtnNews(!addBtnNews)}><IoMdCloseCircle style={{ fontSize: "3rem" }} color="red"></IoMdCloseCircle></a>
            <AddNews path="/api/upload" _id={dataUser.userId} update={fetchData} setId={setCardId} /></div>
          ) : (
            <div>     <div className="container pt-5">

              {/* Отображаем результаты поиска или все данные */}

              {<NewsList props={newsData} />}
            </div>
            {dataEd=="user"?"":<p className="text-center"> <button
                onClick={() => { setAddBtnNews(!addBtnNews) }}

              >
                Создать новости
              </button> </p>}

            </div>

          )}
        </div>

      </div>
    </div>
  );
};



export default Profile
