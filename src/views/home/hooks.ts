import {useCallback, useEffect, useMemo, useState} from "react";

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

