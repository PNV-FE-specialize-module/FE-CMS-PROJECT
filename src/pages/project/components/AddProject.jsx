import React, { useState, useEffect } from 'react'; 
import "../../../style/AddProject.css"
import { Button, DatePicker, Form, Input, Row, Col, Modal, Select } from 'antd';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
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
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [memberOption, setMemberOptions] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});
  const [selectedManagers, setSelectedManagers] = useState([]);
  const [managerOptions, setManagerOptions] = useState([]);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/employee/managers');
        const data = response.data;
        const managerData = data.map(manager => ({
          id: manager.id,
          name: manager.name,
        }));
        setManagerOptions(managerData);
      } catch (error) {
        console.error('Error fetching managers:', error);
      }
    };

    fetchManagers();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3000/employee');
        const data = response.data.data;
        const employeeData = data.map(employee => ({
          id: employee.id,
          name: employee.name,
        }));
        setMemberOptions(employeeData);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);


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
      const { data } = await postAddProject(values);
      console.log('Mutation result:', data); 
      console.log('Employee updated successfully!');
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
    <>
      <Button type="primary" onClick={showModal}>
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
            xs: { span: 6 },
            sm: { span: 6},
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 16 },
          }}
          layout="horizontal"
          onFinish={onFinish}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                placeholder="Enter project name"
                label="Project name"
                name="name"
                rules={[{ required: true, message: 'Please enter Name!' }]}
              >
                <Input placeholder="Enter project name" />
              </Form.Item>
              <Form.Item
                label="Manager"
                name="managerId"
                rules={[{ required: true, message: 'Please select a Manager!' }]}
              >
                <Select
                  placeholder="Choose manager"
                  value={selectedManagers}
                  onChange={setSelectedManagers}
                  style={{ width: '100%' }}
                >
                  {managerOptions.map((managerOption) => (
                    <Option key={managerOption.id} value={managerOption.id}>
                      {managerOption.name}
                    </Option>
                  ))}
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
            <Col xs={24} sm={12}>
              <Form.Item
                label="LangFrame"
                name="langFrame"
                rules={[{ required: true, message: 'Please enter Language/Framework!' }]}
              >
                <Select mode="multiple" placeholder="Choose Languages and Framework">
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
                <Select mode="multiple" placeholder="Choose Technologies">
                  <Option value="git">Git</Option>
                  <Option value="github">GitLab</Option>
                  <Option value="gitlab">GitHub</Option>
                  <Option value="aws">AWS CodeCommit</Option>
                  <Option value="bitb">Bitbucket</Option>
                  <Option value="blockc">Blockchain</Option>
                </Select>
              </Form.Item>
          
              
              
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please enter description' }]}
              >
                <TextArea rows={4} placeholder="Description of project" />
              </Form.Item>
             
            </Col>
          </Row>
          <Row gutter={[2,2]}>
            <Col span={24}>
            </Col>
            </Row>
        </Form>
      </Modal>
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </>
  );
};

export default AddProject;
