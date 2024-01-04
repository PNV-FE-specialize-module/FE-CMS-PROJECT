import React, { useState, useEffect } from 'react'; 
import "../../../style/AddProject.css"
import { Button, DatePicker, Form, Input, Row, Col, Modal, Select } from 'antd';
import { postAddProject } from '../../../api/ProjectApi';
import { getDetailEmployee } from '../../../api/EmployeeApi';
import axios from 'axios';
 
const { TextArea } = Input;
const { Option } = Select;

const AddProject = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        await axios.get('http://localhost:3000/employee').then(res => {
        const data = res.data.data

        setEmployeeOptions(data.map(employee => employee.id))
        })
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();

  }, []);

  
  console.log(employeeOptions);
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
    try {
      const { data } = await postAddProject(values);

      setSuccessMessage('Data added successfully!');
      setErrorMessage(null);

      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error while saving data:', error);

      setSuccessMessage(null);
      setErrorMessage('Failed to add data. Please try again.');

      if (error.response) {
        console.error('Server Error Response:', error.response.data);
      }
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
            height: 350,
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
                <Input />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please enter Description!' }]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item
                label="Specification"
                name="specification"
                rules={[{ required: true, message: 'Please enter Specification!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Members"
                name="selectedMembers"
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
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: 'Please select Status!' }]}
              >
                
                <Select className="option">
                  <Option className="done" value="done">Done</Option>
                  <Option className="onp" value="on_progress">On Progress</Option>
                  <Option className="pending" value="pending">Pending</Option>
                  <Option className="closed" value="closed">Closed</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Language/Framework"
                name="langFrame"
                rules={[{ required: true, message: 'Please enter Language/Framework!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Technology"
                name="technology"
                rules={[{ required: true, message: 'Please enter Technology!' }]}
              >
                <Input />
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
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: 'Please select Role!' }]}
              >
                <Select>
                  <Option value="fe">Front-end</Option>
                  <Option value="be">Back-end</Option>
                  <Option value="qa">QA</Option>
                  <Option value="ba">Business Analyst</Option>
                  <Option value="fullstack">Full-Stack</Option>
                  <Option value="devops">DevOps Engineer</Option>
                  <Option value="ui_ux">UI/UX Designer</Option>
                </Select>
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
