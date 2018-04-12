import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import Table from 'antd/lib/table';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import 'antd/lib/table/style';
import 'antd/lib/input/style';
import 'antd/lib/button/style';
import 'antd/lib/icon/style';

import { Members } from '../../api/members';

class showMembersPage extends Component {
    state = {
        filterDropdownVisible: false,
        data: this.props.members,
        searchText: '',
        filtered: false,
    };

    componentWillReceiveProps(nextProps) {
        this.state.data = nextProps.members;
    }

    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
    };

    onSearch = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: this.props.members.map((record) => {
                const match = record.name.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    name: (
                        <span>
                              {record.name.split(reg).map((text, i) => (
                                  i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                              ))}
                        </span>
                    ),
                };
            }).filter(record => !!record),
        });
    };

    render() {
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        autoFocus
                        placeholder="输入要搜索的姓名"
                        value={this.state.searchText}
                        onChange={this.onInputChange}
                        onPressEnter={this.onSearch}
                    />
                    <Button type="primary" onClick={this.onSearch}>搜索</Button>
                </div>
            ),
            filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: (visible) => {
                this.setState({ filterDropdownVisible: visible });
            },
        }, {
            title: '性别',
            dataIndex: 'gender',
            render: gender => gender==='male' ? '男' : '女',
            filters: [{
                text: '男',
                value: 'male',
            }, {
                text: '女',
                value: 'female',
            }],
            onFilter: (value, record) => record.gender === value,
        }, {
            title: '学院',
            dataIndex: 'institute',
        }, {
            title: '学号',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
        /*}, {
            title: '手机',
            dataIndex: 'phone',
        }, {
            title: '邮箱',
            dataIndex: 'email',*/
        }];

        return (
            <Table
                columns={columns}
                dataSource={this.state.data}
                bordered
            />
        );
    }
}

showMembersPage.propTypes = {
    members: PropTypes.array.isRequired,
};

export default showMembersPageContainer = withTracker(() => {
    Meteor.subscribe('members');
    return {
        members: Members.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
})(showMembersPage);