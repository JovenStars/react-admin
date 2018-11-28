import React,{Component} from 'react';
import { connect } from 'react-redux'
import {Tabs} from "antd";
import { addPage, removePage, changePage } from './redux/index';

const TabPane = Tabs.TabPane;

@connect(
    state=>state,
    { addPage, removePage, changePage }
)
class RightContent extends Component {
    constructor(props){
        super(props);
        this.newTabIndex = 0;
    }
    onChange = (activeKey) => {
        this.props.changePage(activeKey);
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    add = () => {
        const activeKey = `newTab${++this.newTabIndex}`;
        this.props.addPage({title: activeKey,href: 'user',key: activeKey});
    }


    remove = (targetKey) => {
        this.props.removePage(targetKey)
    }

    render() {
        return (
            <Tabs
                onChange={this.onChange}
                activeKey={this.props.activeKey}
                type="editable-card"
                onEdit={this.onEdit}
                className="right-tabs"
            >
                {this.props.panes.map(pane =>
                    <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                        {pane.content}
                    </TabPane>
                )}
            </Tabs>
        );
    }
}
export default RightContent;
