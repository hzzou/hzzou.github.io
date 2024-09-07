import {Canvas, useFrame, useThree} from "@react-three/fiber";
import React, {useRef, useState, forwardRef, ForwardedRef, useEffect} from "react";
import styles from "./index.module.scss";
import {PerspectiveCamera, OrbitControls} from "@react-three/drei";
import {AudioContext, DoubleSide, CanvasTexture, Group, Vector3, Vector2, Raycaster, Quaternion} from "three";


const MagicCube: React.FC = () => {
	const controlRef = useRef(null),
    cameraRef = useRef(null),
		cubeRef = useRef(null),
    isRotate = useRef(false);

	let startPoint =  null, // 转动起始点
    selectedIntersect = null, // 获取射线选中的物体
    normal = null, // 法向量
    raycaster = new Raycaster(),
    isMove = false;

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
    // 转动某一行魔方时禁止控制整体
    controlRef!.current!.enabled = false;
    selectedIntersect = data.intersections[0]; // 只要ray射线选中的第一个物体
    normal = data.normal;
		startPoint = selectedIntersect.point;
	};

  // 移动魔方
  const moveCube = (data)=>{
    selectedIntersect = data.intersections[0];
    if(selectedIntersect && startPoint && !isMove){
      console.log(selectedIntersect);
      const movePoint = selectedIntersect.point;
      const flag = movePoint.x - startPoint.x > 1 || movePoint.x - startPoint.x < -1 || movePoint.y - startPoint.y > 1 || movePoint.y - startPoint.y < -1 || movePoint.z - startPoint.z > 1 || movePoint.z - startPoint.z < -1;

      if(!movePoint.equals(startPoint) && flag){
        isRotate.current = true;
        isMove = true;

        const normal = selectedIntersect.normal; //
        const sub = movePoint.sub(startPoint); //计算转动向量
        //console.log(sub);
        console.log(normal);
        const direction = getDirection(sub, normal); // 获得转动方向
        //console.log(direction);
        const boxArr = getDirectBox(selectedIntersect, direction);
        requestAnimationFrame(()=>rotateAnimation(boxArr, direction));
      }
    }

  }

	// 停止转动
	const stopCube = (data)=>{
    console.log("stop:",data);
    // 停止转动时，清空和还原相关参数
    isMove = false;
    selectedIntersect = null;
    normal = null;
    startPoint = null;
    isRotate.current = false;
    controlRef!.current!.enabled = true;
	};

	// 获得转动方向
	const getDirection = (direct, normal)=>{
		let direction;
		const normalFrontX = new Vector3(1, 0, 0), // x轴正方向
			normalBackX = new Vector3(-1, 0, 0), // x轴负方向
			normalFrontY = new Vector3(0, 1, 0), // y轴正方向
			normalBackY = new Vector3(0, -1, 0), // y轴负方向
			normalFrontZ = new Vector3(0, 0, 1), // z轴正方向
			normalBackZ = new Vector3(0, 0, -1); // z轴负方向

    // 判断差向量和x,y,z轴的夹角
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
			direction = 0;  // 向x轴正方向旋转90度，还要区分是绕z轴还是绕y轴
			// 在此处对特定方块进行旋转
      if(normal.equals(normalFrontY)){
        direction = direction + 0.1; // 绕z轴顺时针
      }
      else if(normal.equals(normalBackY)){
        direction = direction + 0.2; // 绕z轴逆时针
      }
      else if(normal.equals(normalFrontZ)){
        direction = direction + 0.3; // 绕y轴顺时针
      }
      else{
        direction = direction + 0.4; // 绕y轴逆时针
      }
			break;
		case xBackAngle:
			direction = 1; // x轴反方向旋转90度
      if(normal.equals(normalFrontY)){
        direction = direction + 0.1; // 绕z轴顺时针
      }
      else if(normal.equals(normalBackY)){
        direction = direction + 0.2; // 绕z轴逆时针
      }
      else if(normal.equals(normalFrontZ)){
        direction = direction + 0.3; // 绕y轴顺时针
      }
      else{
        direction = direction + 0.4; // 绕y轴逆时针
      }
			break;
		case yFrontAngle:
			direction = 2; // y轴正方向旋转90度
      if(normal.equals(normalFrontZ)){
        direction = direction + 0.1; // 绕x轴顺时针
      }
      else if(normal.equals(normalBackZ)){
        direction = direction + 0.2; // 绕x轴逆时针
      }
      else if(normal.equals(normalFrontX)){
        direction = direction + 0.3; // 绕z轴顺时针
      }
      else{
        direction = direction + 0.4; // 绕z轴逆时针
      }
			break;
		case yBackAngle:
			direction = 3; // y轴反方向旋转90度
      if(normal.equals(normalFrontZ)){
        direction = direction + 0.1; // 绕x轴顺时针
      }
      else if(normal.equals(normalBackZ)){
        direction = direction + 0.2; // 绕x轴逆时针
      }
      else if(normal.equals(normalFrontX)){
        direction = direction + 0.3; // 绕z轴顺时针
      }
      else{
        direction = direction + 0.4; // 绕z轴逆时针
      }
			break;
		case zFrontAngle:
			direction = 4; // z轴正方向旋转90度
      if(normal.equals(normalFrontY)){
        direction = direction + 0.1; // 绕x轴顺时针
      }
      else if(normal.equals(normalBackY)){
        direction = direction + 0.2; // 绕x轴逆时针
      }
      else if(normal.equals(normalFrontX)){
        direction = direction + 0.3; // 绕y轴顺时针
      }
      else{
        direction = direction + 0.4; // 绕y轴逆时针
      }
			break;
		case zBackAngle:
			direction = 5; // z轴反方向旋转90度
      if(normal.equals(normalFrontY)){
        direction = direction + 0.1; // 绕x轴顺时针
      }
      else if(normal.equals(normalBackY)){
        direction = direction + 0.2; // 绕x轴逆时针
      }
      else if(normal.equals(normalFrontX)){
        direction = direction + 0.3; // 绕y轴顺时针
      }
      else{
        direction = direction + 0.4; // 绕y轴逆时针
      }
			break;
		default:
			break;
		}

		return direction;
	};

  // 获得那个方向要转动的那些box
  const getDirectBox = (intersect, direct)=>{
    const targetPosition = intersect.object.position;
    let boxArr = [];
    cubeRef.current.children.map(ele=>{
      switch (direct){
        // 绕x轴, 结合targetPosition判断与ele的position的x相同
      case 2.1:
      case 2.2:
      case 3.1:
      case 3.2:
      case 4.1:
      case 4.2:
      case 5.1:
      case 5.2:
        if(targetPosition.x === ele.position.x){
          boxArr.push(ele);
        }
        break;
      // 绕y轴, 结合targetPosition判断与ele的position的y相同
      case 0.3:
      case 0.4:
      case 1.3:
      case 1.4:
      case 4.3:
      case 4.4:
      case 5.3:
      case 5.4:
        if(targetPosition.y === ele.position.y){
          boxArr.push(ele);
        }
        break;
      // 绕z轴, 结合targetPosition判断与ele的position的z相同
      case 0.1:
      case 0.2:
      case 1.1:
      case 1.2:
      case 2.3:
      case 2.4:
      case 3.3:
      case 3.4:
        if(targetPosition.z === ele.position.z){
          boxArr.push(ele);
        }
        break;
      default:
        break;
      }
    });

    return boxArr;
  }

  // 转动动画控制
  const rotateAnimation = (boxs, direct)=>{
    let normal;
    switch (direct){
      // x轴顺时针
    case 2.2:
    case 3.1:
    case 4.1:
    case 5.2:
      normal = new Vector3(1, 0, 0);
      for(let i = 0; i < boxs.length; i++){
        rotateAround(boxs[i], normal, Math.PI/2);
      }
      break;
      // x轴逆时针
    case 2.1:
    case 3.2:
    case 4.2:
    case 5.1:
      normal = new Vector3(1, 0, 0);
      for(let i = 0; i < boxs.length; i++){
        rotateAround(boxs[i], normal, -Math.PI/2);
      }
      break;
      // y轴顺时针
    case 0.4:
    case 1.3:
    case 4.3:
    case 5.4:
      normal = new Vector3(0, 1, 0);
      for(let i = 0; i < boxs.length; i++){
        rotateAround(boxs[i], normal, Math.PI/2);
      }
      break;
      // y轴逆时针
    case 1.4:
    case 0.3:
    case 4.4:
    case 5.3:
      normal = new Vector3(0, 1, 0);
      for(let i = 0; i < boxs.length; i++){
        rotateAround(boxs[i], normal, -Math.PI/2);
      }
      break;
      // z轴顺时针
    case 0.1:
    case 1.2:
    case 2.4:
    case 3.3:
      normal = new Vector3(0, 0, 1);
      for(let i = 0; i < boxs.length; i++){
        rotateAround(boxs[i], normal, Math.PI/2);
      }
      break;
      // z轴逆时针
    case 0.2:
    case 1.1:
    case 2.3:
    case 3.4:
      normal = new Vector3(0, 0, 1);
      for(let i = 0; i < boxs.length; i++){
        rotateAround(boxs[i], normal, -Math.PI/2);
      }
      break;
    default:
      break;
    }

    console.log(normal);

  }

  // 绕
  const rotateAround = (object, normal, radian)=>{
    // const quaternion = new Quaternion();
    // quaternion.setFromAxisAngle(normal, radian);

    // object.quaternion.premultiply(quaternion);
    //object.applyQuaternion(quaternion)

    // 更新小方块坐标
    if(normal.x > 0){
      // const y = object.position.y;
      // const z = object.position.z;
      // object.position.y = Math.cos(radian)*y - Math.sin(radian)*z;
      // object.position.z = Math.cos(radian)*z + Math.sin(radian)*y;
      // object.rotation.x = radian;
      object.rotateX(radian);
    }
    else if(normal.y > 0){
      // const x = object.position.x;
      // const z = object.position.z;
      // object.position.x = Math.cos(radian)*x + Math.sin(radian)*z;
      // object.position.z = Math.cos(radian)*z - Math.sin(radian)*x;
      // object.rotation.y = radian;
      object.rotateY(radian);

    }
    else if(normal.z > 0){
      // const x = object.position.x;
      // const y = object.position.y;
      // object.position.x = Math.cos(radian)*x - Math.sin(radian)*y;
      // object.position.y = Math.cos(radian)*y + Math.sin(radian)*x;
      // object.rotation.z = radian;
      object.rotateZ(radian);
    }

  }

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

			const children = cubeRef!.current!.children;
			// setTimeout(()=>{
			// 	for(let i = 0; i < children.length; i+=3){
			// 		children[i].rotation.y = Math.PI/2;
			// 		children[i+1].rotation.y = Math.PI/2;
			// 		children[i+2].rotation.y = Math.PI/2;
			// 	}
			// }, 1000);


      if(!cubeRef!.current.matrixWorldNeedsUpdate){
        cubeRef!.current.matrixWorldNeedsUpdate = true;
      }
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
            key={i+"_"+j} position={[x,y,z]}>
            {/*args是x,y,z方向的长度*/}
						<boxGeometry args={[2, 2, 2]} />
						{materialArr}
					</mesh>
				);
			}
		}

		return(
			<group
        matrixWorldNeedsUpdate={true}
        onPointerDown={props!.onPointerDown}
        onPointerMove={props!.onPointerMove}
        onPointerUp={props!.onPointerUp}
        ref={ref}>
				{current}
			</group>
		);
	});


	return(
		<div id={styles.magicCube}>
			<Canvas style={{width: window.innerWidth, height: window.innerHeight}}>
				<PerspectiveCamera
          ref={cameraRef}
					fov={45} near={1} far={1000}
					position={[0, 0, 600]}
          up={[0, 1, 0]}
					aspect={window.innerWidth/window.innerHeight} />
				<OrbitControls ref={controlRef} camera={cameraRef!.current} target={[0, 0, 0]} minDistance={10} maxDistance={25} />
				<color attach={"background"} args={["#000"]} />
        {/*坐标辅助,红色x轴，绿色y轴，蓝色z轴*/}
				<axesHelper args={[100]} />
				<ambientLight intensity={1} args={["#fff"]} />
				<Cube onPointerDown={startCube}
              onPointerMove={moveCube}
              onPointerUp={stopCube}
              ref={cubeRef} />
			</Canvas>
		</div>
	);
};

export default MagicCube;
