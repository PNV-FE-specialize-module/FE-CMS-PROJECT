import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Space, Tag, Button, Col, Select, Progress, Typography, Avatar, Tooltip } from 'antd';
import { EyeOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { checkProjectStatus, getStatusColor } from '../../components/enum/enum';
import { useGetProject } from '../../hooks/useProject';
import { useGetData, useProjectStatusUpdate } from '../../hooks/useProject';
import AddProject from './components/AddProject';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const ListProject = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [status, setStatus] = useState("");
  const { t, i18n } = useTranslation();
  const { Option } = Select;
  const navigate = useNavigate();

  const paginateOptions = {
    status: status,
  };
  const { data: projects, isLoading, isError, error } = useGetData(paginateOptions);

  const projectStatusUpdateMutation = useProjectStatusUpdate();

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      console.log(newStatus); 
      await projectStatusUpdateMutation.mutateAsync({
        projectId,
        status: newStatus,
      });
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };
  // const filterProjectsByStatus = (status) => {
  //   if (!projects || !projects.data) {
  //     return [];
  //   }
  //   if (status === "") {
  //     return projects.data;
  //   }
  //   return projects.data.filter((project) => project.status === status);
  // };

  const Circleprogress = ({ project }) => {
    if (project.status === 'pending') {
      return (
        <Progress
          type="circle"
          percent={0}
          width={50}
          format={() => `0%`}
        />
      );
    }

    if (project.status === 'done') {
      return (
        <Progress
          type="circle"
          percent={100}
          width={50}
          format={() => '100%'}
        />
      );
    }
    if (project.status === 'on_progress') {
      const startDate = new Date(project.startDate).getTime();
      const endDate = new Date(project.endDate).getTime();
      const currentTime = new Date().getTime();

      const totalDuration = endDate - startDate;
      const elapsedTime = currentTime - startDate;
      const process = Math.min((elapsedTime / totalDuration) * 100);
      return (
        <Progress
          type="circle"
          percent={process}
          width={50}
          format={() => `${process.toFixed(2)}%`}
        />
      );
    }
    return (
      <Progress
        type="circle"
        percent={project.process || 0}
        width={50}
        format={() => `${project.process}%`}
      />
    );
  };
  const columns = [
    {
      title: t('main.Name'),
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span style={{ fontWeight: 'bold',fontSize:'16px' }}>{text}</span>,
    },    
    {
      title: t('main.Manager Project'),
      dataIndex: 'managerProject',
      key: 'managerProject',
      render: (managerProject) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={managerProject.avatar}
            alt={managerProject.name}
            style={{ width: '36px', height: '36px', marginRight: '8px', borderRadius: '50%' }}
          />
          {managerProject.name}
        </div>
      ),
    },
    {
      title: t('main.Technology'),
      key: 'technology',
      dataIndex: 'technology',
      render: (text, record) => (
        <>
          {record.technology.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: t('main.Members'),
      key: 'members',
      dataIndex: 'employee_project',
      render: (employeeProject) => (
        <Col span={4}>
          <div className="project-employee-avatar">
            <Avatar.Group maxCount={2} size={40}>
              {employeeProject.map((member, index) => (
                <Tooltip title={member.employee?.name} key={member.id}>
                  <Avatar
                    src={member.employee?.avatar}
                    style={{
                      backgroundColor: "#87D068",
                    }}
                  />
                </Tooltip>
              ))}
            </Avatar.Group>
          </div>
        </Col>
      ),
    },
    {
      title: t('main.Process'),
      dataIndex: 'process',
      key: 'process',
      render: (text, project) => (
        <Col span={4}>
          <div
            className="circle-progress"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Circleprogress project={project} />
          </div>
        </Col>
      ),
      with: 100,
    },
    {
      title: t('main.Status'),
      dataIndex: 'status',
      key: 'status',
      render: (text, project) => (
        <Col span={3}>
          <Space wrap>
            <Select
              defaultValue={project.status}
              style={{
                width: 100,
              }}
              onChange={(newStatus) => {
                handleStatusChange(project.id, newStatus);
              }}
            >
              <Option value="pending">{t('main.Pending')}</Option>
              <Option value="on_progress">{t('main.On Progress')}</Option>
              <Option value="done">{t('main.Done')}</Option>
              <Option value="closed" disabled>
              {t('main.Closed')}
              </Option>
            </Select>
          </Space>
        </Col>
      ),
    },
    {
      title: t('main.Start Date'),
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text) => new Date(text).toLocaleDateString('en-US'),
    },
    {
      title: t('main.End Date'),
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text) => new Date(text).toLocaleDateString('en-US'),
    },
  ];
  const [selectedStatus, setSelectedStatus] = useState("");
  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };
  return (
    <div>
      <Spin spinning={isLoading} tip={t('main.Loading...')}>
        {isError && <Alert message={error.message} type="error" />}
        {projects && projects.data ? (
          Array.isArray(projects.data) && projects.data.length > 0 ? (
            <>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ float: 'right', margin: '10px' }}
                onClick={() => setIsModalVisible(true)}
              >
                {t('main.Add Project')}
              </Button>
              <div className="status">
                <Button type="secondary" onClick={() => handleStatusClick("")}
                 style={{ backgroundColor: selectedStatus === "" ? '#5D5FEF' : '', color: selectedStatus === "" ? '#FFF' : '' }}>
                  {t('main.All Status')}
                </Button>
                <Button type="secondary" onClick={() => handleStatusClick("pending")}
                 style={{ backgroundColor: selectedStatus === "pending" ? '#5D5FEF' : '', color: selectedStatus === "pending" ? '#FFF' : '' }}>
                  {t('main.Pending')}
                </Button>
                <Button type="secondary" onClick={() => handleStatusClick("on_progress")}
                 style={{ backgroundColor: selectedStatus === "on_progress" ? '#5D5FEF' : '', color: selectedStatus === "on_progress" ? '#FFF' : '' }}>
                 {t('main.On Progress')}
                </Button>
                <Button type="secondary" onClick={() => handleStatusClick("done")}
                 style={{ backgroundColor: selectedStatus === "done" ? '#5D5FEF' : '', color: selectedStatus === "done" ? '#FFF' : '' }}>
                  {t('main.Done')}
                </Button>
              </div>
              <AddProject isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} data={projects.data} />
              <Table
                columns={columns}
                dataSource={projects.data.filter((project) => !selectedStatus || project.status === selectedStatus)}
                rowKey={(record) => record.id}
              />
            </>
          ) : (
            <p>{t('main.No data to display')}</p>
          )
        ) : (
          <p>{t('main.Loading...')}</p>
        )}
      </Spin>
    </div>
  );
};
export default ListProject;