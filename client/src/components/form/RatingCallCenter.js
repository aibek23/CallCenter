import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./ratingCallCenter.css";

const RatingCallCenter = () => {
  const auth = useContext(Context);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [data, setData] = useState(true);
  useEffect(() => {
    axios
      .get(`/api/rating/latest`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/rating/save`,
        { rating, feedback, userEmail: auth.userEmail },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      toast.info(`отзыв сохранен`, {
        position: "top-right",
        autoClose: 2000,
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
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2000);
    }
  };

  return data ? (
    ""
  ) : (
    <div className="rating_container">
      <div className="container d-flex justify-content-center mt-5">
        <div className=" text-center">
          <div className="bg-success text-white rounded">
            <h6 className="mb-0 pt-5 P-3">
              Насколько понятным и доступным был общий уровень коммуникации с
              переводчиком?
            </h6>
            <div className="rating">
              <input
                type="radio"
                name="rating"
                value="5"
                id="5"
                checked={rating === 5}
                onChange={handleRatingChange}
              />
              <label htmlFor="5">☆</label>
              <input
                type="radio"
                name="rating"
                value="4"
                id="4"
                checked={rating === 4}
                onChange={handleRatingChange}
              />
              <label htmlFor="4">☆</label>
              <input
                type="radio"
                name="rating"
                value="3"
                id="3"
                checked={rating === 3}
                onChange={handleRatingChange}
              />
              <label htmlFor="3">☆</label>
              <input
                type="radio"
                name="rating"
                value="2"
                id="2"
                checked={rating === 2}
                onChange={handleRatingChange}
              />
              <label htmlFor="2">☆</label>
              <input
                type="radio"
                name="rating"
                value="1"
                id="1"
                checked={rating === 1}
                onChange={handleRatingChange}
              />
              <label htmlFor="1">☆</label>
            </div>
            <div className="p-3">
              <input
                type="text"
                className="form-control"
                placeholder="Пожалуйста напишите отзыв здесь"
                value={feedback}
                onChange={handleFeedbackChange}
              />
            </div>
            <div className="buttons px-4 mt-0">
              <button
                className="btn btn-block rating-submit"
                style={{backgroundColor: "rgb(47 11 69 / 87%)"}}
                onClick={handleSubmit}
              >
                Отправить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingCallCenter;
