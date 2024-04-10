import React from 'react';
import { Link } from 'react-router-dom';
const NewsList = ({ props }) => {
    return (
        <>
            {Array.isArray(props) && props.map((news, index) => (

                <div className="d-flex p-4" key={index}>
                    <div>
                        <img
                            className="card-img-top rounded-lg news_img"
                            src={`${window.location.protocol}//${window.location.host}/uploads/news/${news?.image_src}`}
                            alt="..."
                        />
                    </div>
                    <div className="card-body">
                        <h3>{news.title}</h3>
                        <p className="card-text">{news.description}</p>
                        <Link to={`/News/?${news._id}`} className="btn-sm btn btn-info">посмотреть</Link>
                    </div>
                </div>
            ))}
        </>
    );
};

export default NewsList;