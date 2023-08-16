
export enum Status {
	PENDING = "pending",
	FULFILLED = "fulfilled",
	REJECTED = "rejected"
}

export class CustomPromise {
	state = Status.PENDING;
	value;
	reason;
	fulfilledCallback = [];
	rejectedCallback = [];
	constructor(executor) {

		//
		const resolve = (value) =>{
			if(this.state === Status.PENDING){
				this.state = Status.FULFILLED;
				this.value = value;
				this.fulfilledCallback.map(fn => fn());
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

		//
		try{
			executor(resolve, reject);
		}catch (err) {
			reject(err);
		}

	}

	//
	static resolve(value){
		return new CustomPromise((resolve, reject) => {
			resolve(value);
		});
	}

	//
	static reject(reason){
		return new CustomPromise((resolve, reject) => {
			reject(reason);
		});
	}

	//
	static all(promises){
		return new CustomPromise((resolve, reject) => {
			if(promises.length === 0){
				resolve([]);
			}
			else{
				const result = [];
				for(let i = 0; i < promises.length; i++){
					promises[i].then(data => {
						result[i] = data;
						if(result.length === promises.length){
							resolve(result);
						}
					});
				}
			}
		});
	}
}
