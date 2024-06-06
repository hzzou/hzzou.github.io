import {useCallback, useEffect, useMemo, useState} from "react";
import {Controller} from "@react-spring/three";

export function useFib(num){
	const cache = [];
	let count = 0;
	const fnFib = (n) => {
		count++;
		if(cache[n]) return cache[n];
		if(n < 2){
			cache[n] = BigInt(n);
			return n;
		}else{
			const temp = BigInt(fnFib(n - 1) + fnFib(n - 2));
			cache[n] = temp;
			return temp;
		}

	};

	return fnFib(num);
}

type BackendUser = {
	id: number
	name: string
	disabled: boolean
}

type FrontendUser = {
	value: number
	label: string
}


export function transform(users?: BackendUser[]): FrontendUser[] {
	const frontUser: FrontendUser[] = [];

	users.filter(ele=>{
		console.log(ele);
		if(!ele.disabled){
			frontUser.push({
				value: ele.id,
				label: ele.name
			});
		}
	});

	return frontUser;
}


export function getData(getRawData){
	const pro = new Promise((resolve, reject)=>{
		setTimeout(()=>{
			reject("timeout");
		}, 10000);
	});

	return Promise.race([pro, getRawData]);
}



