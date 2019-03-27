 

/**
 * 
 *判断key是否在数组或对象中
 */

function typeOf(obj) {
    return Object.prototype.toString.call(obj).replace(/\[object\s|]/g, '');
}

/**
 * 判断是否是数组或类数组对象
 * @param  {*}  obj
 * @return {Boolean}
 *
 * @example
 * isArrayLike([]) === true
 * isArrayLike(arguments) === true
 * isArrayLike(this.props.children) === true
 */
function isArrayLike(obj) {
    const length = !!obj && 'length' in obj && obj.length;
    const type = typeOf(obj);

    return (
        type === 'Array' ||
        length === 0 ||
        (typeof length === 'number' && length > 0 && length - 1 in obj)
    );
}


// @private 判断key是否在数组或对象中
const _isInObj = (key, obj, isArray) =>
    isArray ? obj.indexOf(key) > -1 : key in obj;


const obj = {
    name: 'xiaoyi',
    age: 18,
    sno: '131530202'
}

const key = 'name'

const isArray = isArrayLike(obj)

const isinkey = _isInObj(key, obj, isArray)
console.log(isinkey)