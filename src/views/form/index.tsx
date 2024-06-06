import React, {useEffect, useState, memo} from "react";
// import { useForm } from "react-hook-form";
import styles from "./index.module.scss";
import {Form, Input, Select, Button} from "antd";

const {Option} = Select;

type formInput = {
  name: string
  pass: string
}
const CustForm: React.FC = ()=>{

  //const{register, handleSubmit, formState: {errors}} = useForm<formInput>()
  const [form] = Form.useForm();
  const age = Form.useWatch("age", form);
  const gender = Form.useWatch("gender", form);

  const AgeTip = ()=>{
    if(age < 10){
      return  <p>儿童</p>
    }
    else if(age < 18){
      return <p>青少年</p>
    }
    else{
      return <p>社会人</p>
    }
  };

  const Hob = (props)=>{
    console.log(props);
    const {className} = props;

    if(gender === "Y"){
      return (
        <Form.Item
          label={"兴趣"}
          name={"like"}
        >
          <Select className={className} mode={"multiple"} placeholder={"请选择兴趣"}>
            <Option value={1}>游戏</Option>
            <Option value={2}>看书</Option>
            <Option value={3}>爬山</Option>
          </Select>
        </Form.Item>
      )
    }
    else{
      return (
        <Form.Item
          label={"兴趣"}
          name={"like"}>
          <Select className={className} mode={"multiple"} placeholder={"请选择兴趣"}>
            <Option value={1}>游戏</Option>
            <Option value={2}>看书</Option>
            <Option value={4}>追剧</Option>
          </Select>
        </Form.Item>
      )
    }
  }

  const onSubmit = (data)=>{
    console.log(data);
  };

  return(
    <div className={styles.custForm}>
      <Form
        form={form}
        onFinish={onSubmit}
      >
        <Form.Item
          label={"姓名"}
          name={"name"}
        >
          <Input placeholder={"请输入姓名"} />
        </Form.Item>
        <Form.Item
          label={"年龄"}
          name={"age"}
          extra={ age ? <AgeTip /> : null}
        >
          <Input placeholder={"请输入年龄"} />
        </Form.Item>
        <Form.Item
          label={"性别"}
          name={"gender"}
        >
          <Select className={styles.gender} placeholder={"请选择性别"} >
            <Option value={"Y"}>男</Option>
            <Option value={"N"}>女</Option>
          </Select>
        </Form.Item>
        <Hob className={styles.hob} />
        <Form.Item>
          <Button type="primary" htmlType={"submit"}>提交</Button>
        </Form.Item>
      </Form>
    </div>
  )
};

export default CustForm;
