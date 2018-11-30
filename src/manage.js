import React,{Component} from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Layout, Icon, LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import LeftNav from "./leftNav";
import RightContent from "./rightContent";
import {OverlayVisible} from "./modules/contentTopBar";
import {pages} from './redux/index';
import './css/manage.css';

const { Header } = Layout;
const store = createStore(pages, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
));

export class Manage extends Component {
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
                            <Header style={{ background: '#237ae4', padding: 0, height: '47px', lineHeight: '47px' }}>
                                <Icon
                                    className="trigger"
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                />
                                <OverlayVisible />
                            </Header>
                            <RightContent />
                        </Layout>
                    </Layout>
                </Provider>
            </LocaleProvider>
        );
    }
}

