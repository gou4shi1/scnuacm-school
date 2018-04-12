import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

import Tabs from 'antd/lib/tabs';
import 'antd/lib/tabs/style';

import ShowMembersPageContainer from '../../ui/pages/showMembersPage';
import ShowTeamsPageContainer from '../../ui/pages/showTeamsPage';

const TabPane = Tabs.TabPane;

export class newPage extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="所有队伍" key="1"><ShowTeamsPageContainer/> </TabPane>
                <TabPane tab="所有队员" key="2"><ShowMembersPageContainer/></TabPane>
            </Tabs>
        )
    }
}

export default withRouter(newPage);
