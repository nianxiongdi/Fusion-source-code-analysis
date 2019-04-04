let timestamp = Date.now();


/**
 * 生成全局唯一的id
 * @param  {String} [prefix=''] 前缀字符串
 * @return {String}
 *
 * @example
 * guid(); // j7jv509c
 * guid('prefix-'); // prefix-j7jv509d
 */

 function guid(prefix){
    // 这里是为了判断,是否生产有前缀的guid
    prefix = prefix || '';

    return prefix + (timestamp ++).toString(36)
}



console.log( guid() ) // jtvdgs1f

console.log( guid('sqf') ) //前缀 sqfjtvdohmo







