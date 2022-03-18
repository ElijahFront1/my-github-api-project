import { useEffect, useState } from 'react';

import { Layout, Menu, Breadcrumb, Button } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import Search from 'antd/lib/input/Search';
import { getAuthUser, getHovercardByUsername, getUsersByUsername, getOAuth, authentication } from '../../api/users';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface IUser {
    avatar_url: string | null;
    followers: number;
    following: number;
    login: string;
    name: string | null;
}

function Home() {

    const [collapsed, setCollapsed] = useState(false)
    const [user, setUser] = useState<IUser>()

    const onCollapse = (collapsed: boolean) => {
        setCollapsed(!collapsed)
    };

    const onSearch = (value: string) => {
        if (value !== '') {
            getUsersByUsername(value).then((res) => {
                setUser({
                    avatar_url: res.data.avatar_url,
                    followers: res.data.followers,
                    following: res.data.following,
                    login: res.data.login,
                    name: res.data.name,
                });
            });
            getHovercardByUsername(value).then(res => console.log(res.data));
            getAuthUser();
        }
    }

    function login() {
        window.location.href = "https://github.com/login/oauth/authorize?client_id=47dba79648493c77ade2&redirect_uri=https:%2F%2Fmy-github-api-project-s415.herokuapp.com%2F";
        // getOAuth().then(res => console.log(res));
    }

    function logTrigger() {
        let code = window.location.href.match(/\?code=(.*)/)[1];
        console.log(code);
    }

    function postTokenHandler() {
        let code = window.location.href.match(/\?code=(.*)/)[1];
        authentication(code).then(res => console.log(res));
    }

    console.log(user);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={() => onCollapse(collapsed)}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        Option 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        Option 2
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" icon={<FileOutlined />}>
                        Files
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Search
                            placeholder="User name"
                            allowClear
                            enterButton="Search"
                            size="large"
                            defaultValue="Span415"
                            onSearch={onSearch}
                        />
                        <img src={user?.avatar_url} alt="user avatar" />
                        <div>{user?.followers}</div>
                        <div>{user?.following}</div>
                        <div>{user?.login}</div>
                        <div>{user?.name}</div>
                        <Button onClick={login}>OAuth</Button>
                        <Button onClick={logTrigger}>log</Button>
                        <Button onClick={postTokenHandler}>postTokenHandler</Button>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ss©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )
}

export default Home;