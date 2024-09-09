import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import "../News/News.css"

export default function News() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        setLoading(true);
        getTrendingNews();
    }, []);

    async function getTrendingNews() {
        const options = {
            method: 'GET',
            url: 'https://google-news22.p.rapidapi.com/v1/topic-headlines',
            params: {
              country: 'in',
              language: 'en',
              topic: 'health'
            },
            headers: {
              'x-rapidapi-key': '320f7ae65dmsh19b108a0f306364p1cebf3jsn4805c8d23c92',
              'x-rapidapi-host': 'google-news22.p.rapidapi.com'
            }
          };

        try {
            const response = await axios.request(options);
            console.log(response.data.data);
            setData(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); 
        }
    }

    return (
        <>
            <div className='News'>

                {loading === true ? (
                    <Spinner />
                ) : (
                    <div className='container'>
                        <div className='row'>
                            {data.map(function (element) {
                                return (
                                    <div key={element.url} className='col-md-4 d-flex justify-content-center my-3'>
                                        <div className='card' style={{ width: '18rem' }}>
                                            <img
                                                src={element.thumbnail? element.thumbnail : 'https://media.istockphoto.com/id/1182477852/photo/breaking-news-world-news-with-map-backgorund.jpg?s=612x612&w=0&k=20&c=SQfmzF39HZJ_AqFGosVGKT9iGOdtS7ddhfj0EUl0Tkc='}
                                                className='card-img-top img-fluid'
                                                alt='...'
                                                style={{ width: 287, height: 163 }}
                                            />
                                            <div className='card-body'>
                                                <h5 className='card-title'>{element.title}</h5>
                                                <p className='card-text'>{element.description}</p>
                                                <a href={element.url} target='_blank' rel='noopener noreferrer' className='btn btn-primary'>
                                                    Read more
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

            </div>

        </>
    );
}
