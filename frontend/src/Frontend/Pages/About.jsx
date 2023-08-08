import React from 'react'
import Title from '../../Common/Title'

import Img1 from '../../Images/project1.png'
import Img2 from '../../Images/future.png'
import Img3 from '../../Images/quality.png'

import './About.css'

const About = () => {
  return (
    <>
      <div className='row p-0 pt-5'>
        <div className='col-md-12 aboutBanner'></div>
      </div>
      <div className='row py-3 introGrayBg'>
        <div className='col-md-8 offset-md-2 py-4'>
        <Title title="Welcome To HPR Infra" cssClass="mb-2 fw-normal fs-2 text-center green-700" />
        <Title title="To excel in delivery of work!" cssClass="text-dark text-center fs-5"/>
        <p className='text-center lh-md'>We believe that construction is a man made wonder. The thought of bringing imagination to real life structures excites us, each day the passion in us grows as we contribute to this industry.</p>
        </div>
      </div>
      <div className='container my-5 py-4'>
        <div className='row shadow-lg'>
          <div className="col-12 col-md-8  py-4 p-md-5">
            <img src={Img1} alt="" className='d-md-none w-100 mb-3 shadow-md rounded-2' />
            <Title title="About HPR Infra" cssClass="text-dark fs-4"/>
              <p className=''>HPR has ventured in the real estate world with a humble beginning in the year 2004,  with Director  D. Hari Srinivas who has vision and has successfully completed several projects in Hyderabad. Riding on the growth wave of real-estate, the group has diversified strategically into the development of land.</p>
              <p>Adibhatla, a village in R.R.District, Telangana is most talked about prominent place for investmentsin plots and lands for future appreciation.</p>
              <p>The village is adjacent to ORR in between Nagarjuna Sagar Highway and Sri Salilam Highway.</p>
          </div>
          <div className="col-12 col-md-4 d-none d-md-block p-0 ">
            <img src={Img1} alt="" className='w-100 h-100' style={{objectFit: "cover", backgroundPosition: "center"}}/>
          </div>
        </div>

        <div className='row shadow-lg my-5'>
            <div className="col-12 col-md-4 d-none d-md-block p-0 " >
                <img src={Img2} alt="" className='w-100 h-100' style={{objectFit: "cover", backgroundPosition: "center"}}/>
              </div>
              <div className="col-md-8  py-4 p-md-5">
              <img src={Img2} alt="" className='d-md-none w-100 mb-3 shadow-md rounded-2' />
              <Title title="Our Vision" cssClass="text-dark fs-4"/>
              <p>Abibaltla had become prominent because of IT SEZ & Aero Space SEZ. TCS, CTS, and small other companies had been allotted land in IT SEZ. TCS, which is about to complete the construction is expected to generate an employment of 27,000 employees in Adibatla Campus.</p>
                <p>Tata Advanced Systems, a group company of Tata’s started their manufacturing facility for Helicopter units, wings manufacturing in collaboration with LOCKHEED MARTIN and SIKORSKY AIRCRAFT CORPORATION in the Aerospace SEZ, Adibatla.</p>
                <p>SAMUHA Engineering a cluster of small manufacturing ancillary units had started theri operation in Aerospace SEZ. Samuha Engineering is expected to generate an employment of 10,000 employees.</p>
              </div>
          </div>

          <div className='row shadow-lg '>
          <div className="col-12 col-md-8 py-4 p-md-5">
          <img src={Img3} alt="" className='d-md-none w-100 mb-3 shadow-md rounded-2' />
          <Title title="Our Culture " cssClass="text-dark fs-4"/>
          <p>In addition to the above companies at Adibhatla, there is developed land available in Fab City on Srisailam Highway, Thukkuguda. Celkon, a mobile company had expressed their willingness to start their manufacturing operation at Fab City. Telangan Govt. Is in talks with Various mobile manufacturing companies to set up their establishments in Fab city.</p>
            <p>Airport at Shamshabad is hardly 15 minutes drive from Thukkuguda.</p>
            <p>Hardware Park, near Thukkuguda is already holding so many companies creating an employment of 3000.</p>
          </div>
          <div className="col-12 col-md-4 d-none d-md-block p-0">
            <img src={Img3} alt="" className='w-100  h-100' style={{objectFit: "cover", backgroundPosition: "center"}} />
          </div>
        </div>
          
        
    </div>
    </>
  )
}

export default About