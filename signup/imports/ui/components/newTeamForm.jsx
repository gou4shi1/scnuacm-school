import React, { Component } from 'react';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import 'antd/lib/form/style';
import 'antd/lib/input/style';

const FormItem = Form.Item;

class _newTeamForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
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
                    label='队伍中文名'
                >
                    {getFieldDecorator('cn', {
                        rules: [{ required: true, message: '请输入你的队伍的中文名！', whitespace: true }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='队伍英文名'
                >
                    {getFieldDecorator('en', {
                        rules: [{ required: true, message: '请输入你的队伍的英文名！', whitespace: true }],
                    })(
                        <Input/>
                    )}
                </FormItem>
            </Form>
        );
    }
}

export default NewTeamForm = Form.create({
    mapPropsToFields(props) {
        return {
            cn: Form.createFormField({value: props.values.cn}),
            en: Form.createFormField({value: props.values.en}),
        }
    }
})(_newTeamForm);

