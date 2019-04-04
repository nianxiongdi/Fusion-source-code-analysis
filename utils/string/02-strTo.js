
/**
 * 将驼峰式字符串转化为连字符写法
 * @param  {String} str 例：WebkitTransition
 * @return {String}     例：-webkit-transition
 */
function hyphenate (str) {
    return str.replace(/([A-Z])/g, $0 => `-${$0.toLowerCase()}`);
}


console.log( hyphenate('WebkitTransition') ) //-webkit-transition