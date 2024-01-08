import React, { useState, useEffect } from 'react'; 
import "../../../style/AddProject.css"
import { Button, DatePicker, Form, Input, Row, Col, Modal, Select } from 'antd';
import { postAddProject } from '../../../api/ProjectApi';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const { TextArea } = Input;
const { Option } = Select;

export const AddProject = ({isModalVisible,setIsModalVisible}) => {
  const [form] = Form.useForm();
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
        setManagerOptions(employeeData);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

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
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      const { data } = await postAddProject(values);
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
      <Modal
        title="Add Project"
        open={isModalVisible}
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
    </>
  );
};

export default AddProject;
