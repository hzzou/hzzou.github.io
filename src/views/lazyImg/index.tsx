import React, {useEffect, useRef} from "react";
import classNames from "classnames";
import styles from "./index.module.scss";
import {useObserver} from "./hooks";

const LazyImg: React.FC = () => {
	const arr = [1, 2, 3, 4, 5];

	const imgData: object = import.meta.glob("/src/assets/img/*.png", {eager: true}); // eager表示静态资源
	let imgList = [];
	for(const i in imgData){
		imgData[i]!.default && imgList.push(imgData[i]!.default);
	}
	const loading = imgList.filter(ele => ele.includes("loading"))[0];
	imgList = imgList.filter(ele => !ele.includes("loading"));
	// console.log(loading);
	// console.log(imgList);
	// 大写开头表示组件
	const Child = (item) => {
		const itemRef = useRef<HTMLDivElement>(),
			visible = useObserver(itemRef);
		return (
			<div key={item} ref={itemRef} className={classNames(styles.imgChild)}>
				{visible ? <img src={item}  /> : <img src={loading} />}
			</div>
		);
	};

	return (
		<div className={classNames(styles.lazyImg)}>
			{imgList.map(Child)}
		</div>
	);
};

export default LazyImg;
