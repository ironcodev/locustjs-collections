import { isSomeString, isNumber, isString, isDate, isObject, isBool, isArray, isFunction, isPrimitive } from 'locustjs-base';

class List {
	constructor(x, itemType) {
		if (isArray(x)) {
			this._items = [];
			this.type = itemType;
			for (let item of x) {
				this.add(item);
			}
		} else if (x instanceof List) {
			this._items = [];
			this.type = x.type;
			this._items = [...x._items];
		} else {
			this._items = [];
			this.type = x;
		}
	}
	*[Symbol.iterator]() {
		for (let item of this._items) {
			yield item;
		}
	}
	get type() {
		return this._type;
	}
	set type(t) {
		if (this.length > 0) {
			throw `List.type can only be set when the list is empty.`;
		}
		
		if (t == undefined) {
			this._type = undefined;
		} else if (isSomeString(t)) {
			if (t != 'any') {
				this._type = t;
			} else {
				this._type = undefined;
			}
		} else if (isFunction(t)) {
			this._type = t;
		} else {
			throw `List: invalid item type ${t}`
		}
	}
	get length() {
		return this._items.length;
	}
	canAdd(item) {
		let result = true;
		
		if (this.type != undefined) {
			if (isSomeString(this.type)) {
				result = false
							|| (this.type == 'number'		&& isNumber(item))
							|| (this.type == 'string'		&& isString(item))
							|| (this.type == 'date'			&& isDate(item))
							|| (this.type == 'object'		&& isObject(item))
							|| (this.type == 'bool'			&& isBool(item))
							|| (this.type == 'array'		&& isArray(item))
							|| (this.type == 'function'		&& isFunction(item))
							|| (this.type == 'primitive'	&& isPrimitive(item))
							|| (isObject(item) && x.constructor && x.constructor.name == this.type);
			} else {
				result = item instanceof this.type;
			}
		}
		
		return result;
	}
	_throwInvalidItemError() {
		if (isFunction(this.type)) {
			throw `List.add(): invalid item type. expected '${this.type.prototype.constructor.name}'`
		} else {
			throw `List.add(): invalid item type. expected '${this.type}'`
		}
	}
	add(item) {
		if (this.canAdd(item)) {
			this._items.push(item);
		} else {
			this._throwInvalidItemError();
		}
	}
	addAt(item, index) {
		if (this.canAdd(item)) {
			this._items.splice(index, 0, item);
		} else {
			this._throwInvalidItemError();
		}
	}
	insertAt(item, index) {
		return this.addAt(item, index);
	}
	push(item) {
		this.add(item);
	}
	append(item) {
		this.add(item);
	}
	prepend(item) {
		this.addAt(item, 0);
	}
	remove(item) {
		const index = this._items.indexOf(item);
		
		let result;
		
		if (index >= 0) {
			result = this._items.splice(index, 1)[0];
		}
		
		return result;
	}
	removeAt(index) {
		let result;
		
		if (index >= 0 && index < this.length) {
			result = this._items.splice(index, 1)[0];
		} else {
			throw new RangeError(`index out of range: ${index}`);
		}
		
		return result;
	}
	elementAt(index) {
		let result;
		
		if (index >= 0 && index < this.length) {
			result = this._items[index];
		} else {
			throw new RangeError(`index out of range: ${index}`);
		}
		
		return result;
	}
	find(x) {
		if (isFunction(x)) {
			return this._items.find(x, this);
		} else {
			return this._items.find(a => a == x, this);
		}
	}
	first() {
		return this.length > 0 ? this._items[0] : undefined;
	}
	last() {
		return this.length > 0 ? this._items[this.length - 1] : undefined;
	}
	indexOf(x, fromIndex) {
		if (isFunction(x)) {
			let result = -1;
			if (fromIndex == undefined) {
				fromIndex = 0;
			}
			for (let i = fromIndex; i < this.length; i++) {
				if (x(this._items[i], i, this)) {
					result = i;
					break;
				}
			}

			return result;
		} else {
			return this._items.indexOf(x, fromIndex);
		}
	}
	lastIndexOf(x, fromIndex) {
		if (isFunction(x)) {
			let result = -1;
			if (fromIndex == undefined) {
				fromIndex = this.length - 1;
			}
			for (let i = fromIndex; i >= 0; i--) {
				if (x(this._items[i], i, this)) {
					result = i;
					break;
				}
			}

			return result;
		} else {
			return this._items.lastIndexOf(x, fromIndex);
		}
	}
	includes(x, fromIndex) {
		return this.indexOf(x, fromIndex) >= 0;
	}
	exists(x, fromIndex) {
		return this.includes(x, fromIndex);
	}
	contains(x, fromIndex) {
		return this.includes(x, fromIndex);
	}
	reverse() {
		return new List([...this._items].reverse(), this.type);
	}
	filter(fn) {
		return new List(this._items.filter(fn, this), this.type);
	}
	where(fn) {
		return new List(this.filter(fn), this.type);
	}
	select(fn) {
		return new List(this.map(fn), this.type);
	}
	top(n) {
		return new List(this.filter((x, i) => i < n), this.type);
	}
	skip(n) {
		return new List(this.filter((x, i) => i > n), this.type);
	}
	sort(fn) {
		return new List([...this._items].sort(fn), this.type);
	}
	sortBy(fn) {
		return new List([...this._items].sort((a, b) => fn(a) > fn(b) ? 1: -1), this.type);
	}
	orderBy(fn) {
		return this.sortBy(fn);
	}
	orderByDescending(fn) {
		return this.reverse().orderBy(fn);
	}
	forEach(fn) {
		return this._items.forEach(fn, this);
	}
	slice(fromIndex, toIndex) {
		return new List(this._items.slice(fromIndex, toIndex), this.type);
	}
	map(fn) {
		return this._items.map(fn);
	}
	join(x, left, right) {
		if (isString(x)) {
			return this._items.join(x);
		}

		if (isArray(x) || x instanceof List) {
			const result = new List();
			
			return result;
		}
	}
	merge(x, ignoreErrors) {
		if (x instanceof List) {
			if (x.type == this.type) {
				return this._items.concat(x._items);
			} else {
				if (!ignoreErrors) {
					throw `Lists' types are inconsistent. cannot join.`
				}
			}
		} else if (isArray(x)) {
			if (this.type == undefined) {
				return this._items.concat(x);
			} else {
				for (let item of x) {
					if (!ignoreErrors) {
						this.add(item);
					} else {
						if (this.canAdd(item)) {
							this.add(item);
						}
					}
				}
			}
		} else {
			throw `invalid argument. expected list or array.`
		}
	}
	reduce(fn, initValue) {
		return this._items.reduce(fn, initValue);
	}
	all(fn) {
		return this.every(fn);
	}
	every(fn) {
		return this._items.every(fn, this);
	}
	any(fn) {
		return this.some(fn);
	}
	some(fn) {
		return this._items.some(fn, this);
	}
	count(fn) {
		if (fn == undefined) {
			return this.length;
		} else {
			return this._items.filter(fn).length;
		}
	}
	groupBy(fn) {
		let result = new List();

		for (let x of this._items) {
			const key = fn(x);
			let index = result.indexOf(x => x.key == key);

			if (index < 0) {
				result.push({ key: key, items: new List(this.type) });
				index = result.length - 1;
			}

			result.elementAt(index).items.push(x);
		}

		return result;
	}
	leftJoin(x, leftFn, rightFn) {
		// to be implemented
	}
	rightJoin(x, leftFn, rightFn) {
		// to be implemented
	}
	innerJoin(x, leftFn, rightFn) {
		// to be implemented
	}
	union(x, ignoreErrors) {
		return this.merge(x, ignoreErrors);
	}
	intersect(x, ignoreErrors) {
		// to be implemented
	}
	clear() {
		this._items = [];
	}
	toArray() {
		return [...this._items];
	}
	toJson() {
		return JSON.stringify(this._items);
	}
}

export {
	List
}
