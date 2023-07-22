import React from 'react'
import Banner from '../Components/Banner'
import Title from '../../Common/Title'
import { Link  } from 'react-router-dom'

const Home = () => {
  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-12'>
                <Banner />
            </div>
        </div>
        <div className='row text-white py-5'>
            <div className='col-md-10 offset-md-1 py-5'>
            <Title title="HPR Infra" cssClass="mb-4 fw-normal fs-1 text-center" />
            <Title title="To excel in delivery of work!" cssClass="mb-4 fw-normal fs-2 text-center text-secondary" />
            <p className='text-center text-secondary lh-md fs-5'>HPR Infra Projects has instantly made a distinctive mark on the cityscape of Hyderabad: the city in which the group is headquartered, as it understands the city with an instinctive ease sharing with it a glorious past and a promising future.</p>
            <p className='text-center text-secondary lh-lg fs-5'>
HPR has ventured in the real estate world with a humble beginning in the year 2004, with Director D. Hari Srinivas who has vision and has successfully completed several projects in Hyderabad. Riding on the growth wave of real-estate, the group has diversified strategically into the development of land.</p>
            </div>
        </div>
    <div className='row shadow-lg' style={{margin: "70px"}}>
        <div className='col-md-7' style={{background: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'"}}></div>
        <div className='col-md-5 p-5 bg-light'>
            <div className='mx-5 py-5'>
                <Title title="Let your thoughts fly high" cssClass="mb-4 fw-normal fs-2" />
                <p className='lh-lg fs-5'>
                We believe that construction is a manmade wonder. The thought of bringing imagination to real life structures excites us, each day the passion in us grows as we contribute to this industry. It gives us ample satisfaction that we are contributing to your happiness, your lifetime dream and our country’s growth/development.</p>
                <Link  to='/' className="btn btn-outline-secondary">Read More...</Link >
            </div>
        </div>
    </div>

    <div className='row bg-dark'>
        <div className='col-md-5 p-5'>
            <div className='mx-5 py-5'>
                <Title title="Our Culture" cssClass="mb-4 fw-normal fs-2 text-white" />
                <p className='text-secondary'>Compassion, Innovation, Trust</p>
                <p className='lh-lg fs-5 text-secondary'>
                    In our company, we attain to serve you as best as we can in a timely fashion and with assurance that your needs will be satisfied.From initial site studies, to design, to construction and commissioning, we stand by our clients as technical experts throughout the development cycle. We collaborate with planners, architects, consultants, program managers and construction managers to deliver high-performance buildings, infrastructure and communities.</p>
                    <Link  to='/' className="btn btn-outline-light">Read More...</Link >
            </div>
        </div>
        <div className='col-md-7' style={{background: "url('https://images.unsplash.com/photo-1556912173-3bb406ef7e77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')"}}></div>
    </div>

    <div className='row shadow-lg' style={{margin: "70px"}}>
    <div className='col-md-7' style={{background: "url('https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'"}}></div>
        <div className='col-md-5 p-5 bg-light'>
            <div className='mx-5 py-5'>
            <Title title="Ongoing Projects" />
            <p>Experience Our Difference Firsthand</p>
            <p className='lh-lg fs-5'>
                Custom homebuilding is the sure way to get exactly what your family needs. No modifications. No compromises. No settling for something less. With decades of custom homebuilding experience and a commitment to excellence and innovation in home designs, there is no better way to experience the HPR Homes difference than to explore one of our custom built model homes. Our network of fully-furnished luxury models are available to tour seven days a week.</p>
                <Link  to='/' className="btn btn-outline-secondary">Read More...</Link >
            </div>
        </div>
        </div>
    </div>
  )
}

export default Home