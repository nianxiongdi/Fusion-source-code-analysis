
fusion源码分析之Checkbox-03


1. 类型检测使用`prop-types`,这些属性都是控制样式或节点等
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
        defaultChecked: false,
        defaultIndeterminate: false,
        onChange: noop,
        onMouseEnter: noop,
        onMouseLeave: noop,
        prefix: 'next-',
    };

   console.log(this.props)
```

3. 从上级定义一些元素,存在在context中
```js
static contextTypes = {
    onChange: PropTypes.func,
    __group__: PropTypes.bool,
    selectedValue: PropTypes.array,
    disabled: PropTypes.bool,
    prefix: PropTypes.string,
};
```

4. 构造函数初始化

    * (props, context) // context 这个是存储数据的,与contextTypes有关,具体可以参照官网
    * let checked, indeterminate; //定义选中状态和中间状态
    * 判断属性存在checked属性，若不存在则默认添加为false
    ```js
     if ('checked' in props) {
        checked = props.checked;
    } else {
        checked = props.defaultChecked;
    }
    ```
    * 中间状态
    ```js
    if ('indeterminate' in props) {
        indeterminate = props.indeterminate;
    } else {
        indeterminate = props.defaultIndeterminate;
    }
    ```
    * 先判断是否在checkbox-group,是否处于选中状态的判断
    ```js
    this.state = {
        checked,
        indeterminate,
    };
    ```
    * disabled 状态的判断
    ```js
    this.disabled =
        props.disabled ||
        (context.__group__ && 'disabled' in context && context.disabled);
    ```
    * 绑定
    ```
      this.onChange = this.onChange.bind(this);
    ```

5. componentWillReceiveProps 判断子组件参数的变化
```js
// 当上级组件的信息改变时，会传入改变后的 props和context
    componentWillReceiveProps(nextProps, nextContext) {
        // console.log(nextProps.value)

        //先判断是checkbox-group还是单个checkbox
        if (nextContext.__group__) {  // group的处理
            if ('selectedValue' in nextContext) { //是否存在selectedValue属性
                this.setState({
                    checked: isChecked( // 判断当前值 是否处于选中状态， 如是返回true 否则返回false  selectedValue已经选择值的集合
                        nextContext.selectedValue,
                        nextProps.value
                    ),
                });
            }

            //是否可点击的判断
            this.disabled =
                nextProps.disabled ||
                ('disabled' in nextContext && nextContext.disabled);
        } else {
            if ('checked' in nextProps) {
                this.setState({
                    checked: nextProps.checked,
                });
            }
            if ('indeterminate' in nextProps) {
                this.setState({
                    indeterminate: nextProps.indeterminate,
                });
            }
            this.disabled = nextProps.disabled;
        }
    }

```

6. shouldComponentUpdate
```js
 shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { shallowEqual } = obj;
        return (
            !shallowEqual(this.props, nextProps) ||
            !shallowEqual(this.state, nextState) ||
            !shallowEqual(this.context, nextContext)
        );
    }
```


7. 渲染
```js
render() {
        /* eslint-disable no-unused-vars */
        //判断用户传递那些参数
        const {
            id,
            className,
            children,
            style,
            label,
            onMouseEnter,
            onMouseLeave,
            rtl,
            ...otherProps
        } = this.props;

        // 判断是true 还是false
        const checked = !!this.state.checked;

        //disable 状态
        const disabled = this.disabled;

        //中间状态 状态
        const indeterminate = !!this.state.indeterminate;
        console.log(this.context)

        // this.context.prefix  上级是否传递 prefix
        // 若没有默认为自己的prefix
        //思想很好～
        const prefix = this.context.prefix || this.props.prefix;
        // console.log(Checkbox.propTypes)
        // console.log('---------')

        // 筛选出 propTypes以外的属性  <Checkbox value="react">React</Checkbox>  若是这样就是value:
        const others = obj.pickOthers(Checkbox.propTypes, otherProps);
        console.log(children)
        console.log('[[[[[[[[[[[')

        //筛选出以data-开头的属性
        const othersData = obj.pickAttrsWith(others, 'data-');

        //传值
        let childInput = (
            <input
                {...obj.pickOthers(Checkbox.propTypes, otherProps)}
                id={id}
                disabled={disabled}
                checked={checked}
                type="checkbox"
                onChange={this.onChange}
                aria-checked={indeterminate ? 'mixed' : checked}
                className={`${prefix}checkbox-input`}
            />
        );
 
        // disable 无状态操作
        if (!disabled) {
            childInput = this.getStateElement(childInput);
        }
        const cls = classnames({
            [`${prefix}checkbox-wrapper`]: true,
            [className]: !!className,
            checked,
            disabled,
            indeterminate,
            [this.getStateClassName()]: true,
        });
        const labelCls = `${prefix}checkbox-label`;
        const type = indeterminate ? 'semi-select' : 'select';

        return (
            <label
                {...othersData}
                className={cls}
                style={style}
                dir={rtl ? 'rtl' : undefined}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span className={`${prefix}checkbox`}>
                    <span className={`${prefix}checkbox-inner`}>
                        <Icon
                            type={type}
                            size="xs"
                            className={indeterminate ? 'zoomIn' : ''}
                        />
                    </span>
                    {childInput}
                </span>
                {[label, children].map((item, i) =>
                    item ? (
                        <span key={i} className={labelCls}>
                            {item}
                        </span>
                    ) : null
                )}
            </label>
        );
    }
```
 