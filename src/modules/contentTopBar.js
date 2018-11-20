import React,{Component} from 'react';
import { Menu, Dropdown, Icon } from 'antd';

export class OverlayVisible extends Component {
    state = {
        visible: false,
    };

    handleMenuClick = (e) => {
        if (e.key === '3') {
            this.setState({ visible: false });
        }
    }

    handleVisibleChange = (flag) => {
        this.setState({ visible: flag });
    }

    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1"><Icon type="info-circle" /> 个人资料</Menu.Item>
                <Menu.Item key="2"><Icon type="edit" /> 修改密码</Menu.Item>
                <Menu.Item key="3"><Icon type="logout" /> 退出</Menu.Item>
            </Menu>
        );
        return (
            <Dropdown overlay={menu}
                      onVisibleChange={this.handleVisibleChange}
                      visible={this.state.visible}
            >
                <a className="ant-dropdown-link" href="#">
                    操作 <Icon type="down" />
                </a>
            </Dropdown>
        );
    }
}