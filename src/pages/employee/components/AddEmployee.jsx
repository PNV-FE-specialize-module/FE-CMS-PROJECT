import React, { useState } from 'react';
import { Divider, Space, Upload, Button, Form, Input, Select, InputNumber, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const AddEmployee = () => {
    const [form] = Form.useForm();
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    // border: ' #d9d9d9',
                    // backgroundColor: '#FFFFFF',
                    width: 70,
                }}
            >
                <Option value="86">+84</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

    const formBorderStyle = {
        border: '1px solid #d9d9d9',
        borderRadius: '5px',
        padding: '20px',
        // width: '100%',
        margin: '0 auto',
        backgroundColor: '#BFEFFF', // Màu nền
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Hiệu ứng bóng
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: (24 - 16) / 2, // Offset để căn giữa
            },
        },
    };

    // const tailFormItemLayout = {
    //   wrapperCol: {
    //     xs: {
    //       span: 24,
    //       offset: 0,
    //     },
    //     sm: {
    //       span: 16,
    //       offset: (24 - 16) / 2, // Offset để căn giữa
    //     },
    //   },
    // };

    const uploadButtonStyle = {
        width: '100%',
        height: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        backgroundColor: '#ECECEC',
        border: '1px #d9d9d9',
        borderRadius: '5px',
        cursor: 'pointer',
    };
    const positions = [
        'Software Engineer',
        'Web Developer',
        'Mobile App Developer',
        'Data Scientist',
        'Database Administrator',
        'System Administrator',
        'Network Engineer',
        'DevOps Engineer',
        'UI/UX Designer',
        'Quality Assurance (QA) Engineer',
        'Business Analyst',
        'IT Project Manager',
        'Cloud Architect',
        'Cybersecurity Analyst',
        'Machine Learning Engineer',
        'Full Stack Developer',
        'Frontend Developer',
        'Backend Developer',
        'Game Developer',
        'IT Support Specialist',
    ];
    const technologies = [
        'Java',
        'CSS',
        'JavaScript',
        'React',
        'Angular',
        'Vue.js',
        'Node.js',
        'Express.js',
        'Ruby on Rails',
        'Docker',
        'PHP',
        'Python',
        //...
    ];
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };
    const postaLayout = {
        wrapperCol: {
            offset: 8,
            span: 24,
        },
    };

    return (
        <Form
            form={form}
            name="addemployee"
            onFinish={onFinish}
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            style={{
                maxWidth: 1300,
                ...formBorderStyle,

            }}
            scrollToFirstError
        >
            <Form.Item
                name="avatar"
                // label=""
                rules={[
                    {
                        required: true,
                        message: 'Please upload the avatar image',
                    },
                ]}
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                        return e;
                    }
                    return e && e.fileList;
                }}
            >
                <Upload
                    beforeUpload={() => false}
                    listType="picture-card"
                    showUploadList={false}
                >
                    <div style={uploadButtonStyle}>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload the picture</div>
                    </div>
                </Upload>
            </Form.Item>

            <Col md={24} lg={16}>
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="ID Employee"
                                name="id"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter the employee ID',
                                    },
                                ]}
                            >
                                <InputNumber placeholder="e.g 123" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name Employee"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter the name',
                                    },
                                ]}
                            >
                                <Input placeholder="e.g Ho Thi Thu Tran" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="E-mail Employee"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}
                            >
                                <Input placeholder="e.g thutran123@gmail.com" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Date of birth">
                                {editMode ? (
                                    <Input
                                        value={moment(editedEmployee.dateOfBirth).format("DD-MM-YYYY")}
                                        style={{ maxWidth: "300px" }}
                                        onChange={handleInputChange}
                                        name="dateOfBirth"
                                    />
                                ) : (
                                    <Input
                                        value={moment(dateOfBirth).format("DD-MM-YYYY")}
                                        style={{ maxWidth: "300px" }}
                                        disabled
                                    />
                                )}

                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="phone"
                                label="Phone Number"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone number!',
                                    },
                                ]}
                            >
                                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="description"
                                label="Description"
                            >
                                <Input.TextArea placeholder="Enter description" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>

                            <Form.Item
                                name="specification"
                                label="Specification"
                            >
                                <Input placeholder="Enter specification" />
                            </Form.Item>
                        </Col>


                        <Space direction="vertical" {...postaLayout}>
                            <Form.Item
                                name="technology"
                                label="Technology"
                            // wrapperCol={{ offset: 8, span: 16 }}
                            >
                                <Select
                                    mode="multiple"
                                    placeholder="Select technology"
                                // style={{ width: '30%', marginRight: '73%', }}
                                >
                                    {technologies.map((tech) => (
                                        <Option key={tech} value={tech}>
                                            {tech}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="position"
                                label="Position"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select the user\'s position',
                                    },
                                ]}
                            // wrapperCol={{ offset: 8, span: 16 }}
                            >
                                <Select placeholder="Select position">
                                    {positions.map((position) => (
                                        <Option key={position} value={position}>
                                            {position}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="gender"
                                label="Gender"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter the status',
                                    },
                                ]}
                            // wrapperCol={{ offset: 8, span: 16 }}
                            >
                                <Select placeholder="Select gender">
                                    <Option value="Male">Male</Option>
                                    <Option value="Female">Female</Option>
                                </Select>
                            </Form.Item>
                        </Space>
                        <Form.Item>
                            <Space {...tailLayout}>
                                <Form.Item
                                    name="startDate"
                                    label="Start Date"

                                >
                                    <DatePicker />
                                </Form.Item>

                                <Form.Item
                                    name="endDate"
                                    label="End Date"

                                >
                                    <DatePicker />
                                </Form.Item>
                            </Space>
                        </Form.Item>
                    </Row>
                </Form>
            </Col>

            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Add Emplpoyee
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddEmployee;
