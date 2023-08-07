import {useEffect, useMemo, useState} from "react";


const useObserver = (domRef: any) =>{
	const [visible, setVisible] = useState(false);

	const interObserver = useMemo(() => {
		return new IntersectionObserver((entries, observer) => {
			// console.log("entires:",entries);
			entries.map((item) => {
				if(item.isIntersecting){
					setTimeout(() => {
						setVisible(true);
						// observer.unobserve(item.target);  // 停止观察某个元素
						observer.disconnect(); // 关闭观察器
					}, 2000);
				}
			});
		});
	}, []);

	useEffect(() => {
		if(domRef!.current){
			interObserver.observe(domRef.current);
		}

		return () => {
			interObserver.disconnect();
		};
	}, [domRef.current]);

	return visible;
};

export {useObserver};
