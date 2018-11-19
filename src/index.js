import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import 'lodash';
import { Layout, Icon, Input } from 'antd';
import {LeftNav} from "./leftNav";
import {RightContent} from "./rightContent";
import 'antd/dist/antd.css';
import './todo.css';
const { Header, Sider } = Layout;

class SiderDemo extends Component {
    constructor(){
        super();
        this.state = {
            collapsed: false,
            activeKey: '1',
            panes: []
        };

    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    handlePageChange = (data) => {
        const panes = this.state.panes;
        let flag = true;
        panes.map(pane => {
            if(pane.key.toString() === data.key.toString()){
                flag = false;
            }
        });
        if(!flag) return;
        panes.push(data);
        this.setState({
            panes
        });
    }
    /*左侧标签点击*/
    handleNavClick = (data) => {
        const panes = this.state.panes;
        let flag = true;
        panes.map(pane => {
            if(pane.key.toString() === data.key.toString()){
                flag = false;
                this.setActiveKey(data.key);
            }
        });
        if(!flag) return;
        panes.push(data);
        this.setPanes(panes);
        this.setActiveKey(data.key);
    }
    /*设置当前访问页面*/
    setActiveKey = (key) => {
        this.setState({
            activeKey: key.toString()
        });
    }
    /*设置标签页列表*/
    setPanes = (panes) => {
        this.setState({
            panes
        });
    }
    handleChangePages = (panes,activePage) => {
        this.setState({
            activeKey: activePage.toString(),
            panes
        });
    }
    render() {
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <LeftNav
                        onNavClick={this.handleChangePages}
                        panes={this.state.panes}
                        activeKey={this.state.activeKey}
                    />
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <RightContent
                        onChangeActiveKey={this.setActiveKey}
                        onPageChange={this.handleChangePages}
                        panes={this.state.panes}
                        activeKey={this.state.activeKey}
                    />
                </Layout>
            </Layout>
        );
    }
}
ReactDOM.render(
    <SiderDemo />,
    document.getElementById('root')
);

