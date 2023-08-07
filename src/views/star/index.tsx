import React, {useRef, useState} from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls, Grid, MeshTransmissionMaterial, useGLTF, Merged, Clone} from "@react-three/drei";
import styles from "./index.module.scss";
import {MeshPhysicalMaterial, MeshStandardMaterial} from "three";

const Star: React.FC = () => {
	const data = useGLTF("/models/ferrari.glb") as any;
	const carModel = data.scene;
	const wheels = [
		carModel.getObjectByName("wheel_fl"),
		carModel.getObjectByName("wheel_fr"),
		carModel.getObjectByName("wheel_rl"),
		carModel.getObjectByName("wheel_rr")
	];
	const gridRef = useRef(null);

	const bodyMaterial = new MeshPhysicalMaterial({
		color: 0xff0000,
		metalness: 1.0,
		roughness: 0.5,
		clearcoat: 1.0,
		clearcoatRoughness: 0.03
	});

	carModel.getObjectByName("body").material = bodyMaterial;

	const glassMaterial = new MeshPhysicalMaterial({
		color: 0xffffff,
		metalness: 0.25,
		roughness: 0,
		transmission: 1.0
	});

	carModel.getObjectByName("glass").material = glassMaterial;

	// 组件以大写开头
	const AnimateWheel = () => {
		// useFrame写动画
		return useFrame((data)=> {
			const time = - performance.now() / 1000;
			wheels.map(ele => {
				ele.rotation.x = time * Math.PI * 2;
			});

			gridRef.current.position.z = -time % 1;
		});
	};

	//
	const handleClick = (event) => {
		// console.log("ev:", event);
	};


	return(
		<div id={styles.star}>
			<Canvas camera={{position: [3, 2, -3.5], fov: 60, aspect: window.innerWidth/window.innerHeight, near: 0.1, far: 100}}>
				<color attach="background" args={["#333"]}/>
				<Grid ref={gridRef} args={[100, 100]} sectionSize={2} sectionColor={"#f0f"} cellSize={1} cellColor={"rgba(255, 100, 0, 0.7)"} fadeDistance={80} />
				<axesHelper args={[100]} />
				<OrbitControls maxDistance={20} minDistance={5} />
				<pointLight color={"#fff"}  position={[10, 50, -10]} />
				<ambientLight intensity={0.3} />
				<group onClick={handleClick} rotation={[0, 0, 0]}>
					{/*primitive加载整体gltf*/}
					<primitive object={carModel} />
					<AnimateWheel />
				</group>

				{/*<group position={[2, 0, 3]} rotation={[0, 0, 0]}>*/}
				{/*	<Clone*/}
				{/*		object={data.nodes.body}*/}
				{/*	>*/}
				{/*		<meshPhysicalMaterial*/}
				{/*			color={0xff0000}*/}
				{/*			metalness={1}*/}
				{/*			roughness={0.5}*/}
				{/*			clearcoat={1}*/}
				{/*			clearcoatRoughness={0.03}*/}
				{/*		/>*/}
				{/*	</Clone>*/}
				{/*	<Clone object={data.nodes.glass} >*/}
				{/*		<meshPhysicalMaterial*/}
				{/*			color={0xffffff}*/}
				{/*			metalness={0.25}*/}
				{/*			roughness={0}*/}
				{/*			transmission={1}*/}
				{/*		/>*/}
				{/*	</Clone>*/}
				{/*</group>*/}

				{/*<group position={[0, 0, 0]}>
					mesh是加载自己创建的那种
					<mesh>
						<boxGeometry args={[2, 2, 2]} />
						<meshPhongMaterial
							color={"#ff0"}
						/>
					</mesh>
				</group>*/}
			</Canvas>
		</div>
	);
};

export default Star;
