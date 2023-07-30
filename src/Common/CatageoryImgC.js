import React, {useEffect} from 'react'
import Title from './Title'
import { useCookies } from "react-cookie";

const CatageoryImgC = ({title, catategoryImgs, catategoryImgState, cssClass, thumbDelete,  project, category }) => {
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

  return (
    <div className=''>
      { catategoryImgs.length > 0 ? (     
        <>
                <Title title={title} cssClass="fs-5"/>
                <div className='d-flex justify-content-start align-items-center flex-wrap'>
                {
                  catategoryImgs.map((item) => { 
                        return item.contentType === "pdf" ? (
                        <div className='categoryContainer' key={item.id} onClick={() => thumbDelete(item.id)}>
                          <li><a target='_blank' href={`${window.location.origin}/${item.path}`}>{item.originalname}</a></li>
                        </div>
                      ) : (
                        <div className='categoryContainer' key={item.id} onClick={() => thumbDelete(item.id)}>
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