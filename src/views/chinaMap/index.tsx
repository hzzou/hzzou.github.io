import React from "react";
import styles from "./index.module.scss";
import {Canvas, useLoader} from "@react-three/fiber";
import {OrbitControls, OrthographicCamera, PerspectiveCamera} from "@react-three/drei";
import {
	BufferGeometry,
	FileLoader, Line,
	LineBasicMaterial,
	Shape, Vector3
} from "three";
import {geoMercator} from "d3-geo";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";
import {and} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";


const ChinaMap:React.FC = () => {
	const geoChange = geoMercator()
			.center([104, 37]) //地图投影方式(用于绘制球形墨卡托投影)
			.scale(9)
			.translate([0, 0]), // 移动地图位置
		shapeData = useLoader(FileLoader, "/china.json"),
		features = JSON.parse(shapeData as any).features;

	// 地图组件
	const Map = ({features}: any) => {
		// 创建文字图片作为纹理
		const createTexture = (textArr) => {
			const canvas = document.createElement("canvas"),
				ctx = canvas.getContext("2d");
			canvas.width = window.innerWidth;
			canvas.height =window.innerHeight;

			ctx.font = "20px SimSun, Songti SC";
			ctx.fillStyle = "#333"; // 文字颜色
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";

			textArr.map(ele => ctx.fillText(ele.name, ele.position[0], ele.position[1]));

			return ctx.getImageData(0, 0, canvas.width, canvas.height);
		};
		const nameArr = [];
		const result = features.map((ele) => {
			if(ele.properties.center){
				const [x, y] = geoChange(ele.properties.center);
				nameArr.push({
					name: ele.properties.name,
					position: [x, -y]
				});
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

						<mesh>
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
		console.log(nameArr);

		const texture = createTexture(nameArr);
		// console.log(texture);
		// for(let i = 3; i < 100; i+=4){
		// 	// console.log(texture.data[i]);
		// 	texture.data[i] = 0;
		// }

		return (
			<>
				{result}
			</>
		);
	};


	return (
		<div id={styles.map}>
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
