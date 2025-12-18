import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Layout,
  Menu,
  Form,
  Input,
  Button,
  Table,
  Pagination,
  Modal,
  Space,
  message
} from 'antd';
import {
  UserOutlined,
  FormOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Item: FormItem } = Form;

const QuestionView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [dialogFormVisible, setDialogFormVisible] = useState(false);
  const [formInline, setFormInline] = useState({ question: '' });

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: 50,
      render: (text) => <span style={{ marginLeft: '10px' }}>{text}</span>
    },
    {
      title: '题目',
      dataIndex: 'question',
      key: 'question',
      width: 250,
      render: (text) => <span style={{ marginLeft: '10px' }}>{text}</span>
    },
    {
      title: '选项',
      dataIndex: 'options',
      key: 'options',
      width: 260,
      render: (text) => <span style={{ marginLeft: '10px' }}>{text}</span>
    },
    {
      title: '答案',
      dataIndex: 'answer',
      key: 'answer',
      width: 180,
      render: (text) => <span style={{ marginLeft: '10px' }}>{text}</span>
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
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
      id: '1',
      question: '法国的首都是哪个城市？',
      options: '巴黎，巴黎，巴黎，巴黎',
      answer: '巴黎'
    },
    {
      key: '2',
      id: '2',
      question: '法国的首都是哪个城市？',
      options: '巴黎，巴黎，巴黎，巴黎',
      answer: '巴黎'
    },
    {
      key: '3',
      id: '3',
      question: '法国的首都是哪个城市？',
      options: '巴黎，巴黎，巴黎，巴黎',
      answer: '巴黎'
    },
    {
      key: '4',
      id: '4',
      question: '法国的首都是哪个城市？',
      options: '巴黎，巴黎，巴黎，巴黎',
      answer: '巴黎'
    }
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const onAddNewQuestion = () => {
    setDialogFormVisible(true);
  };

  const onSubmit = () => {
    console.log('submit!', formInline);
    message.info(`查询题目: ${formInline.question}`);
  };

  const handleEdit = (row) => {
    console.log('编辑:', row);
    message.info(`编辑题目: ${row.question}`);
  };

  const handleDelete = (row) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除题目 "${row.question}" 吗？`,
      onOk: () => {
        message.success(`已删除题目: ${row.question}`);
      }
    });
  };

  const handleModalOk = () => {
    modalForm.validateFields()
      .then(values => {
        console.log('表单数据:', values);
        setDialogFormVisible(false);
        modalForm.resetFields();
        message.success('添加题目成功');
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
              <FormItem label="题目">
                <Input
                  placeholder="请输入题目关键词"
                  value={formInline.question}
                  onChange={e => setFormInline({ ...formInline, question: e.target.value })}
                  style={{ width: '200px' }}
                />
              </FormItem>
              <FormItem>
                <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
                  查询
                </Button>
              </FormItem>
              <FormItem>
                <Button type="success" icon={<PlusOutlined />} onClick={onAddNewQuestion}>
                  添加题目
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

            {/* 添加题目对话框 */}
            <Modal
              title="添加新题目"
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
                  label="题目"
                  name="question"
                  rules={[{ required: true, message: '请输入题目' }]}
                >
                  <Input />
                </FormItem>
                <FormItem
                  label="选项a"
                  name="optiona"
                  rules={[{ required: true, message: '请输入选项a' }]}
                >
                  <Input />
                </FormItem>
                <FormItem
                  label="选项b"
                  name="optionb"
                  rules={[{ required: true, message: '请输入选项b' }]}
                >
                  <Input />
                </FormItem>
                <FormItem
                  label="选项c"
                  name="optionc"
                  rules={[{ required: true, message: '请输入选项c' }]}
                >
                  <Input />
                </FormItem>
                <FormItem
                  label="选项d"
                  name="optiond"
                  rules={[{ required: true, message: '请输入选项d' }]}
                >
                  <Input />
                </FormItem>
                <FormItem
                  label="答案"
                  name="answer"
                  rules={[{ required: true, message: '请输入答案' }]}
                >
                  <Input />
                </FormItem>
              </Form>
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default QuestionView;