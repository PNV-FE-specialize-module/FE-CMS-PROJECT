import React from 'react'
import { Row, Col, Button, Form, Input, Typography, Card, Spin, Select  } from 'antd';
import { useGetDetaiProject } from '../../../hooks/useProject';
import { useParams } from 'react-router-dom';
import { checkProjectStatus } from '../../../components/enum/enum';

const { TextArea } = Input;
const { Option } = Select;


export const ProjectDetail = () => {
  const { id } = useParams();
  const { data: project, isLoading, isError, error } = useGetDetaiProject(id);

  if (isLoading) {
    return <Spin spinning={isLoading} tip="Loading..."></Spin>;
  }

  if (isError) {
    return <div>Error loading project data: {error.message}</div>;
  }

  const {
    name,
    description,
    specification,
    langFrame,
    technology,
    status,
    startDate,
    endDate,
    managerProject,
    employee_project
  } = project?.project || {};

  return (
    <Card>
      <Spin spinning={isLoading} tip="Loading...">
        <Row gutter={32} align="middle" justify="center">
          <Col md={24} lg={16}>
            <Form layout="vertical" >
              <Typography.Title level={3} style={{ lineHeight: "30px" }}>
                Project Infomation
              </Typography.Title>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Project Name" name="name" initialValue={name}>
                    <Input
                      style={{ maxWidth: "300px" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Manager Name" name="managername" initialValue={managerProject.name}>
                    <Input
                      style={{ maxWidth: "300px" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Specification" name="specification" initialValue={specification}>
                    <Input
                      style={{ maxWidth: "300px" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Status" name="status" initialValue={checkProjectStatus(status)}>
                    <Input
                      style={{ maxWidth: "300px" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Start Date" name="startDate" initialValue={new Date(startDate).toLocaleDateString('en-US')}>
                    <Input
                      style={{ maxWidth: "300px" }}
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="End Date" name="endDate" initialValue={new Date(endDate).toLocaleDateString('en-US')}>
                    <Input
                      style={{ maxWidth: "300px" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Team Member"  initialValue={employee_project}>
                    <Select
                      style={{ width: "300px" }}
                      placeholder="Team Member"
                    >
                      {employee_project.map((member, index) => (
                        <Option key={index} value={member.id}>
                          {member.employee.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="LangFrame" initialValue={langFrame}>
                  <Select
                      style={{ width: "300px" }}
                      placeholder="LangFrame"
                    >
                      {langFrame.map((item, index) => (
                        <Option key={index} value={item.id}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Description" name="description" initialValue={description}>
                    <TextArea
                      rows={4} style={{width:'300px' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Technology">
                    <div style={{
                      display: "flex",
                      flexWrap: 'wrap'
                    }}>
                      {technology.map((item, index) => (
                        <div
                          key={index}
                          style={{
                            backgroundColor: "green",
                            color: "whitesmoke",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            margin: "4px",
                            maxWidth: "fit-content",
                            opacity: 0.5
                          }}
                        >
                          <span style={{ marginRight: '8px' }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <Row gutter={10} justify="center">
              <Col>
                <Button type="default">Edit</Button>
              </Col>
              <Col>
                <Button type="primary">Delete</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>
    </Card>

  )
}
