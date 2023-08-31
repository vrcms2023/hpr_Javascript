import React, { useEffect, useState } from "react";
import Title from "../../Common/Title";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { getBaseURL } from "../../util/ulrUtil";
import { toast } from "react-toastify";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation,
);

const FileUpload = ({
  title,
  project,
  updatedBy,
  category,
  gallerysetState,
  galleryState,
  validTypes,
  disabledFile = false,
}) => {
  const [files, setFiles] = useState([]);
  const [extTypes, setExtTypes] = useState([]);
  const backendURL = getBaseURL();

  useEffect(() => {
    let extArr = validTypes.split(",");
    setExtTypes(extArr);
  }, [validTypes]);

  const onprocessfile = (error, file) => {
    if (!error) {
      const response = JSON.parse(file.serverId);
      const imageResponse = response.imageModel;
      const img = {
        _id: imageResponse._id,
        originalname: imageResponse.originalname,
        path: imageResponse.path,
        contentType: imageResponse.contentType,
      };
      gallerysetState([...galleryState, img]);
      setFiles([]);
    }
  };

  const onerror = (error) => {
    if (error.type) {
      console.log("error upload fil");
    }
  };

  return (
    <>
      <Title title={title} cssClass="fs-6 fw-bold" />
      <div className="border border-3 mb-4 shadow-lg">
        {/* <label htmlFor="addImages" className="form-label  ">Add Image's</label> */}
        {/* <input className="form-control" type="file" id="addImages" multiple />  */}
        <FilePond
          name="file"
          files={files}
          onprocessfile={onprocessfile}
          onerror={onerror}
          onupdatefiles={setFiles}
          allowMultiple={true}
          maxFiles={4}
          maxParallelUploads={4}
          disabled={disabledFile}
          credits={false}
          acceptedFileTypes={extTypes}
          server={`${backendURL}/api/imageUpload/fileUploader/${project?._id}/${updatedBy}/${category}`}
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          labelInvalidField="invalid files"
        />
      </div>
    </>
  );
};

export default FileUpload;
