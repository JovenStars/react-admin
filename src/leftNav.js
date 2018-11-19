import React,{Component} from "react";
import { Menu, Icon } from 'antd';
import './json/navs.json';

const {SubMenu} = Menu;

export class LeftNav extends Component {
    constructor(props) {
        super(props);
        const lists = [{
            name: '首页',
            id: 1,
            href: 'home',
            icon: 'pie-chart'
        },{
            name: 'Option 2',
            id: 2,
            href: 'home',
            icon: 'desktop'
        },{
            name: 'Option 3',
            id: 3,
            href: 'home',
            icon: 'inbox'
        },{
            name: 'Navigation One',
            icon: 'mail',
            id: '101',
            list: [{
                id: 5,
                name: 'Option 5',
                href: "user"
            },{
                id: 6,
                name: 'Option 6',
                href: 'home'
            },{
                id: 7,
                name: 'Option 7',
                href: 'home'
            },{
                id: 8,
                name: 'Option 8',
                href: 'home'
            }]
        },{
            name: 'Navigation Two',
            icon: 'appstore',
            id: '102',
            list: [{
                id: 9,
                name: 'Option 9',
                href: 'home'
            },{
                id: 10,
                name: 'Option 10',
                href: 'home'
            },{
                name: 'Submenu',
                id: '103',
                list: [{
                    id: 11,
                    name: 'Option 11',
                    href: 'home'
                },{
                    id: 12,
                    name: 'Option 12',
                    href: 'home'
                }]
            }]
        }];
        this.state = {
            lists,
            subIdx: 0
        }
        this.subIdx = 0;
    }
    handleClick = (data) =>{
        const panes = this.props.panes;
        const page = data.item.props.content;
        const onclick = this.props.onNavClick;
        let flag = true;
        panes.map(pane => {
            if(pane.key.toString() === page.key.toString()){
                flag = false;
            }
        });
        if(flag){
            import(`./modules/${page.href}`).then(mode=>{
                const Mode = mode.default;
                page.content = <Mode />;
                panes.push(page);
                onclick(panes,data.key);
            })
        }else{
            onclick(panes,data.key);
        }
    }
    setNavs = (lists) => {
        return (
            lists.map((data,i)=>{
                if(data.list && data.list.length>0){
                    return (
                        <SubMenu key={'sub'+data.id} title={<span>{data.icon ? <Icon type={data.icon} /> : ''}<span>{data.name}</span></span>}>
                            {this.setNavs(data.list)}
                        </SubMenu>
                    )
                }else{
                    return (
                        <Menu.Item key={data.id} content={{key: data.id,href: data.href,title: data.name}} >
                            {data.icon ? <Icon type={data.icon} /> : ''}
                            <span>{data.name}</span>
                        </Menu.Item>
                    )
                }
            })
        )
    }
    render(){
        return(
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                onClick={this.handleClick}
            >
                {this.setNavs(this.state.lists)}

            </Menu>
        )
    }
}