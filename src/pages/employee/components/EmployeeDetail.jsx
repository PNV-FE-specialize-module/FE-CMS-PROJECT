import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useGetDetailEmployee, useUpdateEmployee } from "../../../hooks/useEmployee.jsx";
import {Row, Col, Button, Form, Input, Typography, Card, Select, Table} from 'antd';
import moment from "moment";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { Widget } from 'react-cloudinary-upload-widget';
// import { Image, Transformation, Widget } from 'cloudinary-react';

const { TextArea } = Input;
const { Option } = Select;

const EmployeeDetail = () => {
  const { id } = useParams();
  const { data: employee, isLoading, isError } = useGetDetailEmployee(id);
  const updateEmployeeMutation = useUpdateEmployee(id);
  const [editMode, setEditMode] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>404 Not Found</div>;
  }
  // const handleImageUpload = (result) => {
  //   // 'result' contains information about the uploaded image
  //   const { event, info } = result;
  //   const imageUrl = info.secure_url; // The URL of the uploaded image
  //   setEditedEmployee((prev) => ({
  //     ...prev,
  //     avatar: imageUrl,
  //   }));
  // };


  const handleEditClick = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setEditedEmployee(employee?.employee);
    }
  };

  const handleAddSkill = () => {
    setEditedEmployee((prevState) => ({
      ...prevState,
      skills: [
        ...prevState.skills,
        { name: '', exp: '' }
      ],
    }));
  };

  const handleRemoveSkill = (indexToRemove) => {
    setEditedEmployee((prevState) => ({
      ...prevState,
      skills: prevState.skills.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSkillInputChange = (e, index, field) => {
    const { value } = e.target;
    setEditedEmployee((prevState) => ({
      ...prevState,
      skills: prevState.skills.map((skill, i) =>
          i === index ? { ...skill, [field]: value } : skill
      ),
    }));
  };
  const handleAddLangFrame = () => {
    setEditedEmployee((prevState) => ({
      ...prevState,
      langFrame: [
        ...prevState.langFrame,
        { name: '', exp: '' }
      ],
    }));
  };

  const handleRemoveLangFrame = (indexToRemove) => {
    setEditedEmployee((prevState) => ({
      ...prevState,
      langFrame: prevState.langFrame.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleLangFrameInputChange = (e, index, field) => {
    const { value } = e.target;
    setEditedEmployee((prevState) => ({
      ...prevState,
      langFrame: prevState.langFrame.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddTech = () => {
    setEditedEmployee((prevState) => ({
      ...prevState,
      tech: [
        ...prevState.tech,
        { name: '', exp: '' }
      ],
    }));
  };

  const handleRemoveTech = (indexToRemove) => {
    setEditedEmployee((prevState) => ({
      ...prevState,
      tech: prevState.tech.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleTechInputChange = (e, index, field) => {
    const { value } = e.target;
    setEditedEmployee((prevState) => ({
      ...prevState,
      tech: prevState.tech.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
      ),
    }));
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleImageUpload = (result) => {
    const { event, info } = result;
    const imageUrl = info.secure_url;
    setEditedEmployee((prev) => ({
      ...prev,
      avatar: imageUrl,
    }));
  };

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
    langFrame,
    tech,
    description,
    manager,
  } = editMode ? editedEmployee : employee?.employee;

  const handleSaveClick = async () => {
    try {
      const result = await updateEmployeeMutation.mutateAsync(editedEmployee);

      console.log('Mutation result:', result);
      console.log('Employee updated successfully!');
      setEditMode(false)
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Employee updated successfully!',
      });
    } catch (error) {
      console.error('Error updating employee:', error);

      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update employee. Please try again.',
      });
    }
  };
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
                <Widget
                    sources={['local', 'url', 'camera', 'facebook', 'google_photos']}
                    resourceType="image"
                    cloudName="da9hiv52w"
                    uploadPreset="avatar"
                    buttonText="Upload Image"
                    folder="avatars"
                    onSuccess={handleImageUpload}
                    onFailure={() => console.log('Image upload failed')}
                />
              </Col>
            </Row>
          </Col>
          <Col md={24} lg={16}>
            <Form layout="vertical">
              <Typography.Title level={3} style={{ lineHeight: "30px" }}>
                Employee Information
              </Typography.Title>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Employee Code">
                    <Input
                        name="code"
                        value={editMode ? editedEmployee.code : code}
                        style={{ maxWidth: "300px" }}
                        disabled
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Manager Name">
                    <Input
                        name="managerName"
                        value={manager?.name ? manager.name : "No Manager"}
                        style={{ maxWidth: "300px" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Name">
                    {editMode ? (
                        <Input
                            name="name"
                            value={editedEmployee.name}
                            onChange={handleInputChange}
                            style={{ maxWidth: '300px' }}
                        />
                    ) : (
                        <Input
                            name="name"
                            value={name}
                            style={{ maxWidth: '300px' }}
                            disabled
                        />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email">
                    {editMode ? (
                        <Input
                            name="email"
                            value={editedEmployee.email}
                            onChange={handleInputChange}
                            style={{ maxWidth: '300px' }}
                        />
                    ) : (
                        <Input
                            name="email"
                            value={email}
                            style={{ maxWidth: '300px' }}
                            disabled
                        />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Phone Number">
                    {editMode ? (
                        <Input
                            name="phone"
                            value={editedEmployee.phone}
                            onChange={handleInputChange}
                            style={{ maxWidth: '300px' }}
                        />
                    ) : (
                        <Input
                            name="phone"
                            value={phone}
                            style={{ maxWidth: '300px' }}
                            disabled
                        />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Identity Card">
                    {editMode ? (
                        <Input
                            name="identityCard"
                            value={editedEmployee.identityCard}
                            onChange={handleInputChange}
                            style={{ maxWidth: '300px' }}
                        />
                    ) : (
                        <Input
                            name="identityCard"
                            value={identityCard}
                            style={{ maxWidth: '300px' }}
                            disabled
                        />
                    )}
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
                  <Form.Item label="Gender">
                    {editMode ? (
                        <Select
                            value={editedEmployee.gender}
                            style={{ maxWidth: "300px" }}
                            onChange={(value) => handleInputChange({ target: { name: "gender", value } })}
                        >
                          <Option value="male">Male</Option>
                          <Option value="female">Female</Option>
                        </Select>
                    ) : (
                        <Input
                            value={{ male: "Male", female: "Female" }[gender] || ""}
                            style={{ maxWidth: "300px" }}
                            disabled
                        />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Position">
                    {editMode ? (
                        <Select
                            value={editedEmployee.position}
                            style={{ maxWidth: "300px" }}
                            onChange={(value) => handleInputChange({ target: { name: "position", value } })}
                        >
                          <Option value="fe">Front-end Dev</Option>
                          <Option value="be">Back-end Dev</Option>
                          <Option value="fullstack">FullStack</Option>
                          <Option value="ba">Business Analysis</Option>
                          <Option value="qa">Quality Assurance</Option>
                          <Option value="devops">DevOps Engineer</Option>
                          <Option value="ux_ui">User Experience</Option>
                        </Select>
                    ) : (
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
                            disabled
                        />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Status">
                    {editMode ? (
                        <Select
                            value={editedEmployee.status}
                            style={{ maxWidth: "300px" }}
                            onChange={(value) => handleInputChange({ target: { name: "status", value } })}
                        >
                          <Option value="active">Active</Option>
                          <Option value="inactive">Inactive</Option>
                        </Select>
                    ) : (
                        <Input
                            value={{ active: "Active", inactive: "Inactive" }[status] || ""}
                            style={{ maxWidth: "300px" }}
                            disabled
                        />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Description">
                    {editMode ? (
                        <TextArea
                            rows={4}
                            value={editedEmployee.description}
                            onChange={handleInputChange}
                            name="description"
                        />
                    ) : (
                        <TextArea rows={4} value={description} disabled />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Skills">
                    {editMode ? (
                        skills.map((skill, index) => (
                            <div key={index} style={{ marginBottom: '8px' }}>
                              <Input
                                  value={editedEmployee?.skills[index].name}
                                  onChange={(e) => handleSkillInputChange(e, index, 'name')}
                                  style={{ width: '120px', marginRight: '8px' }}
                                  placeholder="Skill Name"
                              />
                              <Input
                                  value={editedEmployee?.skills[index].exp}
                                  onChange={(e) => handleSkillInputChange(e, index, 'exp')}
                                  style={{ width: '80px', marginRight: '8px' }}
                                  placeholder="Experience"
                              />
                              <Button type="danger" onClick={() => handleRemoveSkill(index)}>
                                Remove
                              </Button>
                            </div>
                        ))
                    ) : (
                        skills.map((skill, index) => (
                            <div key={index} style={{ marginBottom: '8px' }}>
                              <Input
                                  value={skill.name}
                                  style={{ width: '120px', marginRight: '8px' }}
                                  placeholder="Skill Name"
                                  disabled
                              />
                              <Input
                                  value={skill.exp}
                                  style={{ width: '80px', marginRight: '8px' }}
                                  placeholder="Experience"
                                  disabled
                              />
                            </div>
                        ))
                    )}
                    {editMode && (
                        // Button to add a new skill input field
                        <Button type="primary" onClick={handleAddSkill}>
                          Add Skill
                        </Button>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Language/Framework">
                    {editMode ? (
                        langFrame.map((item, index) => (
                            <div key={index} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                              <Input
                                  value={item.name}
                                  onChange={(e) => handleLangFrameInputChange(e, index, 'name')}
                                  style={{ width: '120px', marginRight: '8px' }}
                                  placeholder="Language/Framework"
                              />
                              <Input
                                  value={item.exp}
                                  onChange={(e) => handleLangFrameInputChange(e, index, 'exp')}
                                  style={{ width: '80px', marginRight: '8px' }}
                                  placeholder="Experience"
                              />
                              <Button type="danger" onClick={() => handleRemoveLangFrame(index)}>
                                Remove
                              </Button>
                            </div>
                        ))
                    ) : (
                        langFrame.map((item, index) => (
                            <div key={index} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                              <Input
                                  value={item.name}
                                  style={{ width: '120px', marginRight: '8px' }}
                                  placeholder="Language/Framework"
                                  disabled
                              />
                              <Input
                                  value={item.exp}
                                  // onChange={(e) => handleLangFrameInputChange(e, index, 'exp')}
                                  style={{ width: '80px', marginRight: '8px' }}
                                  placeholder="Experience"
                                  disabled
                              />
                              <Button type="danger" onClick={() => handleRemoveLangFrame(index)}>
                                <i className="fas fa-trash"></i>
                              </Button>
                            </div>
                        ))
                    )}

                    {editMode && (
                        // Button to add a new language/framework input field
                        <Button type="primary" onClick={handleAddLangFrame}>
                          Add Language/Framework
                        </Button>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Tech">
                    {editMode ? (
                        // Display input fields for editing tech
                        tech.map((item, index) => (
                            <div key={index} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                              <Input
                                  value={item.name}
                                  onChange={(e) => handleTechInputChange(e, index, 'name')}
                                  style={{ width: '120px', marginRight: '8px' }}
                                  placeholder="Tech"
                              />
                              <Input
                                  value={item.exp}
                                  onChange={(e) => handleTechInputChange(e, index, 'exp')}
                                  style={{ width: '80px', marginRight: '8px' }}
                                  placeholder="Experience"
                              />
                              <Button type="danger" onClick={() => handleRemoveTech(index)}>
                                Remove
                              </Button>
                            </div>
                        ))
                    ) : (
                        // Display tech in a table format
                        tech.map((item, index) => (
                            <div key={index} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                              <Input
                                  value={item.name}
                                  // onChange={(e) => handleTechInputChange(e, index, 'name')}
                                  style={{ width: '120px', marginRight: '8px' }}
                                  placeholder="Tech"
                                  disabled
                              />
                              <Input
                                  value={item.exp}
                                  // onChange={(e) => handleTechInputChange(e, index, 'exp')}
                                  style={{ width: '80px', marginRight: '8px' }}
                                  placeholder="Experience"
                                  disabled
                              />
                            </div>
                        ))

                    )}
                    {editMode && (
                        // Button to add a new tech input field
                        <Button type="primary" onClick={handleAddTech}>
                          Add Tech
                        </Button>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={8} justify="center">
                <Col>
                  {editMode ? (
                      <Button type="primary" onClick={handleSaveClick}>
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
            </Form>
          </Col>
        </Row>
      </Card>
  );
};

export default EmployeeDetail;