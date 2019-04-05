## 助你完全理解React高阶组件（Higher-Order Components）


### 高阶组件定义

a higher-order component is a function that takes a component and returns a new component.

翻译：高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件。

### 函数模拟高阶组件

我们通过普通函数来理解什么是高阶组件哦~

1. 最普通的方法，一个welcome，一个goodbye。两个函数先从localStorage读取了username，然后对username做了一些处理。

```js
function welcome() {
    let username = localStorage.getItem('username');
    console.log('welcome ' + username);
}

function goodbey() {
    let username = localStorage.getItem('username');
    console.log('goodbey ' + username);
}

welcome();
goodbey();
```
2. 我们发现两个函数有一句代码是一样的，这叫冗余唉。不好不好~（你可以把那一句代码理解成平时的一大堆代码）

我们要写一个中间函数，读取username,他来负责把username传递给两个函数。
```js
function welcome(username) {
    console.log('welcome ' + username);
}

function goodbey(username) {
    console.log('goodbey ' + username);
}

function wrapWithUsername(wrappedFunc) {
    let newFunc = () => {
        let username = localStorage.getItem('username');
        wrappedFunc(username);
    };
    return newFunc;
}

welcome = wrapWithUsername(welcome);
goodbey = wrapWithUsername(goodbey);

welcome();
goodbey();
```


好了，我们里面的wrapWithUsername函数就是一个“高阶函数”。
他做了什么？他帮我们处理了username，传递给目标函数。我们调用最终的函数welcome的时候，根本不用关心username是怎么来的。

我们增加个用户study函数。

```js
function study(username){
    console.log(username+' study');
}
study = wrapWithUsername(study);

study();
```

这里你是不是理解了为什么说wrapWithUsername是高阶函数？我们只需要知道，用wrapWithUsername包装我们的study函数后，study函数第一个参数是username。

我们写平时写代码的时候，不用关心wrapWithUsername内部是如何实现的。

### 高阶组件

`高阶组件就是一个没有副作用的纯函数。`

我们把上一节的函数统统改成react组件。

1.最普通的组件哦。
welcome函数转为react组件。
```js

import React, {Component} from 'react'

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    componentWillMount() {
        let username = localStorage.getItem('username');
        this.setState({
            username: username
        })
    }

    render() {
        return (
            <div>welcome {this.state.username}</div>
        )
    }
}

export default Welcome;

```

`goodbey`函数转为`react组件`。

```js
import React, {Component} from 'react'

class Goodbye extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    componentWillMount() {
        let username = localStorage.getItem('username');
        this.setState({
            username: username
        })
    }

    render() {
        return (
            <div>goodbye {this.state.username}</div>
        )
    }
}

export default Goodbye;
```

2.现在你是不是更能看到问题所在了？两个组件大部分代码都是重复的唉。

按照上一节wrapWithUsername函数的思路，我们来写一个高阶组件(`高阶组件就是一个函数`，且该函数`接受一个组件作为参数`，`并返回一个新的组件`)。

```js
import React, {Component} from 'react'

export default (WrappedComponent) => {
    class NewComponent extends Component {
        constructor() {
            super();
            this.state = {
                username: ''
            }
        }

        componentWillMount() {
            let username = localStorage.getItem('username');
            this.setState({
                username: username
            })
        }

        render() {
            return <WrappedComponent username={this.state.username}/>
        }
    }

    return NewComponent
}
```
这样我们就能简化Welcome组件和Goodbye组件。

```js
import React, {Component} from 'react';
import wrapWithUsername from 'wrapWithUsername';

class Welcome extends Component {

    render() {
        return (
            <div>welcome {this.props.username}</div>
        )
    }
}

Welcome = wrapWithUsername(Welcome);

export default Welcome;
```

```js
import React, {Component} from 'react';
import wrapWithUsername from 'wrapWithUsername';

class Goodbye extends Component {

    render() {
        return (
            <div>goodbye {this.props.username}</div>
        )
    }
}

Goodbye = wrapWithUsername(Goodbye);

export default Goodbye;
```

看到没有，高阶组件就是把username通过props传递给目标组件了。目标组件只管从props里面拿来用就好了。

到这里位置，高阶组件就讲完了。你再返回去理解下定义，是不是豁然开朗~

你现在理解react-redux的connect函数~

### 完整例子
```js
import ReactDOM from 'react-dom';
import React, {Component} from 'react'

 const wrapWithUsername = (WrappedComponent) => {
    class NewComponent extends Component {
        constructor() {
            super();
            this.state = {
                username: ''
            }
        }

        componentWillMount() {
            // let username = localStorage.getItem('username');
            let username = '123'
            this.setState({
                username: username
            })
        }

        render() {
            return <WrappedComponent username={this.state.username}/>
        }
    }

    return NewComponent
}

class Welcome extends Component {

  render() {
      return (
          <div>welcome {this.props.username}</div>
      )
  }
}

class Goodbye extends Component {

  render() {
      return (
          <div>goodbye {this.props.username}</div>
      )
  }
}

Welcome = wrapWithUsername(Welcome);
Goodbye = wrapWithUsername(Goodbye);


ReactDOM.render(
  <div>
    <Welcome  />
    <Goodbye  />
  </div>,
    document.getElementById('root')
)
```

把redux的state和action创建函数，通过props注入给了Component。
你在目标组件Component里面可以直接用this.props去调用redux state和action创建函数了。

```js
ConnectedComment = connect(mapStateToProps, mapDispatchToProps)(Component);
```


相当于这样
```js
// connect是一个返回函数的函数（就是个高阶函数）
const enhance = connect(mapStateToProps, mapDispatchToProps);
// 返回的函数就是一个高阶组件，该高阶组件返回一个与Redux store
// 关联起来的新组件
const ConnectedComment = enhance(Component);
```

antd的Form也是一样的

```js
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
```

### 参考

* http://huziketang.com/books/react/lesson28
* https://react.bootcss.com/react/docs/higher-order-components.html
* https://github.com/brickspert/blog/issues/2
