import React, {useEffect, useRef, useState} from "react";
import styles from "./index.module.scss";
import {Canvas, useLoader} from "@react-three/fiber";
import {OrbitControls, OrthographicCamera, PerspectiveCamera} from "@react-three/drei";
import {
	BufferGeometry, CanvasTexture, DoubleSide,
	FileLoader, Line,
	LineBasicMaterial, Mesh, MeshPhongMaterial, PlaneGeometry,
	Shape, Sprite, SpriteMaterial, Texture, Vector3
} from "three";
import {geoMercator} from "d3-geo";


const ChinaMap:React.FC = () => {
	const geoChange = geoMercator()
			.center([104, 37]) //地图投影方式(用于绘制球形墨卡托投影)
			.scale(9)
			.translate([0, 0]), // 移动地图位置
		shapeData = useLoader(FileLoader, "/china.json"),
		features = JSON.parse(shapeData as any).features;
	const [provinceName, setProvince] = useState(""),
		[pos, setPos] = useState({x:0, y:0});

	// 地图组件
	const Map = ({features}: any) => {
		// 创建文字图片作为纹理(目前纹理有bug)
		const createTexture = (text) => {
			const canvas = document.createElement("canvas"),
				ctx = canvas.getContext("2d"),
				width = text.split("") * 20,
				height = 40;

			canvas.width = width;
			canvas.height = height;

			ctx.fillStyle = "rgba(0, 0, 0, 0)";
			ctx.fillRect(0, 0, width, height);
			ctx.translate(width/2, height/2);

			ctx.font = "20px SimSun, Songti SC";
			ctx.fillStyle = "#333"; // 文字颜色
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";

			ctx.fillText(text, 0, 0);

			return canvas;
		};

		//
		const handleShow = (data) => {
			setProvince(data.object.name);
			setPos({x: data.offsetX, y: data.offsetY});
		};

		return features.map((ele) => {
			const haveName = ele.properties.center != void 0;
			let nameObj = null;

			if(haveName){
				const [x, y] = geoChange(ele.properties.center);
				nameObj = {
					name: ele.properties.name,
					position: [x, -y]
				};
			}

			let coordinates;
			// 数据兼容处理
			if(ele.geometry.type === "Polygon"){
				coordinates = [ele.geometry.coordinates];
			}else{
				coordinates = ele.geometry.coordinates;
			}

			return coordinates.map((multiPolygon, mulIdx) => {
				// 每个地区单独创建一个shape(这样才不会出现图形变形bug)
				const shape = new Shape();
				const linePoints = [];
				multiPolygon.map((polygon) => {
					polygon.map((item, idx) => {
						const [x, y] = geoChange(item);
						linePoints.push(new Vector3(x, -y, 0.05));
						if(!idx){
							shape.moveTo(x, -y);
						}else{
							shape.lineTo(x, -y);
						}
					});
				});

				// 省边界线
				const lineGeo = new BufferGeometry().setFromPoints(linePoints),
					lineMaterial = new LineBasicMaterial({color: "#fff"}),
					line = new Line(lineGeo, lineMaterial);

				return(
					<group position={[0, 0, 0]} key={mulIdx}>
						<primitive object={line} />
						<mesh userData={haveName && {center: nameObj}} name={ele.properties.name} onPointerMove={handleShow}>
							{/*挤压形成对应shape的三维边界*/}
							<extrudeGeometry args={[shape, {depth: -0.1, bevelEnabled:false}]} />
							{/*两个材料重叠形成不同颜色轮廓, 需要attach材料序号*/}
							<meshBasicMaterial attach={"material-1"} color={"#d13a00"} transparent={true} opacity={0.5} />
							<meshBasicMaterial attach={"material-0"} transparent={true} color={"#f00"} opacity={0.9} />
						</mesh>
					</group>
				);
			});
		});



	};


	return (
		<div id={styles.map}>
			<div id={styles.tooltip} style={{left: pos.x, top: pos.y}}>{provinceName}</div>
			<Canvas>
				<PerspectiveCamera
					fov={60} near={10} far={100}
					aspect={window.innerWidth/window.innerHeight}
					position={[0, 0, 200]} />
				<OrbitControls minDistance={1} maxDistance={100} />
				<ambientLight intensity={1} args={["#dedede"]} />
				<axesHelper args={[200]} />

				<Map features={features} />
			</Canvas>

		</div>
	);
};

export default ChinaMap;
