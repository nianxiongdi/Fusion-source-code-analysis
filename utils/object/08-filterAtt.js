


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

/**
 * 过滤出其它属性
 * @param  {Object|Array} holdProps 过滤的参照对象，最终的结果只保留不在参照对象中的key
 * @param  {Object} props     被过滤的对象
 * @return {Object}           others
 *
 * @example
 * object.pickOthers(FooComponent.propTypes, this.props);
 * object.pickOthers(['className', 'onChange'], this.props);
 */
function pickOthers(holdProps, props) {
    const others = {};
    const isArray = typeOf(holdProps) === 'Array';

    for (const key in props) {
        if (!_isInObj(key, holdProps, isArray)) {
            others[key] = props[key];
        }
    }

    return others;
}



//过滤掉name3
const props = {
    'name1': '逍遥生',
    'name2': '飞剑侠',
    'name3': '逆天魔'
}
holdProps = ['name3']

const filterlist = pickOthers(holdProps, props)
console.log(filterlist) //{ name1: '逍遥生', name2: '飞剑侠' }
 