import React, {ForwardedRef, forwardRef} from "react";
import {BufferGeometry, Color, Group, Line, LineBasicMaterial, Shape, Vector3} from "three";
import {geoMercator} from "d3-geo";
import emitter from "@/utils/eventBus";

// props接口
interface mapInter {
	features: Array<any>
}


// 地图组件
// 想拿自定义函数组件的ref,需要forwardRef包裹
const Map = forwardRef((props: mapInter, ref:ForwardedRef<Group>) => {
	const {features} = props;
	const geoChange = geoMercator()
		.center([104, 37]) //地图投影方式(用于绘制球形墨卡托投影)
		.scale(9)
		.translate([0, 0]); // 移动地图位置

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

	// html方式显示名称
	const handleShow = (data) => {
		data.object.material[0].color = new Color("#ff0"); // 需转换
		emitter.emit("handleShow", data);
	};

	const handleCancel = (data) => {
		data.object.material[0].color = new Color("#f00"); // 需转换
		emitter.emit("handleCancel");
	};

	const result = features.map((ele) => {
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
					linePoints.push(new Vector3(x, -y, 0.01));
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
				<group key={mulIdx}>
					<primitive object={line} />
					<mesh
						userData={haveName && {center: nameObj}}
						name={ele.properties.name}
						onPointerOut={handleCancel}
						onPointerEnter={handleShow}>
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


	return(
		<group position={[0, 0, 0]} ref={ref}>
			{result}
		</group>
	);
});

export default Map;
