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
  } = editMode ? editedProject : project?.project;


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

  const handleAddLangFrame = () => {
    console.log(editedProject)
    setEditedProject((prevState) => ({
      ...prevState,
      langFrame: [
        ...prevState.langFrame, ''
      ],
    }));
  };



  const handleRemoveLangFrame = (indexToRemove) => {
    setEditedProject((prevState) => ({
      ...prevState,
      langFrame: prevState.langFrame.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleLangFrameInputChange = (e, index) => {
    const { value } = e.target;
    setEditedProject((prevState) => ({
      ...prevState,
      langFrame: prevState.langFrame.map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const handleAddTech = () => {
    console.log(editedProject)
    setEditedProject((prevState) => ({
      ...prevState,
      technology: [
        ...prevState.technology, ''
      ],
    }));
  };


  const handleRemoveTech = (indexToRemove) => {
    setEditedProject((prevState) => ({
      ...prevState,
      technology: prevState.technology.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleTechInputChange = (e, index) => {
    const { value } = e.target;
    setEditedProject((prevState) => ({
      ...prevState,
      technology: prevState.technology.map((item, i) =>
        i === index ? value : item
      ),
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
                        value={moment(editedProject.startDate)}
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
                  <Form.Item label="End Date" >
                    {
                      editMode ? (
                        <DatePicker
                          value={moment(editedProject.endDate)}
                          style={{ maxWidth: "300px" }}
                          onChange={handleInputChange}
                          name="endDate"
                        />
                      ) : (
                        <Input
                          value={moment(endDate).format("DD-MM-YYYY")}
                          style={{ maxWidth: "300px" }}
                          disabled

                        />
                      )
                    }

                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Description" name="description" initialValue={description}>
                    {
                      editMode ? (
                        <TextArea
                          value={editedProject.description}
                          rows={4} style={{ width: '300px' }}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <TextArea
                          rows={4} style={{ width: '300px' }}
                          disabled
                        />
                      )
                    }
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Team Member" initialValue={employee_project}>
                    {
                      editMode ? (
                        <Select
                          style={{ width: "300px" }}
                          value={editedProject.employee_project}
                          onChange={(value) => handleInputChange({ target: { name: "employee", value } })}
                          placeholder="Team Member"
                        >
                          {employee_project.map((member, index) => (
                            <Option key={index} value={member.id}>
                              <Avatar
                                src={member.employee.avatar ?
                                  <img src={member.employee.avatar} alt="avatar" sizes="small" /> : <UserOutlined />
                                }
                              />
                              {member.employee.name}
                            </Option>
                          ))}
                        </Select>
                      ) : (
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
                      )
                    }
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Language/Framework">
                    {editMode ? (
                      langFrame.map((item, index) => (
                        <div key={index} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                          <Input
                            value={item}
                            onChange={(e) => handleLangFrameInputChange(e, index)}
                            style={{ width: '120px', marginRight: '8px' }}
                            placeholder="Language/Framework"
                          />
                          <Button type="danger" onClick={() => handleRemoveLangFrame(index)}>
                            Remove
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div style={{ width: "300px", display: "flex", flexWrap: 'wrap' }}>
                        {langFrame.map((item, index) => (
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
                            {item}
                          </Button>
                        ))}
                      </div>
                    )}

                    {editMode && (
                      <Button type="primary" onClick={handleAddLangFrame}>
                        Add Language/Framework
                      </Button>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Technology">
                    {
                      editMode ? (
                        technology.map((item, index) => (
                          <div key={index} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                            <Input
                              value={item}
                              onChange={(e) => handleTechInputChange(e, index)}
                              style={{ width: '120px', marginRight: '8px' }}
                              placeholder="Language/Framework"
                            />
                            <Button type="danger" onClick={() => handleRemoveTech(index)}>
                              Remove
                            </Button>
                          </div>
                        ))
                      ) : (
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
                      )
                    }

                    {editMode && (
                      <Button type="primary" onClick={handleAddTech}>
                        Add Technology
                      </Button>
                    )}
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
    </Card >

  )
}
