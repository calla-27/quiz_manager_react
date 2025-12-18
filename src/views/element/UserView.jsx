import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Layout,
  Menu,
  Form,
  Input,
  Button,
  Table,
  Tag,
  Tooltip,
  Pagination,
  Modal,
  Space,
  message
} from 'antd';
import {
  UserOutlined,
  FormOutlined,
  ClockCircleOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Item: FormItem } = Form;

const UserView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [dialogFormVisible, setDialogFormVisible] = useState(false);
  const [formInline, setFormInline] = useState({ user: '' });

  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: 180,
      render: (text) => (
        <Space>
          <ClockCircleOutlined />
          <span style={{ marginLeft: '10px' }}>{text}</span>
        </Space>
      )
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 180,
      render: (text, record) => (
        <Tooltip
          placement="top"
          title={
            <div>
              <p>姓名: {record.name}</p>
              <p>住址: {record.address}</p>
            </div>
          }
        >
          <Tag color="blue" style={{ cursor: 'pointer' }}>
            {text}
          </Tag>
        </Tooltip>
      )
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
      width: 180,
      render: (text, record) => (
        <Tooltip placement="top" title={`密码: ${record.password}`}>
          <span style={{ marginLeft: '10px', cursor: 'pointer' }}>{text}</span>
        </Tooltip>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ padding: 0 }}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            style={{ padding: 0 }}
          >
            删除
          </Button>
        </Space>
      )
    }
  ];

  const dataSource = [
    {
      key: '1',
      date: '2016-05-02',
      name: '王小虎',
      password: '123456',
      address: '上海市普陀区金沙江路 1518 弄'
    },
    {
      key: '2',
      date: '2016-05-04',
      name: '张三',
      password: 'abcdef',
      address: '上海市普陀区金沙江路 1517 弄'
    },
    {
      key: '3',
      date: '2016-05-01',
      name: '李四',
      password: 'qwerty',
      address: '上海市普陀区金沙江路 1519 弄'
    },
    {
      key: '4',
      date: '2016-05-03',
      name: '王五',
      password: 'admin123',
      address: '上海市普陀区金沙江路 1516 弄'
    }
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const onAddNewUser = () => {
    setDialogFormVisible(true);
  };

  const onSubmit = () => {
    console.log('submit!', formInline);
    message.info(`查询用户: ${formInline.user}`);
  };

  const handleEdit = (row) => {
    console.log('编辑:', row);
    message.info(`编辑用户: ${row.name}`);
  };

  const handleDelete = (row) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除用户 "${row.name}" 吗？`,
      onOk: () => {
        message.success(`已删除用户: ${row.name}`);
      }
    });
  };

  const handleModalOk = () => {
    modalForm.validateFields()
      .then(values => {
        console.log('表单数据:', values);
        setDialogFormVisible(false);
        modalForm.resetFields();
        message.success('添加用户成功');
      })
      .catch(err => {
        console.log('验证失败:', err);
      });
  };

  const handleModalCancel = () => {
    setDialogFormVisible(false);
    modalForm.resetFields();
  };

  return (
    <Layout className="layout-container">
      <Header className="ant-layout-header">
        Quiz后台管理
      </Header>
      <Layout>
        <Sider width={200} className="ant-layout-sider">
          <Menu
            mode="inline"
            defaultOpenKeys={['1']}
            selectedKeys={[location.pathname]}
            style={{ height: '100%' }}
            onClick={handleMenuClick}
          >
            <SubMenu
              key="1"
              icon={<FormOutlined />}
              title="管理选项"
            >
              <Menu.Item key="/user" icon={<UserOutlined />}>
                <span>用户管理</span>
              </Menu.Item>
              <Menu.Item key="/question" icon={<FormOutlined />}>
                <span>题目管理</span>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content>
            {/* 查询表单 */}
            <Form
              layout="inline"
              style={{ marginBottom: '16px' }}
              onFinish={onSubmit}
            >
              <FormItem label="用户名">
                <Input
                  placeholder="请输入用户名"
                  value={formInline.user}
                  onChange={e => setFormInline({ ...formInline, user: e.target.value })}
                  style={{ width: '200px' }}
                />
              </FormItem>
              <FormItem>
                <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
                  查询
                </Button>
              </FormItem>
              <FormItem>
                <Button type="success" icon={<PlusOutlined />} onClick={onAddNewUser}>
                  添加用户
                </Button>
              </FormItem>
            </Form>

            {/* 表格 */}
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={false}
              style={{ width: '80%' }}
            />

            <br />

            {/* 分页 */}
            <Pagination
              total={1000}
              showSizeChanger={false}
              style={{ marginTop: '16px' }}
            />

            {/* 添加用户对话框 */}
            <Modal
              title="添加新用户"
              open={dialogFormVisible}
              onOk={handleModalOk}
              onCancel={handleModalCancel}
              width={500}
            >
              <Form
                form={modalForm}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
              >
                <FormItem
                  label="用户名"
                  name="name"
                  rules={[{ required: true, message: '请输入用户名' }]}
                >
                  <Input />
                </FormItem>
                <FormItem
                  label="密码"
                  name="password"
                  rules={[{ required: true, message: '请输入密码' }]}
                >
                  <Input.Password />
                </FormItem>
                <FormItem
                  label="确认密码"
                  name="confirmPassword"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: '请确认密码' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('两次输入的密码不一致'));
                      }
                    })
                  ]}
                >
                  <Input.Password />
                </FormItem>
              </Form>
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default UserView;