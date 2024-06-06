import React, {useEffect, useState} from "react";
import styles from "./index.module.scss";
import {
	Scene,
	Color,
	Fog,
	GridHelper,
	PerspectiveCamera,
	WebGLRenderer,
	PointLight, AmbientLight, BoxGeometry, MeshBasicMaterial, Mesh, MeshPhysicalMaterial, MeshStandardMaterial
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

import Stats from "three/examples/jsm/libs/stats.module";

const Car:React.FC = () => {
	let scene, camera, renderer, controls, stats, grid, wheels = [];

	// 初始化基本场景
	const init = () => {
		scene = new Scene();
		scene.background = new Color("#333");
		scene.fog = new Fog("#333", 10, 50); // 模糊

		grid = new GridHelper(20, 40, "", "");
		grid.material.opacity = 0.2;
		grid.material.depthWrite = false;
		grid.material.transparent = true;
		scene.add(grid);

		camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
		camera.position.set(4, 1.5, -4.5);

		renderer = new WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(window.devicePixelRatio);

		// 要加光源，添加的材料才会显示
		// 点光源
		const point = new PointLight("#fff");
		point.position.set(200, 100, 100);
		scene.add(point);
		// 环境光---阳光普照，自然光
		const ambient = new AmbientLight("#999");
		scene.add(ambient);

		controls = new OrbitControls(camera, renderer.domElement);
		controls.maxDistance = 10;
		controls.target.set(0, 0.5, 0);

		const carEle = document.querySelector("#car");
		carEle.appendChild(renderer.domElement);

		stats = new Stats();
		carEle && carEle.appendChild(stats.dom);
	};

	const loopRender = () => {
		controls.update();

		const time = - performance.now() / 1000;
		for(let i = 0; i < wheels.length; i++){
			wheels[i].rotation.x = time * Math.PI * 2;
		}

		grid.position.z = - time % 1;

		renderer.render(scene, camera);

		stats.update();

		requestAnimationFrame(loopRender);
	};

	const addDemo = () => {
		const geo = new BoxGeometry();
		const material = new MeshBasicMaterial({color:"#0f0"});
		const cube = new Mesh(geo, material);

		scene.add(cube);
	};

	const addCar = () => {
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath("/three/draco/"); // public文件夹下 模型压缩用到的lib

		const gltfLoader = new GLTFLoader();
		gltfLoader.setDRACOLoader(dracoLoader);

		gltfLoader.load("/models/ferrari.glb", (gltf) => {
			const carModel = gltf.scene;

			carModel.scale.set(1.5, 1.5, 1.5);
			const body: any = carModel.getObjectByName("body"); // 在main内
			body.material = new MeshPhysicalMaterial({
				color: 0xff0000,
				metalness: 1.0,
				roughness: 0.5,
				clearcoat: 1.0,
				clearcoatRoughness: 0.03
			});

			const detailMaterial = new MeshStandardMaterial({
				color: 0xffffff,
				metalness: 1.0,
				roughness: 0.5
			});

			(carModel.getObjectByName("rim_fl") as any).material = detailMaterial;
			(carModel.getObjectByName("rim_fr") as any).material = detailMaterial;
			(carModel.getObjectByName("rim_rr") as any).material = detailMaterial;
			(carModel.getObjectByName("rim_rl") as any).material = detailMaterial;
			(carModel.getObjectByName("trim") as any).material = detailMaterial;

			const glassMaterial = new MeshPhysicalMaterial({
				color: 0xffffff,
				metalness: 0.25,
				roughness: 0,
				transmission: 1.0
			});

			(carModel.getObjectByName("glass") as any).material = glassMaterial;

			wheels.push(
				carModel.getObjectByName("wheel_fl"),
				carModel.getObjectByName("wheel_fr"),
				carModel.getObjectByName("wheel_rl"),
				carModel.getObjectByName("wheel_rr"),
			);

			scene.add(carModel);
		});
	};

	const handleResize = () => {
		// 更新相机宽高比
		camera.aspect = window.innerWidth / window.innerHeight;
		// 修改相机矩阵(即摄像机胡视野和渲染画面的范围)
		camera.updateProjectionMatrix();

		// 更新渲染器尺寸
		renderer.setSize(window.innerWidth, window.innerHeight);
		// 设置渲染器的像素比
		renderer!.setPixelRatio(window.devicePixelRatio);
	};

	useEffect(() => {
		init();

		// 等待添加模型
		// addDemo();

		addCar();
		loopRender();

		// 监控窗口变化
		window.addEventListener("resize", handleResize);

		return () => {
			// 组件销毁时清空元素
			const carEle = document.querySelector("#car");
			carEle.innerHTML = "";
			window.removeEventListener("resize", handleResize);
		};
	}, []);


	return(
		<div className={styles.car} id={"car"}></div>
	);
};

export default Car;
