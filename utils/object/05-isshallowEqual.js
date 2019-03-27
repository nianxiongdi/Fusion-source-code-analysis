



/**
 * 对象浅比较 是否相等
 * @param  {Object} objA
 * @param  {Object} objB
 * @param  {Function}  [compare] 手动调用方法比较
 * @return {Boolean}      对象浅比较是否相等
 *
 * @example
 * object.shallowEqual({a: 100}, {a: 100}); // true
 */
function shallowEqual(objA, objB, compare) {

    if (objA === objB) {
        return true;
    }

    // 其中一个不是object，则不相等
    // 原始代码写的是!objA 我感觉不对，我修改为!!objA 
    if (!!objA || !!objB || typeof objA + typeof objB !== 'objectobject') {
        return false;
    }

    const keyA = Object.keys(objA);
    const keyB = Object.keys(objB);
    const len = keyA.length;

    // key 数量不一致则不相等
    if (len !== keyB.length) {
        return false;
    }
 

    const hasCallback = typeof compare === 'function';

    //进行判断对象的属性是否相等
    for (let i = 0; i < len; i++) {
        const key = keyA[i];
        console.log(key)
        if (!Object.prototype.hasOwnProperty.call(objB, key)) {
            return false;
        }

        const valA = objA[key];
        const valB = objB[key];

        const ret = hasCallback ? compare(valA, valB, key) : void 0;
        console.log( ret )
        if (ret === false || (ret === void 0 && valA !== valB)) {
            return false;
        }
    }

    return true;
}



shallowEqual({name:'123',lis:[1,2,3]},{name:'123',lis:[1,2,3]})