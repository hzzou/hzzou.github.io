import React, {useCallback, useContext, useEffect} from "react";
import style from "./index.module.scss";
import { Button } from "antd";
import { useMemo } from "react";

interface inProps{
	dialogValue: string;
	setDialog: (value) => void
}
const Dialog:React.FC<inProps> = (props: inProps) =>{
	const {dialogValue, setDialog} = props;
	const m = useMemo(() => dialogValue+2, [dialogValue]);

	console.log("s:",dialogValue);
	console.log("set:",setDialog);
	const hands = (a, b) => {
		return a+"_"+b;
	};

	const d = useCallback(() => {
		return hands(dialogValue, m);
	}, [dialogValue, m]);

	console.log(d());

	const handleV = () => {
		setDialog("129");
	};

	return(
		<div className={style.dialog}>
			<div className={style.box}></div>
			<div className={[style.box, "box"].join(" ")}>
				测试
			</div>
			<div style={{color: "#fff"}}>{m}</div>
			<div style={{color: "#fff"}}>{dialogValue}</div>
			<Button type='primary' onClick={handleV}>改变</Button>
		</div>
	);
};

export default Dialog;
