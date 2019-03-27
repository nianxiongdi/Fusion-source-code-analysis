





/**
 * 过滤出带prefix的属性
 * @param  {Object} holdProps 过滤的参照对象，最终的结果只保留不在参照对象中的key
 * @param  {string} prefix    包含的字符串
 * @return {Object}           others
 *
 * @example
 * object.pickAttrsWith(FooComponent.propTypes, 'data-');
 */
function pickAttrsWith(holdProps, prefix) {
    const others = {};

    for (const key in holdProps) {
        if (key.match(prefix)) {
            others[key] = holdProps[key];
        }
    }

    return others;
}



//过滤掉name3
const holdProps = {
    'name1': '逍遥生',
    'name2': '飞剑侠',
    'name3': '逆天魔',
    'd': '大话西游2'
}
const prefix = 'name'

const filter = pickAttrsWith(holdProps, prefix)

console.log(filter) //{ name1: '逍遥生', name2: '飞剑侠', name3: '逆天魔' }