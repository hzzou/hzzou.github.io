import {Button, Modal} from "antd";
import React, { useContext, useState} from "react";
import style from "./index.module.scss";
import {HomeContext} from "@/views/home";
import Child from "./child";


// 即是父级要传进来的prop最好定义接口类型
interface inProps{
	time: number;
}

const PageTable: React.FC<inProps> = (props: inProps) => {
	// console.log("pageTable:",props);
	const {a, setA} = useContext(HomeContext),
		[isOpen, setOpen] = useState(false);

	const handleV = () => {
		setA("wed");
	};

	const handleModal = () => {
		setOpen(true);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	return (
		<div className={style.pageTable}>
			<div className={style.box}></div>
			<div className={style.box}>
				<div className={style.child}></div>
			</div>
			<div className={style.boxOne}>
				<Button onClick={handleV}>测试</Button>
				<div style={{color: "#fff"}}>{"page-a:"+a}</div>
				<div className={style.child}></div>
			</div>
			<Child/>
			{/*<Button type='primary' onClick={handleModal}>弹框p</Button>
			<Modal
				open={isOpen}
				cancelText={"取消"}
				okText={"确定"}
				onCancel={handleCancel}
				destroyOnClose={true}
				centered={true}
			>
				<div className={style.modal}>pageTable的modal</div>
			</Modal>*/}
		</div>
	);
};

export default PageTable;
