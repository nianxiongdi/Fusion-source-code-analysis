
fusion源码分析之button-01


1. 类型检测使用`prop-types`
```js
    PropTypes.string  - string
    PropTypes.bool - boolean       
    PropTypes.oneOf(['primary', 'secondary', 'normal']) - 只能取这三个值的其中一个
    PropTypes.func - function
    children: PropTypes.node,- dom节点类型
```

2. defaultProps默认定义的值，会存储到this.props中
```js
  static defaultProps = {
        prefix: 'next-',
        type: 'normal',
    }; 
   console.log(this.props)
```


3. 渲染，这里的操作比较复杂：
    * 先通过this.props获取用户所传的属性
    ```js
        const {  //当用户没有传的属性，为当前的默认值
            prefix,
            className,
            type,
            size,
            htmlType,
            loading,
            text,
            warning,
            ghost,
            component,
            iconSize,
            children,
            rtl,
            ...others   // 666   要是非规定参数，也是所说的通过非组件API透传DOM
        } = this.props;
    ```


    * 判断按钮是否为幽灵按钮
    ```js
        const ghostType =
        ['light', 'dark'].indexOf(ghost) >= 0 ? ghost : 'dark';
    ```
    
    * 获取所有的class的name列表
    ```js
     const btnCls = classNames({
            [`${prefix}btn`]: true,
            [`${prefix}${size}`]: size,
            [`${prefix}btn-${type}`]: type && !ghost,
            [`${prefix}btn-text`]: text,
            [`${prefix}btn-warning`]: warning,
            [`${prefix}btn-loading`]: loading,
            [`${prefix}btn-ghost`]: ghost,
            [`${prefix}btn-${ghostType}`]: ghost,
            [className]: className, // 666
        });
    ```

    * 统计Button的子元素个数
    ```js
        const count = Children.count(children);
    ```

    * 判断是否为icon, 如果是进行提取className，以列表的形式返回，并创建新的元素并返回，若不是icon组件，则根据开发者所填写的原样的输出。
    ```js
     const clonedChildren = Children.map(children, (child, index) => {
            if (
                child &&
                typeof child.type === 'function' &&
                child.type._typeMark === 'icon'
            ) {
                const iconCls = classNames({
                    [`${prefix}btn-icon`]: !iconSize, // 如果用户没有传 iconSize，则使用该样式标记 icon 为 button 预设尺寸
                    [`${prefix}icon-first`]: count > 1 && index === 0,
                    [`${prefix}icon-last`]: count > 1 && index === count - 1,
                    [`${prefix}icon-alone`]: count === 1,
                    [child.props.className]: !!child.props.className,
                });
                return React.cloneElement(child, {
                    className: iconCls,
                    size: iconSize || mapIconSize(size),
                });
            }

            return child;
        });
    ```


    * 这里获取用户传过来的是`button`,还是`a`，默认为`button`
    ```js
        const TagName = component; //button
        const tagAttrs = {  //获取用户所传的所有的参数
            ...others,
            type: htmlType,
            className: btnCls,
        };
    ```

    * 若是a标签，则进行删除，tagAttrs对象中的type，若是disabled，则应该产出按钮的onClick
    ```js
        tagAttrs.href && delete tagAttrs.href;  //用法，a标签情况下，若存在href则删除 666
    ```

    ```js
     if (TagName === 'a') {
            delete tagAttrs.type;

            if (tagAttrs.disabled) {
                delete tagAttrs.onClick; // a 标签的 onClick 浏览器默认不会禁用
                tagAttrs.href && delete tagAttrs.href; // a 标签在禁用状态下无跳转
            }
        }
    ```


    * 最后一步，进行渲染
    ```js
            <TagName
                {...tagAttrs}
                dir={rtl ? 'rtl' : undefined} // 这个属性暂时不知道啥以西
                onMouseUp={this.onMouseUp}  // 鼠标在组件上触发
                ref={this.buttonRefHandler} // dom
                role="button" //添加无障碍
            >
                {clonedChildren}  // 子组件
            </TagName>
    ```

