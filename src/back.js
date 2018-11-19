import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
//import Select from './select.js';

class Comment extends React.Component {
    render(){
        return (
            <div className="Comment">
                <div className="UserInfo">
                    <img className="Avatar"
                         src={this.props.author.avatarUrl}
                         alt={this.props.author.name}
                    />
                    <div className="UserInfo-name">
                        {this.props.author.name}
                    </div>
                </div>
                <div className="Comment-text">
                    {this.props.text}
                </div>
            </div>
        );
    }
}
class Clock extends React.Component {
    constructor(){
        super();
        this.state = {
            time: new Date().getTime()
        }
    }
    componentDidMount(){
        this.getNow();
    }
    componentWillUnmount(){
        clearInterval(this.getNow);
    }
    getNow(){
        setInterval(()=>{
            this.setState({
                time: new Date().getTime()
            });
        },1000)
    }
    render(){
        return(
            <div>{this.state.time}</div>
        )
    }
}
function Blog(props) {
    const sidebar = (
        <ul>
            {props.posts.map((post) =>
                <li key={post.id}>
                    {post.title}
                </li>
            )}
        </ul>
    );
    const content = props.posts.map((post) =>
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    );
    return (
        <div>
            {sidebar}
            <hr />
            {content}
        </div>
    );
}

const posts = [
    {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
const sexList = [
    {name: '男',value: 1},
    {name: '女',value: 2},
];

const list2 = [
    {name: '男',value: 1},
    {name: '女',value: 2},
];
class Select extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value
        };
    }
    options() {
        /*this.props.list.map((item)=>
            <option value={item.value}>{item.name}</option>
        )*/
        return (<option value="">1</option>)
    }
    handleChange(event){
        this.props.onSelectChange(event.target.name,event.target.value);
    }
    render(){
        return(
            <select name={this.props.name} value={this.props.value} onChange={this.handleChange.bind(this)}>
                {this.props.list.map((item)=>
                    <option value={item.value} key={item.value}>{item.name}</option>
                )}
            </select>
        )
    }
}
class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                name: '',
                sex: 1
            },
            value: ''
        };
    }

    setValue(name,value){
        let data = this.state.formData;
        data[name] = value;
        this.setState({
            formData: data
        });
    }
    handleChange(event) {
        this.setValue(event.target.name,event.target.value)
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.formData.sex);
        event.preventDefault();
    }
    handleChangeSelect(name,value){
        let data = this.state.formData;
        data[name] = value;
        this.setState({
            formData: data
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <label>
                    Name:
                    <input type="text" name="name" value={this.state.formData.name} onChange={this.handleChange.bind(this)} />
                </label>
                <label>
                    Sex:
                    <Select list={sexList} name="sex" value={this.state.formData.sex} onSelectChange={this.handleChangeSelect.bind(this)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

/**/
const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature}
                       onChange={this.handleChange} />
            </fieldset>
        );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature: '', scale: 'c'};
    }

    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange} />
                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange} />
                <BoilingVerdict
                    celsius={parseFloat(celsius)} />
            </div>
        );
    }
}

class LeftNav extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            navList: [{
                name: '主页',
                href: '',
                id: 0,
                list:[]
            },{
                name: '标题一',
                href: '',
                id: 1,
                list: [{
                    name: '内容1',
                    href: '',
                    id: 2
                },{
                    name: '内容2',
                    href: '',
                    id: 3
                }]
            },{
                name: '标题二',
                href: '',
                id: 4,
                list: [{
                    name: '内容1',
                    href: '',
                    id: 5
                },{
                    name: '内容2',
                    href: '',
                    id: 6
                }]
            }]
        };
    }
    cList(item){
        return (
            <dd href={item.href}>{item.name}</dd>
        )
    }
    ddHeight(item){
        return {
            height: item.list.length*29
        }
    }
    handleDtClick(){

    }
    listNav(item){
        return (
            <dl>
                <dt onClick={this.handleDtClick.bind(this)}>{item.name}</dt>
                <dd style={this.ddHeight(item)}>
                    {item.list.map(list =>
                        <a href="javascript:void(0)" data-href={list.href} key={list.id}>{list.name}</a>
                    )}
                </dd>
            </dl>
        );
    }
    render() {
        return (
            <nav className="left-nav">
                {this.state.navList.map(list=>
                    <dl key={list.id}>
                        {this.listNav(list)}
                    </dl>
                )}
            </nav>
        )
    }
}
class RightContent extends React.Component {
    render(){
        return(
            <div className="pages">
                <nav className="page-nav" id="pageNav">
                    <a href="javascript:void(0)" className="active">首页</a>
                </nav>
                <div id="main">
                    <div className="item">
                    </div>
                </div>
            </div>
        )
    }
}

class BackMain extends React.Component {
    header() {
        return(
            <header>
                <h1>后台系统</h1>
                <ul className="row-list">
                    <li>admin</li>
                    <li>修改密码</li>
                    <li>退出</li>
                </ul>
            </header>
        )
    }
    render() {
        return (
            <div>
                {this.header()}
                <div className="content">
                    <LeftNav />
                    <RightContent />
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <BackMain />,
    document.getElementById('root')
);

