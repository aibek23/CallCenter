import React, { useCallback, useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import axios from "axios";
import { Loader } from '../components/Loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewsList from '../components/NewsList';
import { Context } from '../context/Context';
const NewsPage = () => {
    const auth  = useContext(Context);
    const [data, setData] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    // Получение данных с сервера при монтировании компонента
    const fetchData = async () => {
        try {
            const res = await axios.get('/api/news/all', {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            setData(res.data);
            setFilteredResults(res.data); // Устанавливаем исходные данные как отфильтрованные
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    // Обработчик изменения входных данных поиска
    const handleSearchInput = (searchValue) => {
        setSearchInput(searchValue);
        if (searchValue !== '') {
            const filteredData = data.filter((item) =>
                Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(data); // Если ввод пустой, показываем все данные
        }
    };

    // Если данные загружаются, показываем Loader
    // if (!data.length) {
    //     return <Loader />;
    // }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="container pt-5">
                <div className="input-group rounded mb-5">
                    <input
                        type="search"
                        className="form-control"
                        onChange={(e) => handleSearchInput(e.target.value)}
                        style={{
                            border: 'solid 5px #DEE2E6',
                            borderRadius: '1rem 0 0 1rem',
                        }}
                        placeholder="Search"
                    />
                    <span
                        className="input-group-text border"
                        style={{
                            border: 'solid 10px #DEE2E6',
                            borderRadius: '0 1rem 1rem 0',
                        }}
                        id="search-addon"
                    >
                        <i className="fas fa-search"></i>
                    </span>
                </div>
                {/* Отображаем результаты поиска или все данные */}
               
                {data.length > 0 ? searchInput.length > 1 ? filteredResults.map((links) => <NewsList props={links} />) : <NewsList props={data} /> : (<Loader/>)}
            </div>
        </>
    );
};

export default NewsPage;