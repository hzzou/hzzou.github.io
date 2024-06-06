import {useNavigate} from "react-router-dom";
import React, {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState
} from "react";
import style from "./index.module.scss";
import PageTable from "@/components/PageTable";
import Dialog from "@/components/Dialog";
import {Button, Modal} from "antd";
import {getData, transform, useFib} from "./hooks";
import CustInput from "./custInput";
import {useGlobalStore} from "@/reducer/globalStore";

export const HomeContext = createContext(null);
const Home:React.FC = () => {
	const nav = useNavigate(),
		inputRef = useRef(null), // 获取真实dom元素
		[time, setTime] = useState(0),
		countRef = useRef(0), // 不会触发DOM渲染
		[isOpen, setOpen] = useState(false),
		[a, setA] = useState("abc"),
		dialogValue = useMemo(() => a, [a]),
		setDialog = useCallback((k) => {
			return setA(k);
		}, []);

	const {countState, countDispatch} = useGlobalStore();

	const found = (s, t) => {
		const m = {}, k = [], n = {}, j = [];
		let  result;

		for(let i = 0; i < s.length; i++){
			if(!k.includes(s[i])){
				k.push(s[i]);
				m[s[i]] = 1;
			} else{
				m[s[i]] += 1;
			}
		}

		for(let i = 0; i < t.length; i++){
			if(!j.includes(t[i])){
				j.push(t[i]);
				n[t[i]] = 1;
			} else{
				// console.log(n[t[i]]);
				n[t[i]] += 1;
			}
		}

		const keyArrm = Object.keys(m);
		const keyArrn = Object.keys(n);
		keyArrn.map(ele => {
			if(!keyArrm.includes(ele) || m[ele] !== n[ele]){
				result = ele;
			}
		});

		// console.log("result:",result);
	};

	useEffect(() => {
		// console.log(cal(1));
		// found("abcd", "aebcd");
		// found("aaaa", "aabaa");
		// found("abbdd", "adabdb");
		//console.log("inputRef:",inputRef);
		// console.log(a);
		inputRef.current.focus();
		inputRef.current.value = 123;

		// const InterVal = setTimeout(() => {
		// 	// setTime(time + 1);
		// },1000);

		//返回一个函数 主要用于卸载事件
		// return () => {
		// 	clearInterval(InterVal );
		// };

		const b = [
			{
				id: 1,
				name: "1212",
				disabled: false
			},
			{
				id: 2,
				name: "3443",
				disabled: true
			},
			{
				id: 3,
				name: "5445",
				disabled: false
			}
		];

		// console.log(transform(b));

		// getData();
	}, []);

	// a更新的时候执行
	useEffect(() => {
		// console.log("home:",a);
		inputRef.current.value = a;
	}, [a]);

	const handleDetail = () => {
		nav("/detail");
	};

	const handleModal = () => {
		setOpen(true);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	const handleCount = () => {
		countRef.current = countRef.current+1;
		// console.log("countRef:", countRef);
	};

	const handleTime = () => {
		setTime(12);
	};

	// console.time("am");
	// console.log(useFib(5000));
	// console.timeEnd("am");
	const handleAddCount = () => {
		countDispatch({type: "ADD"});
	};

	const arr_1 = [1, 2, 3, 4];
	const arr_p = new Proxy(arr_1, {
		get(target, prop){
			return Reflect.get(target, prop);
		},
		set(target, prop, value){
			return Reflect.set(target, prop, value);
		},
		deleteProperty(target, prop ){
			return Reflect.deleteProperty(target, prop);
		}
	});

	// console.log("arr_1:",arr_1);
	arr_p[1] = 5;
	// console.log("arr_p", arr_p);
	// console.log("arr_1", arr_1);

	function getNum<T, R extends keyof T>(obj: T, key: R){
		return obj[key];
	}
	const person = {name: "hzlzh", age: 123};
	interface im{
		[propName: string]: number | string;
	}
	const n = getNum(person, "name"); // 类型推论，常规开发中都是这样
	const age = getNum<im, string>(person, "age"); // 明确传入
	// console.log("n:", n);
	// console.log("age:", age);





	return (
		<div className={style.home}>
			<div>{"home-count:"+countState.count}</div>
			<Button onClick={handleAddCount}>有嵌套的reducer共享</Button>
			<div>{countRef.current}</div>
			<Button onClick={handleCount}>改变countRef</Button>
			<div className={[style.box, "box"].join(" ")}>home页面</div>
			<Button type='primary' onClick={handleDetail}>去详情页</Button>
			<Button type='primary' onClick={handleModal}>弹框</Button>
			<HomeContext.Provider value={{a, setA, countState, countDispatch}}>
				<PageTable time={time}></PageTable>
			</HomeContext.Provider>
			{/*<Dialog dialogValue={dialogValue} setDialog={setDialog}></Dialog>*/}
			<CustInput custCount={time} ref={inputRef}></CustInput>
			<div style={{color: "#fff"}}>{"home-a:"+a}</div>
			<div style={{color: "#fff"}}>{"time:"+time}</div>
			<Button type={"primary"} onClick={handleTime}>改变prop</Button>

			{/*<Modal
				open={isOpen}
				cancelText={"取消"}
				okText={"确定"}
				onCancel={handleCancel}
				destroyOnClose={true}
				centered={true}
			>
				<div className={style.modal}>home的modal</div>
			</Modal>*/}
		</div>
	);
};

Home.defaultProps = {
	user: "hzlzh"
};


export default Home;
