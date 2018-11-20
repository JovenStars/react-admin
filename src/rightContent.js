import React,{Component} from 'react';
import {Tabs} from "antd";
const TabPane = Tabs.TabPane;

export class RightContent extends Component {
    constructor(props){
        super(props);
        this.newTabIndex = 0;
    }
    onChange = (activeKey) => {
        this.props.onPageChange(this.props.panes,activeKey)
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    add = (title,href) => {
        const panes = this.props.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        import('./pages/user').then(data => {
            const Home = data.default;
            panes.push({ title: 'New ' +
                    'Tab', content: <Home />, key: activeKey });
            this.props.onPageChange(panes,activeKey)
        });
    }


    remove = (targetKey) => {
        let activeKey = this.props.activeKey.toString();
        let lastIndex;
        this.props.panes.forEach((pane, i) => {
            if (pane.key.toString() === targetKey.toString()) {
                lastIndex = i - 1;
            }
        });
        const panes = this.props.panes.filter(pane => pane.key.toString() !== targetKey.toString());
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.props.onPageChange(panes,activeKey)
    }

    render() {
        return (
            <Tabs
                onChange={this.onChange}
                activeKey={this.props.activeKey}
                type="editable-card"
                onEdit={this.onEdit}
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
