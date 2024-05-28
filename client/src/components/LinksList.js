import React from "react";

export const LinksList = ({ links }) => {
  return (
    <>
      {links.map((element, index) => {
        return (
          <div
            key={index}
            className="bg-light row mb-3"
            style={{ maxWidth: "35rm" }}
          >
            <div className="col-6">
              <ul className="list-group">
                <div>Дата</div>
                <li className="list-group-item text-sm">
                  {new Date(`${element.time.date}`).toLocaleDateString()}
                </li>
                <div>Звонок от</div>
                <li
                  className="list-group-item text-sm"
                  style={{ overflowY: "auto" }}
                >
                  {element.time.callFrom}
                </li>
              </ul>
            </div>
            <div className="col-6">
              <div className="d-flex flex-column align-content-end">
                <div className="d-flex flex-column">
                  <div>Длительность</div>
                  <div className="list-group-item">
                    {element.time.duration} second
                  </div>
                </div>
                <div>
                  {element.comments?.map((e) => (
                    <div key={e._id}>
                      <span> отценка : {e.Rating}</span> 
                      <p > комментарий : {e.Comments}</p> 
                    </div>
                  ))}
                </div>
                {/* <div>
                  {element.comments[0].Rating}
                </div> */}
                {/* <a className="btn btn-link text-sm mt-4" href={`http://localhost:5000/static/${element.videoName}.webm`}>Посмотреть видео</a> */}
                <a
                  className="btn btn-primary text-sm mt-4"
                  href={`${process.env.REACT_APP_API_URL}/static/${element.videoName}.webm`}
                >
                  Посмотреть видео
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
