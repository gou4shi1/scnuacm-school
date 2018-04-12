import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import { Meteor } from 'meteor/meteor';

import Steps from 'antd/lib/steps';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import 'antd/lib/steps/style';
import 'antd/lib/button/style';
import 'antd/lib/message/style';
import 'antd/lib/modal/style';

import NewMemberForm from '../components/newMemberForm';
import NewTeamForm from '../components/newTeamForm';
import Captcha from '../components/captcha';

const Step = Steps.Step;

export class newPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
        this.form = [];
        this.stepsNum = 4;
        this.values = new Array(this.stepsNum).fill({});
    }

    next() {
        let current = this.state.current;
        this.form[current].validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.values[current] = values;
                ++current;
                this.setState({ current });
            }
        });
    }
    prev() {
        let current = this.state.current;
        this.values[current] = this.form[current].getFieldsValue();
        --current;
        this.setState({ current });
    }

    handleSubmit = () => {
        if (!this.captcha.state.success) {
            message.error('请点击按钮进行验证！');
            return false;
        }

        const current = this.state.current;
        this.form[current].validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.values[current] = values;
                for (let i = current + 1; i < this.stepsNum; ++i) {
                    this.values[i].id = null;
                }
                Meteor.call('teams.insert', this.values, (err) => {
                    if (err) {
                        Modal.error({
                            title: '报名失败',
                            content: '好像哪里出错了QAQ。。。请稍后重试。。。',
                            onOk: this.props.history.push('/show'),
                        });
                    } else {
                        Modal.success({
                            title: '报名成功',
                            content: '祝你取得佳绩！',
                            onOk: this.props.history.push('/show'),
                        });
                    }
                })
            }
        });
    };


    render() {
        const steps = [{
            title: '队伍信息',
            content: (
                <NewTeamForm key={"team"} values={this.values[0]} ref={form => this.form[0] = form} />
            ),
        }, {
            title: '队长信息',
            content: (
                <NewMemberForm key={"leader"} values={this.values[1]} ref={form => this.form[1] = form} />
            ),
        }, {
            title: '队员1信息',
            content: (
                <NewMemberForm key={"member1"} values={this.values[2]} ref={form => this.form[2] = form} />
            ),
        }, {
            title: '队员2信息',
            content: (
                <NewMemberForm key={"member2"} values={this.values[3]} ref={form => this.form[3] = form} />
            ),
        }];

        const { current } = this.state;

        return (
            <div>
                <Steps current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div className="steps-content">{steps[current].content}</div>
                <div className="steps-action">
                    <Captcha ref={captcha => this.captcha = captcha} /><br/>
                    {
                        current === 0
                        &&
                        <div>
                            <Button type="primary" onClick={() => this.next()}>下一步</Button><br/>
                        </div>
                    }
                    {
                        (current === 1 || current === 2)
                        &&
                        <div>
                            <Button type="primary" onClick={() => this.next()}>还有队员，继续填写</Button><br/>
                            <Button style={{ marginTop: 8 }} type="primary" onClick={() => this.handleSubmit()}>已无队员，马上报名</Button><br/>
                        </div>
                    }
                    {
                        current === 3
                        &&
                        <div>
                            <Button type="primary" onClick={() => this.handleSubmit()}>填写完毕，马上报名</Button><br/>
                        </div>
                    }
                    {
                        current > 0
                        &&
                        <Button style={{ marginTop: 8 }} onClick={() => this.prev()}>返回</Button>
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(newPage);
