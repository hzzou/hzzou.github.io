import React, {forwardRef, memo} from "react";

interface inProps{
	custCount?: number
}

const custInput = forwardRef<HTMLInputElement, inProps>((props:inProps, ref) =>{
	console.log("cust页面");
	console.log("props:", props);
	console.log("ref:", ref);
	return(
		<div className="custInput">
			<input type="text" ref={ref} />
		</div>
	);
});

custInput.defaultProps = {
	custCount: 0
};

// export default custInput;
// 优化props不变时，组件跳过渲染
export default memo(custInput);
