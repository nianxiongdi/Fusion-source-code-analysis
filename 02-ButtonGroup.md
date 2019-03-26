
fusion源码分析之ButtonGroup-02


1. 类型检测使用`prop-types`
```js
       static propTypes = {
        rtl: PropTypes.bool,
        prefix: PropTypes.string,
        /**
         * 统一设置 Button 组件的按钮大小
         */
        size: PropTypes.string,
        className: PropTypes.string,
        children: PropTypes.node,
    };
```

2. defaultProps默认定义的值，会存储到this.props中
```js
  static defaultProps = {
        prefix: 'next-',
        size: 'medium',
    };
   console.log(this.props)
```


3. 渲染，这里的操作比较复杂：
    * 先通过this.props获取用户所传的属性
    ```js
        const {
            prefix,
            className,
            size,
            children,
            rtl,
            ...others
        } = this.props;
    ```

    * 获取所有的class的name列表
    ```js
     const groupCls = classNames({
            [`${prefix}btn-group`]: true,
            [className]: className,
        });
    ```

    * 如果存在子元素，直接创建并返回
    ```js
       const cloneChildren = Children.map(children, child => {
            if (child) {
                return React.cloneElement(child, {
                    size: size,
                });
            }
        });
    ```

    * 最后一步，进行渲染
    ```html
        <div {...others} className={groupCls}>
            {cloneChildren}
        </div>
    ```

