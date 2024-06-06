
export enum Status {
	PENDING = "pending",
	FULFILLED = "fulfilled",
	REJECTED = "rejected"
}

export class CustomPromise {
	state = Status.PENDING; // 初始化Promise的状态
	value; // Promise成功值
	reason; // Promise失败原因
	fulfilledCallback = []; // 成功状态下的回调函数
	rejectedCallback = []; // 失败状态下的回调函数
	constructor(executor) {

		// 定义resolve函数,用于将Promise状态改为FULFILLED,并执行成功状态下的回调函数
		const resolve = (value) =>{
			if(this.state === Status.PENDING){
				this.state = Status.FULFILLED; // 将Promise状态改为FUFILLED
				this.value = value; // 储存Promise成功时的值
				this.fulfilledCallback.map(fn => fn()); // 执行所有状态下的回调函数
			}
		};

		//
		const reject = (reason) => {
			if(this.state === Status.PENDING){
				this.state = Status.REJECTED;
				this.reason = reason;
				this.rejectedCallback.map(fn => fn());
			}
		};

		// 执行executor函数,并传入resolve和reject参数
		try{
			executor(resolve, reject);
		}catch (err) {
			// 捕获错误,并将Promise状态改为REJECTED
			reject(err);
		}

	}

	// 用于在Promise的成功和失败状态下执行回调函数，返回一个新的promise实例
	then(fulfilled, rejected){
		// 如果fulfilled不是函数,则将其更改为返回 接收到的值 的函数
		if(typeof fulfilled !== "function"){
			fulfilled = function (value) {
				return value;
			};
		}
		// 如果rejected不是函数,则将其更改为抛出 接收到的原因 的函数
		if(typeof rejected !== "function"){
			rejected = function (reason) {
				throw reason;
			};
		}

		const promise = new CustomPromise((resolve, reject) => {
			switch (this.state) {
			// 如果Promise的当前状态为PENDING,则将回调函数添加到对应的回调数组中
			case Status.PENDING:
				this.fulfilledCallback.push(() => {
					setTimeout(() => {
						try {
							const value = fulfilled(this.value);
							resolve(value);
						}catch (err) {
							reject(err);
						}
					}, 0);
				});

				this.rejectedCallback.push(() => {
					setTimeout(() => {
						try {
							const value = rejected(this.reason);
							resolve(value);
						}catch (err) {
							reject(err);
						}
					}, 0);
				});
				break;
			// 如果Promise当前的状态是FULFILLED,则直接执行成功回调函数
			case Status.FULFILLED:
				setTimeout(() => {
					try{
						const value = fulfilled(this.value);
						resolve(value);
					} catch (err) {
						reject(err);
					}
				}, 0);
				break;
			// 如果Promise当前的状态是REJECTED,则直接执行失败回调函数
			case Status.REJECTED:
				setTimeout(() => {
					try{
						const value = rejected(this.reason);
						resolve(value);
					}catch (err) {
						reject(err);
					}
				}, 0);
				break;
			}
		});

		return  promise;
	}

	// 捕获Promise的失败状态, 并执行回调函数
	catch(rejected){
		return this.then(null, rejected);
	}

	// 无论Promise是失败还是成功,都会执行
	finally(fn){
		return this.then(data => {
			fn();
			return data;
		},
		err => {
			fn();
			throw err;
		});
	}

	// 静态resolve,返回一个状态为FULFILLED的Promise实例
	static resolve(value){
		return new CustomPromise((resolve, reject) => {
			resolve(value);
		});
	}

	// 静态reject,返回一个状态为REJECTED的Promise实例
	static reject(reason){
		return new CustomPromise((resolve, reject) => {
			reject(reason);
		});
	}

	// 静态方法all,接收一个包含多个Promise实例的数组,返回一个新的Promise实例
	// 只要有一个失败，则新实例的状态立马变为失败
	static all(promises){
		return new CustomPromise((resolve, reject) => {
			if(promises.length === 0){
				resolve([]); // 如果传入空数组,则直接返回FULFILLED（因为是resolve执行）
			}
			else{
				const result = [];
				for(let i = 0; i < promises.length; i++){
					promises[i].then(data => {
						result[i] = data;
						if(result.length === promises.length){
							resolve(result);
						}
					},
					err => {
						reject(err);
						return;
					});
				}
			}
		});
	}

	// 静态方法race,只要有一个执行完成(不管是成功还是失败)
	static race(promises){
		return new CustomPromise((resolve, reject) => {
			if(promises.length === 0){
				resolve();
			}
			else{
				for(let i = 0; i < promises.length; i++){
					promises[i].then(
						data => {
							resolve(data);
						},
						err => {
							reject(err);
							return;
						}
					);
				}
			}
		});
	}

	//
	static any(promises){
		return new CustomPromise((resolve, reject) => {
			if(promises.length === 0){
				reject();
			}
			else{
				const result = [];
				for(let i = 0; i < promises.length; i++){
					promises[i].then(
						data => {
							resolve(data);
						},
						err => {
							result[i] = err;
							if(result.length === promises.length){
								reject(result);
								return;
							}
						}
					);
				}
			}
		});
	}
}
