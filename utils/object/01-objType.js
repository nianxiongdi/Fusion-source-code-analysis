

/**
 * 获取对象的类型
 * @param  {*} obj
 * @return {String}
 *
 * @example
 * typeOf([]) === 'Array'
 * typeOf() === 'Undefined'
 * typeOf(1) === 'Number'
 */
function typeOf(obj) {
    /**
     * Object.prototype 属性表示 Object 的原型对象。
     * Object.prototype.toString()  返回对象的字符串表示。
     * call的返回值都是"[object String]"， 需要解析出来String，用正则进行匹配， /\[object\s|]/g -- g忽略大小写
     */
    return Object.prototype.toString.call(obj).replace(/\[object\s|]/g, '');

}

const obj = {
    name: 'xiaoyi'
}


typeOf(obj) //String








