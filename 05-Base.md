


此文件定义一些属性和方法，让子类去使用，这种设计方法的好处是：抽离出一些方法让，子类的代码看上去不那么臃肿（自己的观点）



1. 类型检测使用`prop-types` - 这是这个的目的，是为了类型规范，若错误会有提示

```js
static propTypes = {
        prefix: PropTypes.string,
        /**
         * 当前值
         */
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        /**
         * 初始化值
         */
        defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        /**
         * 发生改变的时候触发的回调
         * @param {String} value 数据
         * @param {Event} e DOM事件对象
         */
        onChange: PropTypes.func,
}        
```


2. 






