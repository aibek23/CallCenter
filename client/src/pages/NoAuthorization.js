import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

const NoAuthorization = () => {
    return (
        <div className="Home_Page">
            <div className="blur d-flex flex-column justify-content-center align-content-center ">

                    <div className="container alert alert-warning text-danger">
                        <h1>Нет авторизации</h1>
                        <p>У вас нет прав доступа к этой странице.  <Link class="btn btn-primary btn-sm active" to={'/AuthPage'} aria-pressed="true">Зарегистрироваться</Link></p>
                    </div>

            </div>
        </div>
    );
};

export default NoAuthorization;