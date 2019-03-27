






//promise 使用1
const promise = new Promise(function(resolve, reject) {

    if (true){
      resolve('success');
    } else {
      reject('error');
    }

});


//promise 使用2
async function req(){
    return '123';
}


/**
 * 判断对象是否是一个promise，即是否可以用.then
 * @param  {*}  obj
 * @return {Boolean}
 */
function isPromise(obj) {

    return (
        !!obj &&
        (typeof obj === 'object' || typeof obj === 'function') &&
        typeof obj.then === 'function'
    );
}


 
 
const flag = isPromise(promise)

console.log(flag)