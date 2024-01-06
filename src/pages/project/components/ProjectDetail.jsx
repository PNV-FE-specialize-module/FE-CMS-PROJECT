import React, { useState } from 'react'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { UserOutlined } from '@ant-design/icons';
import { useGetDetaiProject, useUpdateProject } from '../../../hooks/useProject';
import { Row, Col, Button, Form, Input, Typography, Card, Spin, Select, Avatar, DatePicker } from 'antd';
import { StatusProjectEnum, checkProjectStatus } from '../../../components/enum/enum';


const { TextArea } = Input;
const { Option } = Select;


export const ProjectDetail = () => {
  const { id } = useParams();
  const { data: project, isLoading, isError, error } = useGetDetaiProject(id);
  const updateProject = useUpdateProject(id);
  const [editMode, setEditMode] = useState(false);
  const [editedProject, setEditedProject] = useState({});

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


  const handleEditClick = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setEditedProject(project?.project);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSaveClick = async () => {
    try {
      const result = await updateProject.mutateAsync(editedProject);

      console.log('Mutation result:', result);
      console.log('Employee updated successfully!');
      setEditMode(false)
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Project updated successfully!',
      });
    } catch (error) {
      console.error('Error updating project:', error);

      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update project. Please try again.',
      });
    }
  };

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
                    {
                      editMode ? (<Input
                        style={{ maxWidth: "300px" }}
                        value={editedProject.name}
                        onChange={handleInputChange}
                      />) : (
                        <Input
                          style={{ maxWidth: "300px" }}
                          disabled
                        />
                      )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Manager Name" name="managername" initialValue={managerProject.name}>
                    {/* {
                      editMode ? (
                      <Select 
                        style={{ width: "300px" }}
                        placeholder="Manager"
                      >{
                          <Option>

                          </Option>
                      }
                      </Select>
                      <) : (
                        <Input
                          style={{ maxWidth: "300px" }}
                          disabled
                        />
                      )} */}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Specification" name="specification" initialValue={specification}>
                    {
                      editMode ? (<Input
                        style={{ maxWidth: "300px" }}
                        value={editedProject.specification}
                        onChange={handleInputChange}
                      />) : (
                        <Input
                          style={{ maxWidth: "300px" }} disabled />
                      )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Status">
                    {editMode ? (
                      <Select
                        value={editedProject.status}
                        style={{ maxWidth: "300px" }}
                        onChange={(value) => handleInputChange({ target: { name: "status", value } })}
                      >
                        <Option value={StatusProjectEnum.PENDING}>Pending</Option>
                        <Option value={StatusProjectEnum.DONE}>Done</Option>
                        <Option value={StatusProjectEnum.ON_PROGRESS}>On Progress</Option>
                        <Option value={StatusProjectEnum.CLOSED}>Closed</Option>
                      </Select>
                    ) : (
                      <Input
                        value={checkProjectStatus(status)}
                        style={{ maxWidth: "300px" }} disabled />
                    )
                    }
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Start Date">
                    {editMode ? (
                      <DatePicker
                        value={moment(editedProject.startDate).format('DD-MM-YYYY')}
                        style={{ maxWidth: "300px" }}
                        onChange={handleInputChange}
                        name="startDate"
                      />
                    ) : (
                      <Input
                        value={moment(startDate).format("DD-MM-YYYY")}
                        style={{ maxWidth: "300px" }}
                        disabled
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="End Date" name="endDate" initialValue={new Date(endDate).toLocaleDateString('en-US')}>
                    <Input
                      style={{ maxWidth: "300px" }}
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Description" name="description" initialValue={description}>
                    <TextArea
                      rows={4} style={{ width: '300px' }}
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Team Member" initialValue={employee_project}>
                    <Select
                      style={{ width: "300px" }}
                      placeholder="Team Member"
                    >
                      {employee_project.map((member, index) => (
                        <Option key={index} value={member.id} disabled>
                          <Avatar
                            src={member.employee.avatar ?
                              <img src={member.employee.avatar} alt="avatar" sizes="small" /> : <UserOutlined />
                            }
                          />
                          {member.employee.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Language/Framework" initialValue={langFrame} >
                    <div
                      style={{
                        width: "300px", display: "flex",
                        flexWrap: 'wrap',
                      }}
                    >
                      {langFrame.map((item, index) => (

                        <Button
                          key={index}
                          value={item.id}
                          style={{
                            backgroundColor: "green",
                            color: "whitesmoke",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            margin: "4px",
                            maxWidth: "fit-content",
                            opacity: 0.5,
                          }}
                          disabled
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Technology">
                    <div style={{
                      display: "flex",
                      flexWrap: 'wrap',
                    }}>
                      {technology.map((item, index) => (
                        <Button
                          key={index}
                          style={{
                            backgroundColor: "green",
                            color: "whitesmoke",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            margin: "4px",
                            maxWidth: "fit-content",
                            opacity: 0.5,

                          }}
                          disabled
                        >
                          <span>{item}</span>
                        </Button>
                      ))}
                    </div>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <Row gutter={8} justify="center">
              <Col>
                {editMode ? (
                  <Button type="primary" onClick={handleSaveClick} >
                    Save
                  </Button>
                ) : (
                  <Button type="default" onClick={handleEditClick}>
                    Edit
                  </Button>
                )}
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
