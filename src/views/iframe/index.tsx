import React, {useEffect, useRef, useState} from "react";
import styles from "./index.module.scss";
const CustIframe: React.FC = ()=>{

  const url = "http://127.0.0.1:5173";
  const iframeRef: any = useRef();
  const [load, setLoad] = useState(false);

	// iframeRef.current和原生获取iframe都可以
	// 重点是要setTimeout一下(定时或者刷新一下)
	useEffect(() => {
		// setTimeout(()=>{
		// 	iframeRef.current  && iframeRef.current.contentWindow.postMessage("434343", "*");
		// }, 1000);

      if(iframeRef.current){
		    iframeRef.current.onload = ()=>{
			    //console.log("we:");
			    //console.log(iframeRef.current);
			    //console.log(iframeRef.current.contentWindow);
				//window.postMessage("434343")
				// console.log(iframeRef.current.contentWindow.postMessage);
				// setTimeout(()=>{
				// 	iframeRef.current  && iframeRef.current.contentWindow.postMessage("434343", "*");
				// }, 1000)
				//iframeRef.current  && iframeRef.current.contentWindow.postMessage("434343", "*");
        }
      }


	}, [iframeRef.current]);

	useEffect(() => {
		if(load){
			setTimeout(()=>{
				//iframeRef.current  && iframeRef.current.contentWindow.postMessage({token:"434343"}, "*");
			}, 0);

			iframeRef.current  && iframeRef.current.contentWindow.postMessage({token:"434343"}, "*");
		}
	}, [load, iframeRef.current]);

	const handleMsg = (event)=>{
		//setLoad(true);
		// const myIframe = document.querySelector("#frame");
		// console.log(myIframe.contentWindow);
		// setTimeout(()=>{
		// 	myIframe && myIframe?.contentWindow.postMessage({token: "434343"}, "*");
		// }, 50);
		//const myIframe = document.querySelector("#frame");
		//myIframe && myIframe?.contentWindow.postMessage({token: "434343"}, "*");
	}

  return(
    <div className={styles.myIframe}>
      <iframe id="frame" ref={iframeRef} src={url} onLoad={handleMsg}></iframe>
    </div>
  )
}

export default CustIframe;
