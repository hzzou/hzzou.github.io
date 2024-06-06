import React, {FC, forwardRef, useImperativeHandle, useRef, useState} from "react";
import style from "./index.module.scss";
import {Button} from "antd";

interface InterProps {
  show: boolean;
  width: number;
  height: number;
  title: string;
  content: string;
  onClick: ()=>void;
  onCancel: ()=>void;
}
const Modal: FC<Partial<InterProps>> = (props)=>{

  /*// Record<number, string> 定义对象的键类型和值类型
  const m: Record<string, {name: string, age: number}> = {
    "a" : {name: 'hzlzh', age: 20},
    "b" : {name: 'hzzou', age: 10}
  }

  console.log(m);

  // 提取出指定字段类型
  type pick = Pick<DialogProps, 'title' | 'modal'>
  // 定义的是对象
  /!*{
      title: string;
      modal: boolean;
  }*!/

  const p1: pick = {
    title: "hzlzh",
    modal: false
  };

  // 与Pick正好相反, 从type中移除指定的key
  type omit = Omit<DialogProps, 'onClose' | 'onOpen' | 'modal'>;

  const p4: omit = {
    title: "hz",
    content: "zz",
    width: 12,
    height: 12
  };

  // 把DialogProps中的所有属性设为可选
  const p2: Partial<DialogProps> = {
    title: "hz"
  }

  interface pm{
    name?: string;
    age?: number;
  }
  // Required把可选 属性变为必选
  const p3: Required<pm> = {
    name: "hzlzh",
    age: 12
  };

  // 获得两个的交集类型
  type exact = Extract<number | string | boolean, string | number>

  const p5: exact = "false";
  // 从第一个类型里移除第二个里的所有类型来构造一个新类型
  type exclude = Exclude<string | number | boolean, string | number>

  const p6: exclude = false;
  // 移除undefined和null构造新的类型
  type nonull = NonNullable<string | number | undefined | null>

  const p7: nonull = "f";

  const p8: Readonly<pm> = {
    name: "hz",
    age: 30
  }

  // 只读，不能修改
  // p8.name = "hzlzh";*/
  const {show = false, title, content, width = 300, height = 200, onClick, onCancel} = props;


  const handleClick = ()=>{
    onClick && onClick();
  }

  const handleCancel = ()=>{
    onCancel && onCancel();
  }


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
          <Button type={"primary"} onClick={handleClick}>确定</Button>
          <Button onClick={handleCancel}>取消</Button>
        </footer>
      </div> : null}
    </>
  );
};

export default Modal;
