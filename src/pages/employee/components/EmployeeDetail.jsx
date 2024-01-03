import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form, Input, Typography, Select, DatePicker, ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/en_US';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { getDetailEmployee } from "../../../api/EmployeeApi.js";
import { useParams } from "react-router-dom";

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

const EmployeeDetail = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState({});

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await getDetailEmployee(id);
        setEmployeeData(response.data.employee);
        console.log(employeeData.employee.code,'sss')
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  return (
      <div className="employee-detail">
        <Row gutter={[16, 24]} justify="center">
          <Col span={8}>
            <Row gutter={16} justify="center" align="middle">
              <Col span={24}>
                <img
                    className="avatar"
                    width="200px"
                    height="200px"
                    style={{ borderRadius: '50%' }}
                    src={employeeData.avatar}
                    alt="Avatar"
                />
              </Col>
              <Col span={24}>
                <Button className="edit-button" >
                  Edit Image
                </Button>
              </Col>
            </Row>
          </Col>
          <Col span={16}>
            <Form layout="vertical">
              <Title level={3} style={{ lineHeight: '30px' }}>
                Employee Information
              </Title>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item label="Employee Code" name="code">
                    <Input disabled value= {employeeData.code}  style={{ fontSize: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Manager Name" name="managerName">
                    <Input value={employeeData.name} style={{ fontSize: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Name" name="name">
                    <Input value={employeeData.name}  style={{ fontSize: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email" name="email">
                    <Input value={employeeData.employee?.email}  style={{ fontSize: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Phone Number" name="phone">
                    <Input value={employeeData.phone}  style={{ fontSize: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Identity Card" name="identityCard">
                    <Input  value={employeeData.identityCard }  style={{ fontSize: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Date of Birth" name="dateOfBirth">
                    <ConfigProvider locale={enUS}>
                      <DatePicker  style={{ width: '100%', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} />
                    </ConfigProvider>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Gender" name="gender">
                    <Select  style={{ width: '100%', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                    </Select>
                    {/*<Radio.Group>*/}
                    {/*  <Radio value="female">Nữ</Radio>*/}
                    {/*  <Radio value="male">Nam</Radio>*/}
                    {/*</Radio.Group>*/}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Position" name="position">
                    <Select  style={{ width: '100%', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                      <Option value="fe">Front-end Dev</Option>
                      <Option value="be">Back-end Dev</Option>
                    <Option value="qa">QA Engineer</Option>
                  </Select>
                </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Status" name="status">
              <Select  style={{ width: '100%',fontSize:'24px' ,boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Description" name="description">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>

        <Title level={3} style={{ lineHeight: '30px' }}>
          Skills
        </Title>
        <Form.List name="skills">
          {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                    <Row gutter={[16, 16]} key={field.key}>
                      <Col span={9}>
                        <Form.Item
                            {...field}
                            label="Skill Name"
                            name={[field.name, 'name']}
                            fieldKey={[field.fieldKey, 'name']}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={9}>
                        <Form.Item
                            {...field}
                            label="Experience"
                            name={[field.name, 'exp']}
                            fieldKey={[field.fieldKey, 'exp']}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                      </Col>
                    </Row>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Skill
                  </Button>
                </Form.Item>
              </>
          )}
        </Form.List>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Button type="primary" onClick={() => handleEdit()}>
              Save
            </Button>
          </Col>
        </Row>
      </Form>
</Col>
</Row>
</div>
);
};

export default EmployeeDetail;