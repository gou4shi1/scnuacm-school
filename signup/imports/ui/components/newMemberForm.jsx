import React, { Component } from 'react';

import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import Input from 'antd/lib/input';
import 'antd/lib/form/style';
import 'antd/lib/select/style';
import 'antd/lib/input/style';

const FormItem = Form.Item;
const Option = Select.Option;

class _NewMemberForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };

        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label='姓名'
                >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入你的姓名！', whitespace: true }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="性别"
                >
                    {getFieldDecorator('gender', {
                        rules: [{ required: true, message: '请选择你的性别！' }],
                    })(
                        <Select >
                            <Option value="male">男</Option>
                            <Option value="female">女</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='学院'
                >
                    {getFieldDecorator('institute', {
                        rules: [{ required: true, message: '请输入你的学院！', whitespace: true }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='学号'
                    hasFeedback
                >
                    {getFieldDecorator('id', {
                        rules: [{
                            required: true, message: '请输入你的学号！'
                        }, {
                            pattern: /^201\d{8}$/, message: '学号格式不正确！'
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='手机'
                    hasFeedback
                >
                    {getFieldDecorator('phone', {
                        rules: [{
                            required: true, message: '请输入你的手机号码！'
                        }, {
                            pattern: /^1\d{10}$/, message: '手机号码格式不正确！'
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="邮箱"
                    hasFeedback
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '邮箱格式不正确！',
                        }, {
                            required: true, message: '请输入你的邮箱！',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
            </Form>
        );
    }
}

export default NewMemberForm = Form.create({
    mapPropsToFields(props) {
        return {
            name: Form.createFormField({value: props.values.name}),
            gender: Form.createFormField({value: props.values.gender}),
            institute: Form.createFormField({value: props.values.institute}),
            id: Form.createFormField({value: props.values.id}),
            phone: Form.createFormField({value: props.values.phone}),
            email: Form.createFormField({value: props.values.email}),
        }
    }
})(_NewMemberForm);
