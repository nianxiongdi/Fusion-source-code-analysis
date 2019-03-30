

fusion源码分析之CheckboxGroup-04

1. 类型检测使用`prop-types`
```js
      static propTypes = {
        prefix: PropTypes.string,
        rtl: PropTypes.bool,
        /**
         * 自定义类名
         */
        className: PropTypes.string,
        /**
         * 自定义内敛样式
         */
        style: PropTypes.object,
        /**
         * 整体禁用
         */
        disabled: PropTypes.bool,
        /**
         * 可选项列表, 数据项可为 String 或者 Object, 如 `['apple', 'pear', 'orange']` 或者 `[{value: 'apple', label: '苹果',}, {value: 'pear', label: '梨'}, {value: 'orange', label: '橙子'}]`
         */
        dataSource: PropTypes.arrayOf(PropTypes.any)
      }
```

2. defaultProps默认定义的值，会存储到this.props中
```js
   static defaultProps = {
        dataSource: [],
        onChange: () => {
        },
        prefix: 'next-',
        itemDirection: 'hoz',
    }
```

3. 分别传定义传递给子组件类型和数据
```js
    static childContextTypes = {
        onChange: PropTypes.func,
        __group__: PropTypes.bool,
        selectedValue: PropTypes.array,
        disabled: PropTypes.bool
    }

    getChildContext() {
        return {
            __group__: true,
            onChange: this.onChange,
            selectedValue: this.state.value,
            disabled: this.props.disabled
        };
    }

```

4. 构造方法处理
```js
constructor(props) {
        let value = []; // 默认的值
        if ('value' in props) {
            value = props.value;
        } else if ('defaultValue' in props) {
            value = props.defaultValue;
        }
        if (!Array.isArray(value)) {
            if (value === null || value === undefined) {
                value = [];
            } else {
                value = [value];
            }
        }
        this.state = {
            value: [...value],
        };

        this.onChange = this.onChange.bind(this);
    }


     /**
     * 
     * @param {选中checkbox的当前值value} currentValue 
     * @param {SyntheticEvent dom} e 
     */
    onChange(currentValue, e) {
        // console.log(e)
        // console.log(currentValue)
        const { value } = this.state;
        // console.log(value)

        //查找当前元素是否在已经选中的列表中
        const index = value.indexOf(currentValue);

        //对存储选中的state的集合进行展开
        const valTemp = [...value];

        // 若新的元素没有在state集合中，则进行push
        if (index === -1) {
            valTemp.push(currentValue);
        } else {//此操作是在state中删除
            valTemp.splice(index, 1);
        }

     
        // 判断checkbox-group的属性是否含有value
        if (!('value' in this.props)) {
            this.setState({ value: valTemp });
        }
        console.log(this)
        console.log(valTemp)
        // this.props.onChange(valTemp, e);
    }

```

5. 渲染

```js
    render() {
        const { className, style, prefix, disabled, itemDirection } = this.props;

        //技巧  获取用户自定义的属性
        const others = pickOthers(CheckboxGroup.propTypes, this.props);

        // 如果内嵌标签跟dataSource同时存在，以内嵌标签为主
        let children;
         if (this.props.children) { //判断是否有子元素
            console.log('---------+++++ ----')

            children = this.props.children;
        } else {
            /*
            const list = [
                {
                    value: 'apple',
                    label: 'Apple'
                }, {
                    value: 'pear',
                    label: 'Pear'
                }, {
                    value: 'orange',
                    label: 'Orange'
                }
            ];
            */
            //<CheckboxGroup value={this.state.value} dataSource={list} onChange={this.onChange} />
            children = this.props.dataSource.map((item, index) => {
                console.log(item)
                console.log('---------+++++ ----')

                let option = item;
                if (typeof item !== 'object') {//['apple', 'pear', 'orange']
                    option = {
                        label: item,
                        value: item,
                        disabled
                    };
                }
                const checked = this.state.value && this.state.value.indexOf(option.value) > -1;

                return (
                    <Checkbox key={index}
                        value={option.value}
                        checked={checked}
                        disabled={disabled || option.disabled}
                        label={option.label}
                    />
                );
            });
        }

        const cls = classnames({
            [`${prefix}checkbox-group`]: true,
            [`${prefix}checkbox-group-${itemDirection}`]: true,
            [className]: !!className,
            disabled
        });

        return <span {...others} className={cls} style={style}>{children}</span>;
    }
```

 











