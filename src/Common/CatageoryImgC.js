import React, {useEffect} from 'react'
import Title from './Title'
import { useCookies } from "react-cookie";

const CatageoryImgC = ({title, catategoryImgs, catategoryImgState, cssClass,  project, category }) => {
  const [cookies] = useCookies(["token"]);

  /**
   * get selected Images for edit
   */
  useEffect(() => {
    const getSelectedImages = () => {
      fetch(`/getSelectedImagesById/${project?._id}/${category}`, {
        headers: { "x-access-token": cookies.token },
      })
        .then((res) => res.json())
        .then((data) => {
          catategoryImgState(data.fileData)
        })
        .catch((err) => console.log(err));
    };
    if(project?._id) {
      getSelectedImages();
    }
    
  }, []);

  const thumbDelete = (id) => {
    fetch(`/deleteImageById/${id}`, {
      method: "DELETE",
      headers: { "x-access-token": cookies.token },
    })
      .then(response => response.json())
      .then((data) => {
        if(data?.imageModel?._id) {
          catategoryImgState(values => {
            return values.filter(item => item._id !== data.imageModel._id)
          })
        }
        
      })
  }

  return (
    <div className=''>
      { catategoryImgs.length > 0 ? (     
        <>
                <Title title={title} cssClass="fs-5"/>
                <div className='d-flex justify-content-start align-items-center flex-wrap'>
                {
                  catategoryImgs.map((item) => { 
                        return item.contentType === "pdf" ? (
                        <div className='categoryContainer' key={item._id} onClick={() => thumbDelete(item._id)}>
                          <li><a target='_blank' href={`${window.location.origin}/${item.path}`}>{item.originalname}</a></li>
                        </div>
                      ) : (
                        <div className='categoryContainer' key={item._id} onClick={() => thumbDelete(item._id)}>
                            <img className={cssClass} src={`${window.location.origin}/${item.path}`} alt=" " />
                        </div>
                      )
                  })
                     
                    // : <p className='text-warning fs-4 text-center my-5'>Gallery is empty!, please add images.</p>
                }
                </div>
                </>) :""}
    </div>
  )
}

export default CatageoryImgC