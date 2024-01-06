import React, { useState, useEffect } from 'react'; 
import "../../../style/AddProject.css"
import { Button, DatePicker, Form, Input, Row, Col, Modal, Select } from 'antd';
import { postAddProject } from '../../../api/ProjectApi';
import { getDetailEmployee } from '../../../api/EmployeeApi';
import axios from 'axios';
 
const { TextArea } = Input;
const { Option } = Select;

export const AddProject = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  // const [selectedMembers, setSelectedMembers] = useState([]);
  // const [employeeOptions, setEmployeeOptions] = useState([]);
  const [selectedManagers, setSelectedManagers] = useState([]);
  const [managerOptions, setManagerOptions] = useState([]);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        await axios.get('http://localhost:3000/employee/managers').then(res => {
        const data = res.data

        setManagerOptions(data.map(manager => manager.id))
        })
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchManagers();

  }, []);

  // useEffect(() => {
  //   const fetchEmployees = async () => {
  //     try {
  //       await axios.get('http://localhost:3000/employee').then(res => {
  //       const data = res.data.data

  //       setEmployeeOptions(data.map(employee => employee.id))
  //       })
  //     } catch (error) {
  //       console.error('Error fetching employees:', error);
  //     }
  //   };

  //   fetchEmployees();

  // }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setIsModalVisible(false);
        onFinish(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    values.startDate  = values.startDate.toISOString();
    values.endDate= values.endDate.toISOString();
    if (!values.description) {
      values.description=null
    }
    try {
      const {data} = await postAddProject(values);
      setSuccessMessage('Data added successfully!');
    } catch (error) {
      setErrorMessage('Failed to add data. Please try again.');
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal} >
        Add Project
      </Button>
      <Modal
        title="Add Project"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Add
          </Button>
        ]}
      >
        <Form
          form={form}
          labelCol={{
            xs: { span: 24 },
            sm: { span: 8 },
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 16 },
          }}
          layout="horizontal"
          onFinish={onFinish}
          style={{
            height: 300,
          }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Project name"
                name="name"
                rules={[{ required: true, message: 'Please enter Name!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Manager ID"
                name="managerId"
                rules={[{ required: true, message: 'Please enter Manager ID!' }]}
              >
                 <Select
                  placeholder=""
                  value={selectedManagers}
                  onChange={setSelectedManagers}
                  style={{ width: '100%' }}
                >
                  {managerOptions.map((managerOption) => (
                    <Option value={managerOption}/>
                  ))}
                </Select>
              </Form.Item>
              {/* <Form.Item
                label="Members"
                name="selectedMembers"
                rules={[{ required: true, message: 'Please enter members' }]}
              >

                <Select
                  mode="multiple"
                  placeholder=""
                  value={selectedMembers}
                  onChange={setSelectedMembers}
                  style={{ width: '100%' }}
                >
                  {employeeOptions.map((employeeOption) => (
                    <Option value={employeeOption}/>
                  ))}
                </Select>
              </Form.Item> */}
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please enter description' }]}
              >
                <TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Language/Framework"
                name="langFrame"
                rules={[{ required: true, message: 'Please enter Language/Framework!' }]}
              >
                 <Select  mode="multiple">
                  <Option value="reactjs">ReactJs</Option>
                  <Option value="htmlcss">HTML/CSS</Option>
                  <Option value="nodejs">NodeJs</Option>
                  <Option value="net">.NET</Option>
                  <Option value="py">Python</Option>
                  <Option value="java">Java</Option>
                  <Option value="ang">AngularJs</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Technology"
                name="technology"
                rules={[{ required: true, message: 'Please enter Technology!' }]}
              >
                <Select  mode="multiple">
                  <Option value="git">Git</Option>
                  <Option value="github">GitLab</Option>
                  <Option value="gitlab">GitHub</Option>
                  <Option value="aws">AWS CodeCommit</Option>
                  <Option value="bitb">Bitbucket</Option>
                  <Option value="blockc">Blockchain</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Start Date"
                name="startDate"
                rules={[{ required: true, message: 'Please select Start Date!' }]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="End Date"
                name="endDate"
                rules={[{ required: true, message: 'Please select End Date!' }]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      {successMessage && (
        <div style={{ color: 'green' }}>{successMessage}</div>
      )}
      {errorMessage && (
        <div style={{ color: 'red' }}>{errorMessage}</div>
      )}
    </>
  );
};

export default AddProject;
