import React from 'react';
import { useParams } from "react-router-dom";
import { useGetDetailEmployee } from "../../../hooks/useEmployee.jsx";
import { Row, Col, Button, Form, Input, Typography, Card } from 'antd';
import moment from "moment";

const { TextArea } = Input;

const EmployeeDetail = () => {
  const { id } = useParams();
  const { data: employee, isLoading, isError } = useGetDetailEmployee(id);

  if (isLoading) {
    return <div>Waitinggg</div>;
  }

  if ( isError) {
    return <div>404</div>;
  }
  

  const {
    avatar,
    name,
    code,
    email,
    phone,
    identityCard,
    dateOfBirth,
    gender,
    status,
    position,
    skills,
    description,
    manager,
  } = employee?.employee;
  
  console.log(name)
  

  return (
      <Card>
        <Row gutter={32}>
          <Col md={24} lg={8}>
            <Row gutter={32} align="middle" justify="center" style={{ marginBottom: 16 }}>
              <Col>
                <img
                    width="200px"
                    height="200px"
                    style={{ borderRadius: "100%" }}
                    src={avatar}
                    alt={avatar}
                />
              </Col>
            </Row>
            <Row gutter={32} align="middle" justify="center">
              <Col>
                <Button>Edit Image</Button>
              </Col>
            </Row>
          </Col>
          <Col md={24} lg={16}>
            <Form layout="vertical">
              <Typography.Title level={3} style={{ lineHeight: "30px" }}>
                Personal Info
              </Typography.Title>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Employee Code">
                    <Input
                        value={employee?.employee.code ? code : ""}
                        style={{ maxWidth: "300px" }}
                        disabled
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Manager Name">
                    <Input
                        value={manager?.name ? manager.name : "No Manager"}
                        style={{ maxWidth: "300px" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Name">
                    <Input value={name} style={{ maxWidth: "300px" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email">
                    <Input value={email} style={{ maxWidth: "300px" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Phone Number">
                    <Input value={phone} style={{ maxWidth: "300px" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Identity Card">
                    <Input value={identityCard} style={{ maxWidth: "300px" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Date of birth">
                    <Input
                        value={moment(dateOfBirth).format("DD-MM-YYYY")}
                        style={{ maxWidth: "300px" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Gender">
                    <Input
                        value={{ male: "Male", female: "Female" }[gender] || ""}
                        style={{ maxWidth: "300px" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Position">
                    <Input
                        value={{
                          fe: "Front-end Dev",
                          be: "Back-end Dev",
                          fullstack: "FullStack",
                          ba: "Business Analysis",
                          qa: "Quality Assurance",
                          devops: "DevOps Engineer",
                          ux_ui: "User Experience",
                        }[position] || ""}
                        style={{ maxWidth: "300px" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Status">
                    <Input
                        value={{ active: "Active", inactive: "Inactive" }[status] || ""}
                        style={{ maxWidth: "300px" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Description">
                    <TextArea rows={4} value={description} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Skills">
                    <div >
                      {skills.map((skill) => (
                          <div
                              key={skill.name}
                              style={{
                                backgroundColor: "pink",
                                color: "whitesmoke",
                                borderRadius: "4px",
                                padding: "4px 8px",
                                margin: "4px",
                                maxWidth: "300px",
                                flexGrow: 1,
                              }}
                          >
                            <span style={{ marginRight: '8px' }}>{skill.exp}</span>
                            <span style={{ marginRight: '8px' }}>Yo</span>
                            <span style={{ marginRight: '8px' }}>{skill.name}</span>
                          </div>
                      ))}
                    </div>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter ={8 } justify="center">
                <Col>
                  <Button type="default">Edit</Button>
                </Col>
                <Col>
                  <Button type="primary">Delete</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
  );
};

export default EmployeeDetail;