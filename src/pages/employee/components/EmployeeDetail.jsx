import React, {useRef, useState} from 'react';
import { useParams } from "react-router-dom";
import { useGetDetailEmployee, useUpdateEmployee, useGetManager } from "../../../hooks/useEmployee.jsx";
import {Row, Col, Button, Form, Input, Typography, Card, Select, message, Space, Timeline, DatePicker} from 'antd';
import moment from "moment";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { Widget } from 'react-cloudinary-upload-widget';
// import { Image, Transformation, Widget } from 'cloudinary-react';

import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const EmployeeDetail = () => {
  const { id } = useParams();
  const { data: employee, isLoading, isError } = useGetDetailEmployee(id);
  const updateEmployeeMutation = useUpdateEmployee(id);
  const [editMode, setEditMode] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({});

  const [imageUrl, setImageUrl] = useState("");
  const [newAvatar, setNewAvatar] = useState(null);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const cld = new Cloudinary({ cloud: { cloudName: "da9hiv52w" } });
  const fileInputRef = useRef();
  const { data: managers } = useGetManager();


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
  const disabledDate = (current) => {
    return current && current > moment().endOf('day');
  };


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
  const handleDateOfBirthChange = (date, dateString) => {
    setEditedEmployee((prevState) => ({
      ...prevState,
      dateOfBirth: dateString,
    }));
  };
  const handleFileChange = async (file) => {
    setLoadingAvatar(true);
    const formData = new FormData();
    if (file instanceof FileList) {
      for (const individualFile of file) {
        formData.append("file", individualFile);
        formData.append("upload_preset", "ay2jrgsp");

        try {
          const res = await axios.post(
              "https://api.cloudinary.com/v1_1/da9hiv52w/image/upload",
              formData,
          );

          setEditedEmployee((prev) => ({
            ...prev,
            avatar: res.data.secure_url, // Update the avatar property
          }));

          message.success("Avatar uploaded successfully, Click change to apply ");
        } finally {
          setLoadingAvatar(false);
        }

        formData.delete("file");
      }
    } else {
      formData.append("file", file);
      formData.append("upload_preset", "ay2jrgsp");

      try {
        const res = await axios.post(
            "https://api.cloudinary.com/v1_1/da9hiv52w/image/upload",
            formData,
        );

        setImageUrl(res.data.secure_url);
      } catch (err) {
        console.error(err.response.data);
      }

    }

  };
  const {
    avatar,
    name,
    code,
    email,
    phone,
    address,
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
              <Col span={24}>
                <img
                    name="avatar"
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "100%",
                    }}
                    src={
                        imageUrl ||
                        (newAvatar
                            ? URL.createObjectURL(newAvatar)
                            : (editMode ? editedEmployee.avatar : employee.employee.avatar))
                    }

                    alt="Employee Avatar"
                />
                {loadingAvatar && (
                    <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          background: "rgba(255, 255, 255, 0.8)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          zIndex: 999,
                        }}
                    >
                      {/*<Spin size="large" />*/}
                    </div>
                )}
              </Col>
              <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files)}
                  style={{ display: "none" }}
                  ref={fileInputRef}
              />
              <Col span={24}>
                {editMode && (
                    <Button
                        style={{
                          margin: "10px",
                          borderRadius: "50px",
                          height: "35px",
                        }}
                        onClick={() => fileInputRef.current.click()}
                    >
                      Upload
                    </Button>
                )}
              </Col>
            </Row>
            <Row gutter={16} justify="center">
              <Col span={24}>
                <Form.Item label="Description">
                  {editMode ? (
                      <TextArea
                          rows={4}
                          value={editedEmployee.description}
                          onChange={handleInputChange}
                          name="description"
                      />
                  ) : (
                      <div style={{ maxWidth: "300px", whiteSpace: "pre-wrap" }}>
                        {description}
                      </div>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} justify="center">
              <Col span={24}>
                <Form.Item label="Projects">
                  <Timeline mode="left">l
                    {employee?.employee?.employee_project?.map((project, index) => (
                        <Timeline.Item key={index} label={`${moment(project?.project?.startDate).format('DD-MM-YYYY')} - ${moment(project?.project?.endDate).format('DD-MM-YYYY')}`}>
                          <div>
                            <strong>Name:</strong> {project?.project?.name}
                          </div>
                          <div>
                            <strong>Role:</strong> {project?.roles?.join(', ')}
                          </div>
                        </Timeline.Item>
                    ))}
                  </Timeline>
                </Form.Item>

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

                    {editMode ? (
                        <Select>
                          {(managers || []).map((manager) => (
                              <Select.Option key={manager.id} value={manager.id}>
                                {manager.name}
                              </Select.Option>
                          ))}
                        </Select>
                    ) : (
                        <Input
                            value={editMode ? editedEmployee.manager.name : name}
                            style={{ maxWidth: "300px" }}
                            disabled
                        />
                    )}
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
                        <DatePicker
                            value={moment(editedEmployee.dateOfBirth)}
                            style={{ maxWidth: "300px" }}
                            onChange={handleDateOfBirthChange}
                            disabledDate={disabledDate}
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
                  <Form.Item label="Address">
                    {editMode ? (
                        <Input
                            rows={4}
                            value={editedEmployee.address}
                            onChange={handleInputChange}
                            name="address"
                            style={{ maxWidth: '300px' }}
                        />
                    ) : (
                        <Input
                            name="address"
                            value={address}
                            style={{ maxWidth: '300px' }}
                            disabled
                        />
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
                              <Button
                                  type="danger"
                                  icon={<DeleteOutlined />}
                                  onClick={() => handleRemoveSkill(index)}
                              />

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
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAddSkill}
                        >
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
                              <Button
                                  type="danger"
                                  icon={<DeleteOutlined />}
                                  onClick={() => handleRemoveLangFrame(index)}
                              />
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
                            </div>
                        ))
                    )}

                    {editMode && (
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAddLangFrame}
                        >
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
                              <Button
                                  type="danger"
                                  icon={<DeleteOutlined />}
                                  onClick={() => handleRemoveTech(index)}
                              />
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
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAddTech}
                        >
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