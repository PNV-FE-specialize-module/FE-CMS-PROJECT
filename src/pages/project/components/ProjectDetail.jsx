import React, { useState } from 'react'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import { useGetDetaiProject, useUpdateProject } from '../../../hooks/useProject';
import { Row, Col, Button, Form, Input, Typography, Card, Spin, Select, Avatar, DatePicker, Table } from 'antd';
import { StatusProjectEnum, checkProjectStatus } from '../../../components/enum/enum';
import { useGetManager } from '../../../hooks/useEmployee';
import dayjs from 'dayjs';


const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;


export const ProjectDetail = () => {
  const { id } = useParams();
  const { data: project, isLoading, isError, error } = useGetDetaiProject(id);
  const { data: managers } = useGetManager();
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
      setEditedProject({ ...project?.project });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStartDateChange = (date, dateString) => {
    setEditedProject((prevState) => ({
      ...prevState,
      startDate: dateString,
    }));
  };

  const handleEndDateChange = (date, dateString) => {
    setEditedProject((prevState) => ({
      ...prevState,
      endDate: dateString,
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


  console.log("Update date", editedProject);

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

  const teamMember = [
  
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ROLE",
      dataIndex: "role",
      key: "role"
    },

  ];

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
                  <Form.Item label="Project Name" name="nameProject" initialValue={name}>
                    {
                      editMode ? (<Input
                        style={{ maxWidth: "300px" }}
                        value={editedProject.name}
                        name='name'
                        onChange={handleInputChange}
                      />) : (
                        <Input
                          style={{ maxWidth: "300px" }}
                          value={name}
                          disabled
                        />
                      )}
                  </Form.Item>

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
                  <Form.Item label="Manager Name" name="managername" initialValue={managerProject.name}>
                    {editMode ? (
                      <Select
                        style={{ width: "300px" }}
                        placeholder="Select Manager"
                        defaultValue={managerProject.managerId}
                        onChange={(value) => handleInputChange({ target: { name: 'managerId', value } })}
                      >
                        {managers.map(manager => (
                          <Select.Option key={manager.id} value={manager.id}>
                            <Avatar
                              src={manager.avatar ? <img src={manager.avatar} alt="avatar" sizes="small" /> : <UserOutlined />}
                              style={{ marginRight: 10 }}
                            />
                            {manager.name}
                          </Select.Option>
                        ))}
                      </Select>
                    ) : (
                      // <Input
                      //   style={{ maxWidth: "300px" }}
                      //   value={managerProject.name}
                      //   disabled
                      // />
                      <div>
                        <Avatar
                          src={managerProject.avatar ? <img src={managerProject.avatar} alt="avatar" size="large" /> : <UserOutlined />}
                          style={{ marginRight: 10, height: 110, width: 110 }}
                        />
                        <Title level={4}>{managerProject.name}</Title>
                      </div>
                    )}
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item label="Team Member" initialValue={employee_project}>
                    {
                      editMode ? (
                        <Row gutter={24}>
                          <Col span={12}>
                            <Form.Item>
                              <Select
                                value={editedProject.employee_project}
                                onChange={(value) => handleInputChange({ target: { name: "employee", value } })}
                                placeholder="Team Member"
                                style={{ maxWidth: "300px" }}
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
                            </Form.Item>
                            <Form.Item label="Role">
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
                            </Form.Item>
                            <Button
                              type="primary"
                              icon={<PlusOutlined />}
                            >
                            </Button>
                          </Col>

                          <Col span={12}>
                            <Table
                              className="skills-table"
                              rowKey="name"
                              style={{
                                width: "300px",
                                maxHeight: "200px",
                                overflow: "auto",
                              }}
                              columns={[  
                                ...teamMember,
                              ]}
                              pagination={false}
                            />

                          </Col>

                        </Row>
                      ) : (
                        // <Select
                        //   placeholder="Team Member"
                        //   style={{ maxWidth: "300px" }}
                        // >
                        //   {employee_project.map((member, index) => (
                        //     <Option key={index} value={member.id} disabled>
                        //       <Avatar
                        //         src={member.employee.avatar ?
                        //           <img src={member.employee.avatar} alt="avatar" sizes="small" /> : <UserOutlined />
                        //         }
                        //       />
                        //       {member.employee.name}
                        //     </Option>
                        //   ))}
                        // </Select>
                        <Table
                          className="skills-table"
                          rowKey="name"
                          style={{
                            width: "90%",
                            maxHeight: "200px",
                            overflow: "auto",
                          }}
                          columns={[
                            {
                                title: "AVARTA",
                                dataIndex: "avarta",
                                key: "avatar",
                              },
                            ...teamMember,
                          ]}
                          pagination={false}
                        />
                      )
                    }
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Start Date">
                    {editMode ? (
                      <DatePicker
                        value={editedProject.startDate ? dayjs(editedProject.startDate) : null}
                        onChange={handleStartDateChange}
                        format="YYYY-MM-DD"
                        name='startDate'
                      />
                    ) : (
                      <Input
                        value={dayjs(startDate).format("YYYY-MM-DD")}
                        style={{ maxWidth: "300px" }}
                        disabled
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="End Date">
                    {editMode ? (
                      <DatePicker
                        value={editedProject.endDate ? dayjs(editedProject.endDate) : null}
                        onChange={handleEndDateChange}
                        format="YYYY-MM-DD"
                        name='endDate'
                      />
                    ) : (
                      <Input
                        value={dayjs(editedProject.endDate).format("YYYY-MM-DD")}
                        style={{ maxWidth: "300px" }}
                        disabled
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Specification" name="specification" initialValue={specification}>
                    {
                      editMode ? (<Input
                        style={{ maxWidth: "90%" }}
                        value={editedProject.specification}
                        name='specification'
                        onChange={handleInputChange}
                      />) : (
                        <Input
                          style={{ maxWidth: "90%" }} disabled />
                      )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Description" name="description" initialValue={description}>
                    {
                      editMode ? (
                        <TextArea
                          value={editedProject.description}
                          rows={4} style={{ width: '90%' }}
                          onChange={handleInputChange}
                          name='description'
                        />
                      ) : (
                        <TextArea
                          rows={4} style={{ width: '90%' }}
                          disabled
                        />
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
