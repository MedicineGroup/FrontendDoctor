import React, { useEffect, useState } from 'react'
import axios from "axios"
function FilesInfo({user}) {
  const [allImage, setAllImage] = useState(null);
  useEffect(() => {
    getPdf();
  }, []);
  const getPdf = async () => {
    const result = await axios.get(`http://localhost:8888/get-files?id=${user._id}`);
    console.log("get-files :",result.data.data);
    setAllImage(result.data.data);
  };
  const showPdf = (pdf) => {
    window.open(`http://localhost:8888/files/${pdf}`, "_blank", "noreferrer");
    //setPdfFile(`http://localhost:8888/files/${pdf}`)
  };
  return (
    <div className="uploaded">
        <div className="output-div">
          {allImage == null
            ? ""
            : allImage.map((data, index) => {

                return (
                  <div  key={index} className="inner-div">
                    <h6>{data.type}: {data.title}</h6>
                    <button
                      className="btn btn-primary"
                      onClick={() => showPdf(data.pdf)}
                    >
                      Show Pdf
                    </button>
                    <br/>
                    <br/>
                  </div>
                );
              })}
        </div>
      </div>
  )
}

export default FilesInfo