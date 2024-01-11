import React, { useState } from 'react';
import "../../../style/AddProject.css"
import { Button, DatePicker, Form, Input, Row, Col, Modal, Select } from 'antd';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useTranslation} from 'react-i18next';
import {useGetManager} from "../../../hooks/useEmployee.jsx";
import { useAddProject } from '../../../hooks/useProject.jsx';
import moment from 'moment';


const { TextArea } = Input;
const { Option } = Select;

export const AddProject = ({ isModalVisible, setIsModalVisible }) => {
  const [form] = Form.useForm();
  const [selectedManagers, setSelectedManagers] = useState([]);
  const { t, i18n } = useTranslation();
  const { data: managers } = useGetManager();
  const { mutate: addProject } = useAddProject();

  const disabledStartDate = (current) => {
    const today = moment();
    return current && current.isBefore(today.startOf('day'));
  };
  
  const disabledEndDate = (current) => {
    const today = moment();
    const startDateValue = form.getFieldValue('startDate'); 
    return current && (current.isBefore(today.startOf('day')) || current.isBefore(startDateValue));
  };
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onFinish(values);
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.error("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
  
    try {
      addProject(values);
    } catch (error) {
      console.error(t('main.Error updating employee:'), error);
      Swal.fire({
        icon: 'error',
        title: t('main.Error'),
        text: t('main.Failed to update employee. Please try again.'),
      });
    }
  };
  return (
    <>
      <Modal
        title={t("main.Add Project")}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t("main.Cancle")}
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            {t("main.Add")}
          </Button>
        ]}
      >
        <Form
          form={form}
          labelCol={{
            xs: { span: 8 },
            sm: { span: 8 },
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
                placeholder={t("main.Enter project name")}
                label={t("main.Project Name")}
                name="name"
                rules={[{ required: true, message: t('main.Please enter project name!') }]}
              >
                <Input placeholder={t("main.Enter project name")} />
              </Form.Item>
              <Form.Item
                label={t("main.Manager Name")}
                name="managerId"
                rules={[{ required: true, message: t('main.Please select a Manager!') }]}
              >
                <Select
                  placeholder={t("main.Choose manager")}
                  value={selectedManagers}
                  onChange={setSelectedManagers}
                  style={{ width: "100%" }}
                >
                  {managers?.map((managerOption) => (
                    <Option key={managerOption.id} value={managerOption.id}>
                      {managerOption.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label={t("main.Start Date")}
                name="startDate"
                rules={[{ required: true, message: t('main.Please select Start Date!') }]}
              >
               <DatePicker disabledDate={disabledStartDate} />
              </Form.Item>
              <Form.Item
                label={t("main.End Date")}
                name="endDate"
                rules={[{ required: true, message: t( 'main.Please select End Date!') }]}
              >
                <DatePicker disabledDate={disabledEndDate } />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={t("main.LangFrame")}
                name="langFrame"
                rules={[
                  {
                    required: true,
                    message: t('main.Please enter Language/Framework!'),
                  },
                ]}
                wrapperCol={{ span: 14 }}
                style={{ height: 'fit-content', display: 'flex', flexDirection: 'column' }}
                >
                <Select
                  mode="multiple"
                  placeholder={t("main.Choose Languages and Framework")}
                  autoSize={{ minRows: 2, maxRows: 6 }}
                  style={{ height: 'auto', maxHeight: '100px' }}

                >
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
                label={t("main.Technology")}
                name="technology"
                rules={[
                  { required: true, message: t('main.Please enter Technology!') },
                ]}
                wrapperCol={{ span: 14 }}
                style={{ height: 'fit-content', display: 'flex', flexDirection: 'column' }}
              >
                <Select mode="multiple" placeholder={t("main.Choose Technologies")}
                autoSize={{ minRows: 2, maxRows: 6 }}
                style={{ height: 'auto', maxHeight: '100px' }}>
                  <Option value="git">Git</Option>
                  <Option value="github">GitLab</Option>
                  <Option value="gitlab">GitHub</Option>
                  <Option value="aws">AWS CodeCommit</Option>
                  <Option value="bitb">Bitbucket</Option>
                  <Option value="blockc">Blockchain</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label={t("main.Description")}
                name="description"
                rules={[{ required: true, message: t('main.Please enter description') }]}
              >
                <TextArea rows={4} placeholder={t("main.Description of project")} />
              </Form.Item>
            </Col>
          </Row>
        {/* Assign member here */}
          <Row gutter={[2, 2]}>
            <Col span={24}></Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AddProject;
