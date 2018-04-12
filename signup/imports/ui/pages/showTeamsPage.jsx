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

import { Teams } from '../../api/teams';

class showTeamsPage extends Component {
    state = {
        filterDropdownVisible: false,
        data: this.props.teams,
        searchText: '',
        filtered: false,
    };

    componentWillReceiveProps(nextProps) {
        this.state.data = nextProps.teams;
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
            data: this.props.teams.map((record) => {
                const match = record.cn.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    cn: (
                        <span>
                              {record.cn.split(reg).map((text, i) => (
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
            title: '状态',
            dataIndex: 'pending',
            render: pending => pending ? '审核中' : '已通过',
            filters: [{
                text: '审核中',
                value: 'true',
            }, {
                text: '已通过',
                value: 'false',
            }],
            onFilter: (value, record) => record.pending.toString() === value,

        }, {
            title: '中文名',
            dataIndex: 'cn',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        autoFocus
                        placeholder="输入要搜索的名字"
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
            title: 'English Name',
            dataIndex: 'en',
        }, {
            title: '队长',
            dataIndex: 'members',
            key: 'members0',
            render: members => members[0] ? members[0].name : '无',
        }, {
            title: '队员',
            dataIndex: 'members',
            key: 'members1',
            render: members => members[1] ? members[1].name : '无',
        }, {
            title: '队员',
            dataIndex: 'members',
            key: 'members2',
            render: members => members[2] ? members[2].name : '无',
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

showTeamsPage.propTypes = {
    teams: PropTypes.array.isRequired,
};

export default showTeamsPageContainer = withTracker(() => {
    Meteor.subscribe('teams');
    return {
        teams: Teams.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
})(showTeamsPage);