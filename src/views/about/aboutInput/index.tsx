import React, {forwardRef, memo, useImperativeHandle} from "react";


const AboutInput = forwardRef<HTMLDivElement[]>((props, ref) => {
	const list = [1, 2, 3, 4, 5],
		div: HTMLDivElement[] = [];

	const getRef = (dom) => {
		if(!dom) return;

		div.push(dom);
	};

	useImperativeHandle(ref, () => {
		return div;
	}, []);

	return(
		<>
			{
				list.map((item) => {
					return <div ref={getRef} key={item}>{item}</div>;
				})
			}
		</>
	);
});

export default memo(AboutInput);
