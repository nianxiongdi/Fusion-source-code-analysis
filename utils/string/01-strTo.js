

/**
 * 将字符串转化为驼峰式写法
 * @param  {String} str 例：-webkit-transition
 * @return {String}     例：WebkitTransition
 */
function camelcase (str) {
    if (!/-/.test(str)) {
        return str || '';
    }
    return str.toLowerCase().replace(/-([a-z])/g, ($0, $1) => {//第二个参数,请参考https://blog.csdn.net/qq_30638831/article/details/88917247
        $1.toUpperCase()
    });
}
 
console.log(camelcase('-webkit-transition')) // WebkitTransition









