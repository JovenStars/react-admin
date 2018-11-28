import React,{Component} from "react";
import {Menu, Icon, Layout} from 'antd';
import { connect } from 'react-redux'
import { addPage } from './redux/index';


const {SubMenu} = Menu;
const { Sider } = Layout;
@connect(
    state=> state,
    { addPage }
)
class LeftNav extends Component {
    constructor(props) {
        super(props);
        const lists = [];
        this.state = {
            lists,
            subIdx: 0
        }
    }
    getNavs = () =>{
        fetch('/json/navs.json')
            .then(respones => respones.json() )
            .then(data => {
                    this.setState({lists: data})
                    const d = {
                        key: data[0].id,
                        href: data[0].href,
                        title: data[0].name
                    };
                    this.props.addPage(d);
                }
            )
    }
    handleClick = (data) =>{
        const page = data.item.props.content;
        this.props.addPage(page)
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
    componentDidMount(){
        this.getNavs();
    }
    render(){
        return(
            <Sider
                trigger={null}
                collapsible
                collapsed={this.props.collapsed}
            >
                <div className="logo" />
                <Menu
                    mode="inline"
                    theme="dark"
                    onSelect={this.handleClick}
                    selectedKeys={[this.props.activeKey]}
                >
                    {this.setNavs(this.state.lists)}

                </Menu>
            </Sider>
        )
    }
}
export default LeftNav;