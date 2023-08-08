import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Title from '../../Common/Title'
import Model from '../../Common/Model'

import NewsImg1 from '../../Images/future.png'  
import ModelBg from '../../Common/ModelBg'

import './NewsAndUpdates.css'

const NewsAndUpdates = () => {

    const [showModal, setShowModal] = useState(false)
    const [news, setNews] = useState([
        {id: 1, img: "NewsImg1", title: "News Title One", description:"HPR Infra Projects has instantly made a distinctive mark on the cityscape of Hyderabad: the city in which the group is headquartered, as it understands the city with an instinctive ease sharing with it a glorious past and a promising future. Abibaltla had become prominent because of IT SEZ & Aero Space SEZ. TCS, CTS, and small other companies had been allotted land in IT SEZ. TCS, which is about to complete the construction is expected to generate an employment of 27,000 employees in Adibatla Campus. Tata Advanced Systems, a group company of Tata’s started their manufacturing facility for Helicopter units, wings manufacturing in collaboration with LOCKHEED MARTIN and SIKORSKY AIRCRAFT CORPORATION in the Aerospace SEZ, Adibatla." },
        {id: 2, img: "NewsImg2", title: "News Title Two", description:"HPR has ventured in the real estate world with a humble beginning in the year 2004, with Director D. Hari Srinivas who has vision and has successfully completed several projects in Hyderabad. Riding on the growth wave of real-estate, the group has diversified strategically into the development of land." },
        {id: 3, img: "NewsImg3", title: "News Title Three", description:"Abibaltla had become prominent because of IT SEZ & Aero Space SEZ. TCS, CTS, and small other companies had been allotted land in IT SEZ. TCS, which is about to complete the construction is expected to generate an employment of 27,000 employees in Adibatla Campus." },
        {id: 4, img: "NewsImg1", title: "News Title Four", description:"Tata Advanced Systems, a group company of Tata’s started their manufacturing facility for Helicopter units, wings manufacturing in collaboration with LOCKHEED MARTIN and SIKORSKY AIRCRAFT CORPORATION in the Aerospace SEZ, Adibatla." },
        {id: 5, img: "NewsImg2", title: "News Title Five", description:"Tata Advanced Systems, a group company of Tata’s started their manufacturing facility for Helicopter units" },
        {id: 6, img: "NewsImg3", title: "News Title Six", description:"In addition to the above companies at Adibhatla, there is developed land available in Fab City on Srisailam Highway, Thukkuguda. Celkon, a mobile company had expressed their willingness to start their manufacturing operation at Fab City. Telangan Govt. Is in talks with Various mobile manufacturing companies to set up their establishments in Fab city." },
        {id: 7, img: "NewsImg1", title: "News Title Seven", description:"Hardware Park, near Thukkuguda is already holding so many companies creating an employment of 3000. The ITIR project announced by the Central Govt. is expected to further fuel the growth in this area. News related to this project can be viewed in the links provided below." },
        {id: 8, img: "NewsImg2", title: "News Title Eight", description:"The ITIR project announced by the Central Govt. is expected to further fuel the growth in this area. " },
        {id: 9, img: "NewsImg3", title: "News Title Nine", description:"News related to this project can be viewed in the links provided below. The ITIR project announced by the Central Govt. is expected to further fuel the growth in this area. News related to this project can be viewed in the links provided below." },
    ])
    const [obj, setObj] = useState({})

    const articleHandler = (id) => {
        const searchObj= news.find((newsItem) => newsItem.id === id);
        console.log(searchObj)
        setObj(searchObj)
        setShowModal(!showModal)
    }

    const closeModel = () => {
        setShowModal(!showModal)
    }

  return (
    <>
    <div className='row pt-5'>
        <div className='col-md-12 banner'></div>
    </div>
    <div className='container my-4 newsAndUpdates'>
        <div className='row'>
            <Title title="News And Updates" cssClass="blue-900 fs-4 mb-4" />
            {news.length > 0 && 
            news.map(item => (
                <div className='col-md-4 border border-5 border-white p-4 bg-light shadow-lg' key={item.id}>
                <img src={NewsImg1} alt="" className='w-100' height="100" style={{objectFit:"cover"}}/>
                <Title title={item.title} cssClass="text-dark fs-6 mt-3 fw-bold" />
                <p className="card-text mb-4">{item.description}</p>
                <Link to="" onClick={() => articleHandler(item.id)}className='loadMore'>Read more 
                <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg" className='ms-2'>   
                <path d="M14.3536 4.35355C14.5488 4.15829 14.5488 3.84171 14.3536 3.64645L11.1716 0.464466C10.9763 0.269204 10.6597 0.269204 10.4645 0.464466C10.2692 0.659728 10.2692 0.976311 10.4645 1.17157L13.2929 4L10.4645 6.82843C10.2692 7.02369 10.2692 7.34027 10.4645 7.53553C10.6597 7.7308 10.9763 7.7308 11.1716 7.53553L14.3536 4.35355ZM0 4.5H14V3.5H0V4.5Z"/>
                </svg>
                </Link>
            </div>
            ))
            
             }
        </div>
    </div>
    {showModal && <Model obj={obj} closeModel={closeModel}/>}
    {showModal && <ModelBg closeModel={closeModel}/> }
    </>
  )
}

export default NewsAndUpdates