/*抽屉表单*/
import React,{Component} from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';

const { Option } = Select;

export class DrawerForm extends Component {
    state = { visible: false };

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

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Drawer
                    title="Create"
                    width={720}
                    placement="right"
                    onClose={this.props.onClose}
                    maskClosable={false}
                    visible={this.props.visible}
                    style={{
                        height: 'calc(100% - 55px)',
                        overflow: 'auto',
                        paddingBottom: 53,
                    }}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Name">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'please enter user name' }],
                                    })(<Input placeholder="please enter user name" />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Url">
                                    {getFieldDecorator('url', {
                                        rules: [{ required: true, message: 'please enter url' }],
                                    })(
                                        <Input
                                            style={{ width: '100%' }}
                                            addonBefore="http://"
                                            addonAfter=".com"
                                            placeholder="please enter url"
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Owner">
                                    {getFieldDecorator('owner', {
                                        rules: [{ required: true, message: 'Please select an owner' }],
                                    })(
                                        <Select placeholder="Please select an owner">
                                            <Option value="xiao">Xiaoxiao Fu</Option>
                                            <Option value="mao">Maomao Zhou</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Type">
                                    {getFieldDecorator('type', {
                                        rules: [{ required: true, message: 'Please choose the type' }],
                                    })(
                                        <Select placeholder="Please choose the type">
                                            <Option value="private">Private</Option>
                                            <Option value="public">Public</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Approver">
                                    {getFieldDecorator('approver', {
                                        rules: [{ required: true, message: 'Please choose the approver' }],
                                    })(
                                        <Select placeholder="Please choose the approver">
                                            <Option value="jack">Jack Ma</Option>
                                            <Option value="tom">Tom Liu</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="DateTime">
                                    {getFieldDecorator('dateTime', {
                                        rules: [{ required: true, message: 'Please choose the dateTime' }],
                                    })(
                                        <DatePicker.RangePicker
                                            style={{ width: '100%' }}
                                            getPopupContainer={trigger => trigger.parentNode}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="Description">
                                    {getFieldDecorator('description', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'please enter url description',
                                            },
                                        ],
                                    })(<Input.TextArea rows={4} placeholder="please enter url description" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e8e8e8',
                            padding: '10px 16px',
                            textAlign: 'right',
                            left: 0,
                            background: '#fff',
                            borderRadius: '0 0 4px 4px',
                        }}
                    >
                        <Button
                            style={{
                                marginRight: 8,
                            }}
                            onClick={this.props.onClose}
                        >
                            Cancel
                        </Button>
                        <Button onClick={this.props.onClose} type="primary">Submit</Button>
                    </div>
                </Drawer>
            </div>
        );
    }
}