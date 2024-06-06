import React, {FC, forwardRef, useImperativeHandle, useRef, useState} from "react";
import style from "./index.module.scss";
import {Button} from "antd";

interface InterProps {
  width: number;
  height: number;
  title: string;
  content: string;
}
const Modal: FC<Partial<InterProps>> = forwardRef((props, ref)=>{

  const {title, content, width = 300, height = 200} = props;

  const [show, setShow] = useState(false);

  const currentRefOne = useRef(null);
  const currentRefTwo = useRef(null);


  const handleClick = ()=>{
    setShow(!show);
    console.log(currentRefOne);
  }

  const handleCancel = ()=>{
    // console.log("取消");
    console.log(currentRefTwo);
  }


  useImperativeHandle(ref, ()=>{
    return {
      handleClick,
      handleCancel
    }

  });
  return(
    <>
      { show ? <div className={style.modal}>
        <header className={style.header}>
          <h2>{title ? title : "标题"}</h2>
        </header>
        <article className={style.article} style={{width, height}}>
          {content ? content : "暂无内容"}
        </article>
        <footer className={style.footer}>
          <Button ref={currentRefOne} type={"primary"} onClick={handleClick}>确定</Button>
          <Button ref={currentRefTwo} onClick={handleCancel}>取消</Button>
        </footer>
      </div> : null}
    </>
  );
})

export default Modal;
