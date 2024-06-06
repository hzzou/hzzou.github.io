import React, {useEffect, useState} from "react";
import styles from "./index.module.scss";

const Live: React.FC = ()=>{

  const [streamOne, setStreamOne] = useState({});
  const videoLeft: any =  document.querySelector("#videoLeft");
  const mediaConfig = {
    video: true,
    audio: true,
  }

  useEffect(() => {
    navigator.mediaDevices.getUserMedia(mediaConfig).then((stream)=>{
      console.log(stream);
      videoLeft!.srcObject = stream;
    });
  }, []);



  return(
    <div className={styles.live}>
      <div className={styles.left}>
        <video autoPlay={true} id="videoLeft"></video>
      </div>
      <div className={styles.right}></div>
    </div>
  )
};

export default Live;
