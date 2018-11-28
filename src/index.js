import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Manage } from './manage';
import { Login } from './login';
import 'antd/dist/antd.css';
import './css/home.css';

class Homepage extends Component{
    render(){
        return(
            <Router>
                <Route component={ModalSwitch} />
            </Router>
        );
    }
}
class ModalSwitch extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/manage" component={Manage} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Manage} />
            </Switch>
        );
    }
}
function Home(){
    return(
        <div className="home">
            <div className="btns">
                <Link to="/login">登录</Link>
                <Link to="/register">注册</Link>
            </div>
            <img src="./images/home.png" alt=""/>
        </div>
    )
}


ReactDOM.render(
    <Homepage />,
    document.getElementById('root')
);

