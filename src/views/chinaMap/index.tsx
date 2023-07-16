import React, {useEffect, useRef, useState} from "react";
import styles from "./index.module.scss";
import {Canvas, useLoader} from "@react-three/fiber";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {
	FileLoader,
} from "three";
import Map from "./map";
import emitter from "@/utils/eventBus";


const ChinaMap:React.FC = () => {
	const shapeData = useLoader(FileLoader, "/china.json"),
		features = JSON.parse(shapeData as any).features;

	// 变量如果涉及页面渲染，需要用useState(),
	const [provinceName, setProvince] = useState(""),
		[pos, setPos] = useState({x:0, y:0}),
		mapRef = useRef();

	//离开时名字置空
	const handleCancel = () => {
		setProvince("");
	};

	useEffect(() => {
		emitter.on("handleShow", (data: any) => {
			setProvince(data.object.name);
			setPos({x: data.offsetX, y: data.offsetY});
		});

		emitter.on("handleCancel", () => {
			setProvince("");
		});


		return () => {
			//删除handleShow事件的所有处理函数
			// 也可以把事件处理函数定义特定名称，卸载时指定事件类型和函数名的话，
			// 就只卸载某个事件的某个函数
			emitter.off("handleShow");
			emitter.off("handleCancel");
		};
	}, [mapRef.current]);




	return (
		<div id={styles.map}>
			<div id={styles.tooltip} style={{left: pos.x, top: pos.y}}>{provinceName}</div>
			<Canvas>
				<PerspectiveCamera
					fov={60} near={1} far={100}
					aspect={window.innerWidth/window.innerHeight}
					position={[0, 0, 100]} />
				<OrbitControls minDistance={1} maxDistance={10} />
				<ambientLight intensity={1} args={["#dedede"]} />
				{/*<axesHelper args={[200]} />*/}

				<Map ref={mapRef} features={features} />
			</Canvas>

		</div>
	);
};

export default ChinaMap;
