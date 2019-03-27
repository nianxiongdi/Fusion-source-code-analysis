/**
 * 是否是一个纯净的对象
 * @param  {*}  obj
 * @return {Boolean}
 * @reference https://github.com/jonschlinkert/is-plain-object
 */
export function isPlainObject(obj) {
    if (typeOf(obj) !== 'Object') {
        return false;
    }

    const ctor = obj.constructor;

    if (typeof ctor !== 'function') {
        return false;
    }

    const prot = ctor.prototype;

    if (typeOf(prot) !== 'Object') {
        return false;
    }

    if (!prot.hasOwnProperty('isPrototypeOf')) {
        return false;
    }

    return true;
}