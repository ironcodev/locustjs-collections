import { isSomeString, isNumber, isString, isDate, isObject, isBool, isArray, isFunction, isPrimitive } from 'locustjs-base';

class List {
	constructor(itemType) {
		this._items = [];
		this.type = itemType;
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
	add(item) {
		let ok = this.canAdd(item);
		
		if (ok) {
			this._items.push(item);
		} else {
			throw `List.add(): invalid item type. expected ${this.type}`
		}
	}
	push(item) {
		this.add(item);
	}
	append(item) {
		this.add(item);
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
	clear() {
		this._items = [];
	}
	toArray() {
		return [...this._items];
	}
}

export {
	List
}
