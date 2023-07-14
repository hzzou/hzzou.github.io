import React, {useEffect, useRef} from "react";
import styles from "./index.module.scss";
import {Canvas, useLoader} from "@react-three/fiber";
import {CameraControls, OrbitControls, PerspectiveCamera, Box, MeshTransmissionMaterial, MeshDiscardMaterial} from "@react-three/drei";
import {BackSide, BoxGeometry, DoubleSide, TextureLoader} from "three";
import topImg from "@/assets/houseImg/top.png";
import bottomImg from "@/assets/houseImg/bottom.png";
import leftImg from "@/assets/houseImg/left.png";
import rightImg from "@/assets/houseImg/right.png";
import frontImg from "@/assets/houseImg/front.png";
import backImg from "@/assets/houseImg/back.png";
import quanImg from "@/assets/houseImg/quan.png";

const HouseSky: React.FC = () => {
	const boxRef = useRef();
	const topMap = useLoader(TextureLoader, topImg),
		bottomMap = useLoader(TextureLoader, bottomImg),
		leftMap = useLoader(TextureLoader, leftImg),
		rightMap = useLoader(TextureLoader, rightImg),
		frontMap = useLoader(TextureLoader, frontImg),
		backMap = useLoader(TextureLoader, backImg),
		quanMap = useLoader(TextureLoader, quanImg);




	// 放在Canvas里才能拿到boxRef
	const BoxConfig = () => {
		useEffect(() => {
			console.log(boxRef.current);
		}, [boxRef.current]);

		return null;
	};


	return(
		<div id={styles.house}>
			<Canvas>
				<color attach="background" args={["#dedede"]} />
				<PerspectiveCamera
					fov={6}
					aspect={window.innerWidth/window.innerHeight}
					near={0.1}
					far={10}
					position={[0, 0, 0]}
				/>
				<OrbitControls
					minPolarAngle={Math.PI/2}
					maxPolarAngle={Math.PI/2}
					minDistance={0.1}
					maxDistance={5} />
				{/*<axesHelper args={[200]} />*/}
				{/*没添加光，随便设置设么颜色都看不见*/}
				{/*环境光*/}
				<ambientLight intensity={1} args={["#dedede"]}  />
				{/*平行光*/}
				{/*此处不需要平行光*/}
				{/*<directionalLight intensity={1} position={[0, 0, 200]} />*/}
				{/*材料渲染的side设为BackSide再配合z轴的缩放，即可在内部*/}
				{/*球体实现*/}
				<mesh scale={[2, 2, -2]} position={[0, 0, 0]}>
					<sphereGeometry ref={boxRef} args={[3]} />
					<meshStandardMaterial side={BackSide} toneMapped={false} map={quanMap} attach={"material"} />
					<BoxConfig />
				</mesh>
				{/*正方体实现*/}
				{/*<mesh scale={[2, 2, 2]} position={[0, 0, 0]}>
					<boxGeometry ref={boxRef} args={[5, 5, 5]} />
					<meshStandardMaterial side={BackSide} toneMapped={false} map={leftMap} attach={"material-1"} />
					<meshStandardMaterial side={BackSide} toneMapped={false} map={rightMap} attach={"material-0"} />
					<meshStandardMaterial side={BackSide} toneMapped={false} map={topMap} attach={"material-2"} />
					<meshStandardMaterial side={BackSide} toneMapped={false} map={bottomMap} attach={"material-3"}  />
					<meshStandardMaterial side={BackSide} toneMapped={false} map={frontMap} attach={"material-5"} />
					<meshStandardMaterial side={BackSide} toneMapped={false} map={backMap} attach={"material-4"} />
				</mesh>*/}
			</Canvas>
		</div>
	);
};

export default HouseSky;
