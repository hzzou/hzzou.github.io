import React, {useEffect, useRef, useState} from "react";
import {Canvas, useFrame, useLoader, useThree} from "@react-three/fiber";
import {
	OrbitControls,
	Clone,
	useGLTF,
	useTexture,
	Sky,
	PerspectiveCamera
} from "@react-three/drei";
import styles from "./index.module.scss";
import flagText from "@/assets/oly/flag.png";
import skyText from "@/assets/oly/sky.jpg";
import treeText from "@/assets/oly/tree.png";
import snowText from "@/assets/oly/snow.png";
import {
	AdditiveBlending,
	AnimationClip,
	AnimationMixer,
	Clock,
	DoubleSide,
	MeshDepthMaterial,
	MeshPhysicalMaterial, PointsMaterial,
	RGBADepthPacking,
	TextureLoader, Vector3,
	BufferGeometry, BufferAttribute, Points
} from "three";

const Olympic: React.FC = () => {
	const clock = new Clock(); // 时钟

	// 大写字母开头为 组件,环境配置
	const Env = () => {
		const {scene, camera, clock} = useThree();
		const sceneBg = useLoader(TextureLoader, skyText); // 整体背景
		scene.background = sceneBg;
		camera.lookAt(0, 0, 0);


		useFrame((state) => {
			// 判断开场动画只在前几秒完成，就不影响后面的控制器缩放
			if(state.clock.elapsedTime < 6){
				// 定位在300
				state.camera.position.z = 300;
				// elapsedTime为系统启动到现在的累计时间 (300 - 88)/40 = 5.3
				if(state.clock.elapsedTime <= 5.3){
					// 前4秒每秒减去50
					state.camera.position.z -= state.clock.elapsedTime * 40;
				}else{
					state.camera.position.z = 88;
				}
			}
		});

		return null;
	};

	// 土地
	const land = useGLTF("/models/land.glb");
	const [landModel, setLandModel] = useState({});
	// 旗子
	const flag = useGLTF("/models/flag.glb");
	// 因为useTexture需要写成组件用在Canvas,所以只能用它useLoader结合TextureLoader
	const flagTexture = useLoader(TextureLoader, flagText);
	const [flagModel, setFlagModel] = useState({});
	let flagMixer; // 旗帜动画
	// 冰墩墩
	const snowKid = useGLTF("/models/bingdwendwen.glb");
	const [kidModel, setKidModel] = useState({});
	// 雪绒绒
	const snowRong = useGLTF("/models/xuerongrong.glb");
	const [rongModel, setRongModel] = useState({});
	// 树
	const tree = useGLTF("/models/tree.gltf");
	const treeTexture = useLoader(TextureLoader, treeText);
	const [treeModel, setTreeModel] = useState([]);
	// 雪
	const snowTexture = useLoader(TextureLoader, snowText);
	const [snowModel, setSnowModel] = useState({});

	// 土地的一系列配置
	const configLand = () => {
		const scene = land.scene;
		scene.scale.set(1.5, 1.5, 1.5);
		scene.position.set(-35, -40, 0);
		scene.rotation.set(0, -Math.PI/4, 0); // 旋转的值弧度
		// 遍历
		scene.traverse((item: any) => {
			if(item.type === "Mesh"){
				item.receiveShadow = true; // 接收阴影
				item.material.metalness = 0.1;
				item.material.roughness = 0.8;
			}
		});

		setLandModel(scene);
	};

	// 旗帜的一系列配置
	const configFlag = () => {
		const scene = flag.scene;
		scene.traverse((item: any) => {
			if(item.type === "Mesh"){
				item.castShadow = true;
				if(item.name === "mesh_0001"){
					item.material.metalness = 0.1; // 与金属的相似度，非金属使用0，金属使用1
					item.material.roughness = 0.1; // 粗糙度
					item.material.map = flagTexture;
				}

				if(item.name === "柱体"){
					item.material.metalness = 0.6;
					item.material.roughness = 0;
					item.material.refractionRatio = 1; // 空气折射率和材质折射率之比
				}

			}
		});
		scene.rotation.set(0, 0, 0);
		scene.position.set(10, 0, 45);
		scene.scale.set(10, 10, 10);

		const animation = flag.animations[0];
		flagMixer = new AnimationMixer(scene);

		// 动画
		let aniClip = animation;
		const clip = flagMixer.clipAction(aniClip).play();
		aniClip = clip.getClip(); // 获取剩下的动画数据帧

		setFlagModel(scene);
	};

	// 冰墩墩配置
	const configKid = () => {
		const scene = snowKid.scene;
		scene.traverse((item: any) => {
			if(item.type === "Mesh"){
				item.castShadow = true; // 产生阴影
				if(item.name === "皮肤"){
					item.material.metalness = 0.3;
					item.material.roughness = 0.8;
				}

				if(item.name === "外壳"){
					item.material.transparent = true;
					item.material.opacity = 0.15;
					item.material.metalness = 0.6;
					item.material.roughness = 0.8;
					item.material.refractionRatio = 1.2;
					item.castShadow = true;
				}

				if(item.name === "围脖"){
					item.material.transparent = true;
					item.material.opacity = 0.6;
					item.material.metalness = 0.4;
					item.material.roughness= 0.6;
				}

			}
		});

		scene.rotation.set(0, -Math.PI/24, 0);
		scene.position.set(-7, -22, 54);
		scene.scale.set(44, 44, 44);

		setKidModel(scene);
	};

	// 雪绒绒配置
	const configRong = () => {
		const scene = snowRong.scene;
		scene.traverse((item: any) => {
			if(item.type === "Mesh"){
				item.castShadow = true;
			}
		});

		scene.rotation.set(0, Math.PI/3, 0);
		scene.position.set(-30, -18, 60);
		scene.scale.set(18, 18, 18);

		setRongModel(scene);
	};

	// 树配置
	const configTree = () => {
		const scene = tree.scene;
		scene.traverse((item: any) => {
			if(item.type === "Mesh"){
				item.castShadow = true; // 阴影
				const material = new MeshPhysicalMaterial({
					map: treeTexture,
					transparent: true,
					side: DoubleSide,
					metalness: 0.8,
					roughness: 0,
					depthTest: true,
					depthWrite: false,
					fog: false,
					reflectivity: 0.1
				});

				const custMaterial = new MeshDepthMaterial({
					depthPacking: RGBADepthPacking,
					map: treeTexture
				});

				item.material = material;
				item.custromMaterial = custMaterial;
			}
		});

		const sceneOne = scene.clone();
		sceneOne.position.set(-15, -10, 50);
		sceneOne.scale.set(30, 30, 30);

		const sceneTwo = scene.clone();
		sceneTwo.position.set(15, -15, 40);
		sceneTwo.scale.set(25, 25, 25);

		const sceneThree = scene.clone();
		sceneThree.position.set(35, -20, 55);
		sceneThree.scale.set(30, 30, 30);

		setTreeModel([
			sceneOne,
			sceneTwo,
			sceneThree
		]);
	};

	// 雪配置
	const configSnow = () => {
		const geo = new BufferGeometry();
		const material = new PointsMaterial({
			size: 1,
			transparent: true,
			opacity: 0.8,
			map: snowTexture,
			blending: AdditiveBlending, // 使用何种混合
			sizeAttenuation: true, // 点的大小是否因相机深度而衰减
			depthTest: false // 深度测试
		});

		const range = 100, vecArr = new Float32Array(1500 * 3);
		for(let i = 0; i < 1500; i++){
			vecArr[i] = Math.random() * range - range/2;
		}

		geo.center();
		geo.setAttribute("position", new BufferAttribute(vecArr, 3));

		const point = new Points(geo, material);

		setSnowModel(point);
	};

	// 动画
	const custAnimate = () => {
		const time = clock.getDelta(); // 上次到当前的时间
		flagMixer && flagMixer.update(time);

		// 雪的动画
		if(JSON.stringify(snowModel) !== "{}"){
			const snowPos = (snowModel as any).geometry.getAttribute("position");

			for(let i = 0; i < snowPos.array.length; i+=3){
				snowPos.array[i+1] -= 0.3;
				if(snowPos.array[i+1] < -30){
					snowPos.array[i+1] = 30;
				}
			}
			// 强制更新位置
			(snowModel as any).geometry.attributes.position.needsUpdate = true;
		}


		requestAnimationFrame(custAnimate);
	};


	useEffect(()=>{
		configLand();
		configTree();
		configFlag();
		configKid();
		configRong();
		configSnow();
	},[]);

	useEffect(() => {
		custAnimate();
	}, [flagModel, kidModel, rongModel, treeModel, snowModel]);

	return(
		<div id={styles.olympic}>
			<Canvas shadows>
				<PerspectiveCamera
					fov={60} near={20} far={500}
					aspect={window.innerWidth/window.innerHeight}
					position={[0, 0, 200]} />
				{/*控制 AzimuthAngle 水平角度 PolarAngle(正北方为0) 垂直角度 弧度 */}
				<OrbitControls  minAzimuthAngle={-Math.PI/12} maxAzimuthAngle={Math.PI/12} minPolarAngle={Math.PI/2} maxPolarAngle={Math.PI/2} maxDistance={110} minDistance={88} />
				{/*设置scene背景色*/}
				{/*<color attach="background" args={["#dedede"]} />*/}
				{/*坐标*/}
				{/*<axesHelper args={[100]} />*/}
				{/*<Sky />*/}
				<Env />

				{/*环境光*/}
				<ambientLight intensity={1} args={["#cfffff"]} />
				{/*平行光 castShadow设为true是产生动态阴影 */}
				<directionalLight
					intensity={1.5}
					position={[50, 100, 400]}
					castShadow
					shadow-camera-top={70}
					shadow-camera-bottom={-70}
					shadow-camera-left={70}
					shadow-camera-right={-70}
				>
				</directionalLight>

				<group>
					<primitive object={landModel} />
					<primitive object={snowModel} />
					<primitive object={flagModel} />
					<primitive object={kidModel} />
					<primitive object={rongModel} />
					<primitive object={treeModel[0]} />
					<Clone object={treeModel[1]} />
					<Clone object={treeModel[2]} />
					{/*五环*/}
					<group>
						<mesh castShadow position={[-10, 10, 60]}>
							<torusGeometry args={[6, 0.4, 10]} />
							<meshLambertMaterial color={"#0885c2"} side={DoubleSide} />
						</mesh>
						<mesh castShadow position={[5, 10, 60]}>
							<torusGeometry args={[6, 0.4, 10]} />
							<meshLambertMaterial color={"#000"} side={DoubleSide} />
						</mesh>
						<mesh castShadow position={[20, 10, 60]}>
							<torusGeometry args={[6, 0.4, 10]} />
							<meshLambertMaterial color={"#ed334e"} side={DoubleSide} />
						</mesh>
						<mesh castShadow position={[-2.5, 4, 61]}>
							<torusGeometry args={[6, 0.4, 10]} />
							<meshLambertMaterial color={"#fbb132"} side={DoubleSide} />
						</mesh>
						<mesh castShadow position={[12, 4, 61]}>
							<torusGeometry args={[6, 0.4, 10]} />
							<meshLambertMaterial color={"#1c8b3c"} side={DoubleSide} />
						</mesh>
					</group>
				</group>
			</Canvas>
		</div>
	);
};

export default Olympic;
