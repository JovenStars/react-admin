/*数据列表*/
import React,{Component} from 'react';
import {Table, Modal, Tag, Form} from 'antd';
import {DrawerForm} from '../modules/rightDrawerForm';

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}
function showConfirm() {
    Modal.confirm({
        title: '提示',
        content: '这是提示框',
        onOk() {
            return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
        },
        onCancel() {},
    });
}


export class ListTable extends Component{
    constructor(){
        super();
        const columns = [
            { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name'},
            { title: 'Age', width: 100, dataIndex: 'age', key: 'age'},
            { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
            { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
            { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
            { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
            { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
            { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
            { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
            { title: 'Column 8', dataIndex: 'address', key: '8', width: 150 },
            { title: 'Column 9', dataIndex: 'address', key: '9', width: 150 },
            {
                title: 'tag',
                key: 'tag',
                width: 100,
                render: () =><Tag color="green" onClick={showConfirm}>Confirm</Tag>,

            },
            {
                title: 'Action',
                key: 'operation',
                width: 100,
                /*eslint-disable*/
                render: () => <a href="javascript:;" onClick={this.showDrawer}>action</a>,
            },
        ];
        this.state = {
            visible: false,
            columns
        }
    }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    render(){
        let h = window.innerHeight;
        const RightFrom = Form.create()(DrawerForm);
        return (
            <div>
                <Table
                    columns={this.state.columns}
                    dataSource={data}
                    scroll={{ x: 1500, y: h-338 }}
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true
                    }}
                />
                <RightFrom visible={this.state.visible} onClose={this.onClose} />
            </div>
        )
    }
}