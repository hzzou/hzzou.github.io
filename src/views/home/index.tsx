import {useState, useEffect, useCallback, useTransition, useRef, createContext} from "react";
import {getData} from "@/views/home/hooks";
import Modal from "@/components/Modal";
import {Button} from "antd";
import style from "./index.module.scss";
export const HomeContext = createContext(null);

const Component = () =>{
	const [count, setCount] = useState(0);
  const [isPending, startTransition] = useTransition();

	useEffect(()=>{
		const p1 =  new Promise((resolve, reject)=>{
			setTimeout(()=>{
				resolve(21);
			}, 15000);
		});

		// getData(p1);
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
			<span>{count}</span>
			<button onClick={onClick}>+1</button>

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
