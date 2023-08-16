import {Canvas, useFrame} from "@react-three/fiber";
import React, {useRef, useState, forwardRef, ForwardedRef} from "react";
import styles from "./index.module.scss";
import {PerspectiveCamera, OrbitControls} from "@react-three/drei";
import {AudioContext, DoubleSide, CanvasTexture, Group, Vector3} from "three";

const MagicCube: React.FC = () => {
	const controlRef = useRef(null),
		cubeRef = useRef(null);
	let startPoint =  null, directVector = null;
	// 创建canvas画布map
	const canvasMap = (color, size) => {
		const canvas = document.createElement("canvas"),
			context = canvas.getContext("2d");
		canvas.width = size;
		canvas.height = size;

		if(context){
			context.fillStyle = "rgba(0, 0, 0, 1)";
			context.fillRect(0, 0, size, size); // 默认填充黑色

			// rect只是画矩形路径，没填充
			context.rect(10, 10, size - 20, size - 20);
			context.lineJoin = "round"; // 外角圆弧
			context.lineWidth = 10;
			// 路径填充
			context.strokeStyle = color;
			context.stroke();
			// 填充矩形路径内部
			context.fillStyle = color;
			context.fill();
		}
		else{
			alert("你的浏览器不支持canvas");
		}

		return canvas;
	};

	// 开始转动
	const startCube = (data)=>{
		console.log("1:",data);
		startPoint = data!.point;
		// 转动某一行魔方时禁止控制整体
		controlRef!.current!.enabled = false;
	};


	// 停止转动
	const stopCube = (data)=>{
		const point = data!.point;
		directVector = new Vector3(point.x - startPoint.x, point.y - startPoint.y, point.z - startPoint.z);
		const direction = getDirection(directVector);
		controlRef!.current!.enabled = true;
	};

	// 获得转动方向
	const getDirection = (direct)=>{
		let direction;
		const normalFrontX = new Vector3(1, 0, 0),
			normalBackX = new Vector3(-1, 0, 0),
			normalFrontY = new Vector3(0, 1, 0),
			normalBackY = new Vector3(0, -1, 0),
			normalFrontZ = new Vector3(0, 0, 1),
			normalBackZ = new Vector3(0, 0, -1);

		const xFrontAngle = direct.angleTo(normalFrontX),
			xBackAngle = direct.angleTo(normalBackX),
			yFrontAngle = direct.angleTo(normalFrontY),
			yBackAngle = direct.angleTo(normalBackY),
			zFrontAngle = direct.angleTo(normalFrontZ),
			zBackAngle = direct.angleTo(normalBackZ);


		const minAngle = Math.min(xFrontAngle, xBackAngle, yFrontAngle, yBackAngle, zFrontAngle, zBackAngle);

		// switch最小值看是xFrontAngle等6个值中的哪个
		// 或者使用map键值对策略模式
		switch (minAngle) {
		case xFrontAngle:
			direction = 0;
			// 在此处对特定方块进行旋转
			break;
		case xBackAngle:
			direction = 1;
			break;
		case yFrontAngle:
			direction = 2;
			break;
		case yBackAngle:
			direction = 3;
			break;
		case zFrontAngle:
			direction = 4;
			break;
		case zBackAngle:
			direction = 5;
			break;
		default:
			break;
		}
		console.log(direction);
		return direction;
	};

	// 魔方组件
	const Cube = forwardRef((props:any, ref: ForwardedRef<Group>) => {
		const num = props!.num || 3,
			len = props!.len || 2,
			x = props!.x || 0,
			y = props!.y || 0,
			z = props!.z || 0,
			colors = props!.colors || ["#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f"];
		// 魔方左上角坐标
		const leftUpX = x - num / 2 * len,
			leftUpY = y + num / 2 * len,
			leftUpZ = z + num / 2 * len;

		// 转动动画
		useFrame((state)=>{
			// console.log(state);
			// console.log(cubeRef);
			const children = cubeRef!.current!.children;
			setTimeout(()=>{
				for(let i = 0; i < children.length; i+=3){
					children[i].rotation.y = Math.PI/2;
					children[i+1].rotation.y = Math.PI/2;
					children[i+2].rotation.y = Math.PI/2;
				}
			}, 2000);
		});
		const current = [], materialArr = [];
		for(let i = 0; i < colors.length; i++){
			const texture = new CanvasTexture(canvasMap(colors[i], 200));
			// 分别attach每个小面，小正方体每个面的颜色分别不同
			materialArr.push(<meshLambertMaterial key={i} attach={"material-"+i}  map={texture} />);
		}

		for(let i = 0; i < num; i++){
			for(let j = 0; j < num * num; j++){
				const x = (leftUpX + len/2) + (j%num)*len;
				const y = (leftUpY - len/2) - Math.floor(j/num)*len;
				const z = (leftUpZ - len/2) - i*len;

				current.push(
					<mesh
						onPointerDown={startCube}
						onPointerUp={stopCube} key={i+"_"+j} position={[x,y,z]}>
						<boxGeometry args={[2, 2, 2]} />
						{materialArr}
					</mesh>
				);
			}
		}

		return(
			<group ref={ref}>
				{current}
			</group>
		);
	});




	return(
		<div id={styles.magicCube}>
			<Canvas>
				<PerspectiveCamera
					fov={60} near={1} far={200}
					position={[0, 0, 200]}
					aspect={window.innerWidth/window.innerHeight} />
				<OrbitControls ref={controlRef} minDistance={10} maxDistance={25} />
				<color attach={"background"} args={["#000"]} />
				<axesHelper args={[100]} />
				<ambientLight intensity={1} args={["#fff"]} />
				<Cube ref={cubeRef} />
			</Canvas>
		</div>
	);
};

export default MagicCube;
