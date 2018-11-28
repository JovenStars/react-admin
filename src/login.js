import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import './css/login.css';
export class Login extends Component{
    render(){
        return(
            <div className="login-bar">
                <form className="box" id="form">
                    <h1>Login</h1>
                    <label>
                        <span className="f3">用户名</span>
                        <i className="icon-yonghutouxiang iconfont"></i>
                        <input type="text" name="name" data-must="1"/>
                    </label>
                    <label>
                        <span className="f2">密码</span>
                        <i className="icon-suoding iconfont"></i>
                        <input type="password" name="passwd" data-must="1"/>
                    </label>
                    <label>
                        <span className="f3">验证码</span>
                        <i className="icon-dingdanjilu iconfont"></i>
                        <input type="text" className="code" name="code" data-must="1"/>
                        <img className="code-img" src="/auth/code" alt=""/>
                    </label>
                    <div className="fn">
                        <Link to="/manage">
                            <input type="button" className="submit" value="登录"/>
                        </Link>
                        <p>
                            忘记密码？<a href="kavascript: void(0)">点击找回</a>
                        </p>
                    </div>
                </form>
            </div>
        )
    }
}