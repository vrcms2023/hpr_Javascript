import React from 'react'
import Button from '../../Common/Button'

const Gallery = () => {
  return (
    <div className='py-5 mt-5'>
        <div className='text-center pb-4 mt-4'>
            <Button type="" cssClass="btn btn-lg btn-primary" label="All"/>
            <Button type="" cssClass="btn btn-lg btn-primary mx-2" label="Working Projects"/>
            <Button type="" cssClass="btn btn-lg btn-primary me-2" label="Future Projects"/>
            <Button type="" cssClass="btn btn-lg btn-primary" label="Completed Projects"/>
        </div>
        <div>
            <ul className='list-unstyled gallery d-flex justify-content-center align-items-center flex-wrap'>
                <li>
                    <img alt=""src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60" />
                </li>
                <li>
                    <img alt=""src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60" />
                </li>
                <li>
                    <img alt=""src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60" />
                </li>
                <li>
                    <img alt=""src="https://images.unsplash.com/photo-1560184897-ae75f418493e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60" />
                </li>
                <li>
                    <img alt=""src="https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60" />
                </li>
                <li>
                    <img alt=""src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60" />
                </li>
                <li>
                    <img alt=""src="https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60" />
                </li>
                <li>
                    <img alt=""src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60" />
                </li>
                <li>
                    <img alt=""src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60" />
                </li>
                <li>
                    <img alt=""src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60" />
                </li>
                <li>
                    <img alt=""src="https://images.unsplash.com/photo-1560184897-ae75f418493e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60" />
                </li>
                <li>
                    <img alt=""src="https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60" />
                </li>
                <li>
                    <img alt=""src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60" />
                </li>
                <li>
                    <img alt=""src="https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60" />
                </li>
                <li>
                    <img alt=""src="https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60" />
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Gallery