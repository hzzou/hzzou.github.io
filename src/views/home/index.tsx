import {useState, useEffect, useCallback, useTransition, useRef, createContext} from "react";
import {getData} from "@/views/home/hooks";
import Modal from "@/components/Modal";
import {Button} from "antd";
import style from "./index.module.scss";
import * as superagent from "superagent";
import axios from "axios";
export const HomeContext = createContext(null);
//import {Button, Icon} from "parcel_lib";
const Component = () =>{
	const [count, setCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  const getQuestion = ()=>{
    let url = new URL('http://localhost:3000/get/questions');
    const params = {
      start: 0,
      end: 1
    };

    Object.entries(params).map(([key, value]) => url.searchParams.append(key, String(value)));
    console.log(url)
    console.log(url.toString())

    // 原生fetch没有params

    fetch(url.toString(), {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res)=> {
        console.log(res);
      })
      .then(data => {
        console.log("data:");
        console.log(data);
      })
      .catch(error => console.error("error:", error));
  };

  const getQues = ()=>{
    let url = new URL('http://localhost:3000/get/questions');
    const params = {
      start: 0,
      end: 1
    };

    Object.entries(params).map(([key, value]) => url.searchParams.append(key, String(value)));
    console.log(url)
    console.log(url.toString());

    superagent.get(url.toString())
      .then(res=>{
        //console.log(res);
        if(!res.ok){
          throw new Error(`HTTP error! Status: ${res.status}`)
        }
        return res.body;
      })
      .then(data => {
        console.log("data:");
        console.log(data);
      })
      .catch(console.error);
  };

  const getQuest = ()=>{
    let url = new URL('http://localhost:3000/get/questions');
    const params = {
      start: 0,
      end: 1
    };

    Object.entries(params).map(([key, value]) => url.searchParams.append(key, String(value)));
    console.log(url)
    console.log(url.toString());

    axios.get('http://localhost:3000/get/questions', {
      params: params
    })
      .then(res=>{
        console.log(res);
        if(res.status !== 200){
          throw new Error(`HTTP error! Status: ${res.status}`)
        }
        return res.data;
      })
      .then(data => {
        console.log("data:");
        console.log(data);
      })
      .catch(console.error);
  }

	useEffect(()=>{
		const p1 =  new Promise((resolve, reject)=>{
			setTimeout(()=>{
				resolve(21);
			}, 15000);
		});
		// getData(p1);

    // getQuestion();

    // getQues();

    // getQuest();
	},[]);

	useEffect(()=>{
		// 如果说只在首次计数时打印，只需判断等于1
		// 如果说在每次计数都打印，只需判断大于0
		if(count === 1){
			console.log("开始计数");
		}
	}, [count]);

	const onClick = useCallback(()=> {
		console.log(count);
		setCount(count + 1);
	}, [count]);

	function validate(input?: string | number) {
		console.log(Number(input));
		if(!Number.isInteger(Number(input))){
			throw new Error("只能输入整数");
		}
		else{
			return true;
		}
	}

	try {
		console.log(validate("-67"));
	}catch (e) {
		console.log(e.message);
	}

  const modalRef = useRef(null);
  const [show, setShow] = useState(false);

  const handleModal = ()=>{
    console.log(modalRef);
    // if (modalRef){
    //   modalRef.current.handleClick();
    // }

    setShow(true);
  }

  const handleCancel = ()=>{
    console.log(modalRef);
    // if (modalRef){
    //   modalRef.current.handleCancel();
    // }
    setShow(false);
  }

	return(
		<div className={style.home}>
      <div>
        <span>{count}</span>
        <button onClick={onClick}>+1</button>
      </div>


      <Button className={"btn"} type={"primary"} onClick={handleModal}>弹窗</Button>
      <Button className={"btn"} type={"primary"} onClick={handleCancel}>弹窗取消</Button>
      <Modal show={show} onClick={handleModal} onCancel={handleCancel}  />

      <div className={style.wrap}>
        <div>121121</div>
      </div>
		</div>

	);
};

export default Component;
