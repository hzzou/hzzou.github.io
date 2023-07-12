import React, {useRef} from "react";
import AboutInput from "./aboutInput";
const About:React.FC = () => {
	const list = [1, 2, 3, 4, 5],
		divList = useRef(null);

	console.log("divList:",divList);
	const getRef = (dom: Element | null) => {
		if(!dom) return;

		console.log("dom:",dom);
	};

	return(
		<>
			{
				list.map((item) => {
					return <div  key={item}><input ref={getRef} type="text" /></div>;
				})
			}
			<AboutInput ref={divList}  ></AboutInput>
		</>
	);

};

export default About;
