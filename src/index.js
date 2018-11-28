import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Layout, Icon, Avatar, LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import LeftNav from "./leftNav";
import RightContent from "./rightContent";
import {OverlayVisible} from "./modules/contentTopBar";
import {pages} from './redux/index';
import 'antd/dist/antd.css';
import './todo.css';

const { Header, Sider } = Layout;
const store = createStore(pages, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : ()=>{}
));

class SiderDemo extends Component {
    constructor(){
        super();
        this.state = {
            collapsed: false
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        return (
            <LocaleProvider locale={zh_CN}>
                <Provider store={store}>
                    <Layout>
                        <LeftNav collapsed={this.state.collapsed} />
                        <Layout>
                            <Header style={{ background: '#fff', padding: 0 }}>
                                <Icon
                                    className="trigger"
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                />
                                <div className="top-bar">
                                    <Avatar icon="user" />
                                    <OverlayVisible />
                                </div>
                            </Header>
                            <RightContent />
                        </Layout>
                    </Layout>
                </Provider>
            </LocaleProvider>
        );
    }
}
ReactDOM.render(
    <SiderDemo />,
    document.getElementById('root')
);

