import React,{Component} from 'react';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
import {ListTable} from '../modules/dataList';

const FormItem = Form.Item;

class AdvancedSearchForm extends React.Component {
    state = {
        expand: false,
    };

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    // To generate mock Form.Item
    getFields() {
        const count = this.state.expand ? 10 : 6;
        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let i = 0; i < 10; i++) {
            children.push(
                <Col span={4} key={i} style={{ display: i < count ? 'block' : 'none' }}>
                    <FormItem label={`Field ${i}`}>
                        {getFieldDecorator(`field-${i}`, {
                            rules: [{
                                required: false,
                                message: 'Input something!',
                            }],
                        })(
                            <Input placeholder="placeholder" />
                        )}
                    </FormItem>
                </Col>
            );
        }
        return children;
    }

    render() {
        return (
            <Form
                className="ant-advanced-search-form"
                onSubmit={this.handleSearch}
            >
                <Row gutter={24}>{this.getFields()}</Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">搜索</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                            清除
                        </Button>
                        <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                            Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
                        </a>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
export default class FormList extends Component{
    render(){
        return(
            <div>
                <WrappedAdvancedSearchForm />
                <div className="search-result-list">
                    <ListTable />
                </div>
            </div>
        );
    }
}