import React, { useEffect, useState } from 'react'
import Title from '../../Common/Title'
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

const FileUpload = ({title,project, updatedBy, category, gallerysetState, galleryState, validTypes}) => {
  const [files, setFiles] = useState([]);
  const [extTypes, setExtTypes] = useState([]);

  useEffect(() => {
    let extArr = validTypes.split(",");
    setExtTypes(extArr)
  },[validTypes])

  
  const onprocessfile = (error, file)=> {
    if(!error) {    
      const response = JSON.parse(file.serverId)
      const imageResponse = response.imageModel;
      const img = {
        _id : imageResponse._id,
        originalname : imageResponse.originalname,
        path : imageResponse.path,
        contentType : imageResponse.contentType
      }
      gallerysetState([
        ...galleryState,
        img
      ])     
      setFiles([])
    }   
   
  }
  
  return (
    <>
        <Title title={title} cssClass="fs-5 fw-bold"/>
        <div className="border border-3 mb-4 shadow-lg">
            {/* <label htmlFor="addImages" className="form-label  ">Add Image's</label> */}
            {/* <input className="form-control" type="file" id="addImages" multiple />  */}
            <FilePond 
              name="file"
              files={files}
              onprocessfile ={onprocessfile}
              onupdatefiles={setFiles}
              allowMultiple={true} 
              maxFiles={2} 
              credits={false}
              acceptedFileTypes={extTypes}
              server={`/fileUploader/${project?._id}/${updatedBy}/${category}`}
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              labelInvalidField="invalid files"
              />
        </div>
    </>
  )
}

export default FileUpload