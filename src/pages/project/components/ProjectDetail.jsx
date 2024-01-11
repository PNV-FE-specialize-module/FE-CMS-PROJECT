import React, { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useParams } from "react-router-dom";

import {
  UserOutlined,
  PlusOutlined,
  CloseCircleOutlined,
  EditOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import {
  useGetDetaiProject,
  useUpdateProject,
  useDeleteProject,
} from "../../../hooks/useProject";
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  Typography,
  Card,
  Spin,
  Select,
  Avatar,
  DatePicker,
  Table,
  message,
  Flex,
} from "antd";
import {
  PositionEnum,
  StatusProjectEnum,
  checkProjectStatus,
} from "../../../components/enum/enum";
import { useGetAllEmployee, useGetManager } from "../../../hooks/useEmployee";
import dayjs from "dayjs";
import {
  useAssignEmployee,
  useUnassignEmployee,
  useUpdateAssign,
} from "../../../hooks/useAssign";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { values } from "lodash";

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

export const ProjectDetail = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { data: project, isLoading, isError, error } = useGetDetaiProject(id);
  const { t, i18n } = useTranslation();
  const [newMember, setNewMember] = useState("");
  const [newRole, setNewRole] = useState([]);
  const [updateRoles, setUpdateRoles] = useState([]);

  const { data: managers } = useGetManager();

  const { data: listEmployee } = useGetAllEmployee();

  const updateProject = useUpdateProject(id);
  const { mutate: deleteProject } = useDeleteProject();

  const [editMode, setEditMode] = useState(false);
  const [editAssignMode, setEditAssignMode] = useState(false);
  const [editedProject, setEditedProject] = useState({});

  const { mutate: assignEmployee } = useAssignEmployee();
  const { mutate: unAssignEmployee } = useUnassignEmployee();
  const { mutate: updateAssign } = useUpdateAssign();

  const disabledStartDate = (current) => {
    const today = moment();
    return current && current.isBefore(today.startOf("day"));
  };

  const disabledEndDate = (current) => {
    const today = moment();
    const startDateValue = form.getFieldValue("startDate");
    return (
      current &&
      (current.isBefore(today.startOf("day")) ||
        current.isBefore(startDateValue))
    );
  };

  if (isLoading) {
    return <Spin spinning={isLoading} tip={t("main.Loading...")}></Spin>;
  }

  if (isError) {
    return (
      <div>
        {t("main.Error loading project data:")} {error.message}
      </div>
    );
  }

  const {
    name,
    description,
    langFrame,
    technology,
    status,
    startDate,
    endDate,
    managerProject,
    employee_project,
  } = editMode ? editedProject : project?.project;

  const handleEditClick = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setEditedProject({ ...project?.project });
    }
  };
  const handleEditAssignClick = async () => {
    setEditAssignMode(!editAssignMode);
    if (!editAssignMode) {
      setEditedProject({ ...project?.project });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name == "employeeId") {
      setNewMember(value);
    }
    if (Array.isArray(value)) {
      const selectedValues = value.map((item) => item);
      setEditedProject((prevState) => ({
        ...prevState,
        [name]: selectedValues,
      }));
      setNewRole(value);
    } else {
      setEditedProject((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleUpdateRoleChange = (value) => {
    setUpdateRoles(value);
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
    setEditedProject((prevState) => ({
      ...prevState,
      langFrame: [...prevState.langFrame, ""],
    }));
  };

  const handleRemoveLangFrame = (indexToRemove) => {
    setEditedProject((prevState) => ({
      ...prevState,
      langFrame: prevState.langFrame.filter(
        (_, index) => index !== indexToRemove
      ),
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
    setEditedProject((prevState) => ({
      ...prevState,
      technology: [...prevState.technology, ""],
    }));
  };
  const handleRemoveTech = (indexToRemove) => {
    setEditedProject((prevState) => ({
      ...prevState,
      technology: prevState.technology.filter(
        (_, index) => index !== indexToRemove
      ),
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

  const handleDeleteConfirm = async () => {
    try {
      const result = await Swal.fire({
        title: "Confirmation",
        text: "Are you sure you want to delete this project?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        deleteProject(id);
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to delete project.",
        icon: "error",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  const handleSaveClick = async () => {
    try {
      const result = await updateProject.mutateAsync(editedProject);
      setEditMode(false);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Project updated successfully!",
      });
    } catch (error) {
      console.error("Error updating project:", error);

      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update project. Please try again.",
      });
    }
  };

  const teamMember = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "ROLE",
      dataIndex: "roles",
      key: "roles",
    },
  ];

  const selectRole = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "ROLE",
      dataIndex: "roles",
      key: "roles",
      render: (role) => {
        const roleArray = role.split(", ");
        return (
          <Select
            defaultValue={roleArray}
            mode="multiple"
            autoSize={{ minRows: 2, maxRows: 6 }}
            style={{
              height: "auto",
              maxHeight: "100px",
              maxWidth: 300,
            }}
            onChange={(value) => handleUpdateRoleChange(value)}
            placeholder="Select roles"
          >
            <Option value={PositionEnum.FE}>FRONT-END</Option>
            <Option value={PositionEnum.BE}>BACK-END</Option>
            <Option value={PositionEnum.FULLSTACK}>FULL STACK</Option>
            <Option value={PositionEnum.DEVOPS}>DEVOPS</Option>
            <Option value={PositionEnum.BA}>BUSSINESS ANNALIST</Option>
            <Option value={PositionEnum.QA}>QA</Option>
            <Option value={PositionEnum.UX_UI}>UX-UI</Option>
          </Select>
        );
      },
    },
  ];
  const handleUnAssignEmployee = (employeeId) => {
    try {
      unAssignEmployee({
        employeeIds: [employeeId],
        projectId: project.project.id,
      });
      message.success(t("main.Unassign member successfully!"));
    } catch (error) {
      console.error("Error assigning employee:", error);
    }
  };

  const handleAssignEmployee = () => {
    if (!newMember || newRole.length == 0) {
      message.error(t("main.Error Assign"));
      return;
    }
    const existingMember = project.project.employee_project.find(
      (member) => member.employeeId === newMember
    );

    if (existingMember) {
      message.error(t("main.Exist Member"));
      return;
    }
    try {
      assignEmployee([
        {
          employeeId: editedProject.employeeId,
          projectId: project.project.id,
          roles: editedProject.roles,
          joinDate: new Date(),
        },
      ]);
      message.success(t("main.Assign member successfully!"));
    } catch (error) {
      console.error("Error assigning employee:", error);
    }
    setNewMember("");
    setNewRole([]);
  };

  const handleUpdateAssign = (employeeId) => {
    const assignEmployee = employee_project.find(
      (record) => record.employeeId === employeeId
    );
    try {
      updateAssign({
        id: assignEmployee.id,
        body: {
          employeeId: employeeId,
          projectId: project.project.id,
          roles: updateRoles.length > 0 ? updateRoles : assignEmployee.roles,
          joinDate: new Date(),
        },
      });
      message.success(t("Update Assign successfully!"));
    } catch (error) {
      console.error("Error assigning employee:", error);
    }
    setEditAssignMode(!editAssignMode);
    if (!editAssignMode) {
      setEditedProject({ ...project?.project });
    }
    setUpdateRoles([]);
  };

  return (
    <Card>
      <Spin spinning={isLoading} tip={t("main.Loading...")}>
        <Row gutter={32} align="middle" justify="center">
          <Col md={24} lg={16}>
            <Form layout="vertical">
              <Typography.Title level={3} style={{ lineHeight: "30px" }}>
                {t("main.Project Infomation")}
              </Typography.Title>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={t("main.Project Name")}
                    name="nameProject"
                    initialValue={name}
                  >
                    {editMode ? (
                      <Input
                        style={{ maxWidth: "300px" }}
                        value={editedProject.name}
                        name="name"
                        onChange={handleInputChange}
                      />
                    ) : (
                      <Input
                        style={{ maxWidth: "300px" }}
                        value={name}
                        disabled
                      />
                    )}
                  </Form.Item>

                  <Form.Item label={t("main.Status")}>
                    {editMode ? (
                      <Select
                        value={editedProject.status}
                        style={{ maxWidth: "300px" }}
                        onChange={(value) =>
                          handleInputChange({
                            target: { name: "status", value },
                          })
                        }
                      >
                        <Option value={StatusProjectEnum.PENDING}>
                          Pending
                        </Option>
                        <Option value={StatusProjectEnum.DONE}>Done</Option>
                        <Option value={StatusProjectEnum.ON_PROGRESS}>
                          On Progress
                        </Option>
                        {/* <Option value={StatusProjectEnum.CLOSED}>Closed</Option> */}
                      </Select>
                    ) : (
                      <Input
                        value={checkProjectStatus(status)}
                        style={{ maxWidth: "300px" }}
                        disabled
                      />
                    )}
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label={t("main.Manager Name")}
                    name="managername"
                    initialValue={managerProject.name}
                  >
                    {editMode ? (
                      <Select
                        style={{ width: "300px" }}
                        placeholder="Select Manager"
                        defaultValue={managerProject.managerId}
                        onChange={(value) =>
                          handleInputChange({
                            target: { name: "managerId", value },
                          })
                        }
                      >
                        {managers.map((manager) => (
                          <Select.Option key={manager.id} value={manager.id}>
                            <Avatar
                              src={
                                manager.avatar ? (
                                  <img
                                    src={manager.avatar}
                                    alt="avatar"
                                    sizes="small"
                                  />
                                ) : (
                                  <UserOutlined />
                                )
                              }
                              style={{ marginRight: 10 }}
                            />
                            {manager.name}
                          </Select.Option>
                        ))}
                      </Select>
                    ) : (
                      <div>
                        <Avatar
                          src={
                            managerProject.avatar ? (
                              <img
                                src={managerProject.avatar}
                                alt="avatar"
                                size="large"
                              />
                            ) : (
                              <UserOutlined />
                            )
                          }
                          style={{ marginRight: 10, height: 110, width: 110 }}
                        />
                        <Title level={4} style={{ marginLeft: 20 }}>
                          {managerProject.name}
                        </Title>
                      </div>
                    )}
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item label={t("main.Team Member")}>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item>
                          <Select
                            value={newMember}
                            onChange={(value) =>
                              handleInputChange({
                                target: { name: "employeeId", value },
                              })
                            }
                            style={{ maxWidth: "300px" }}
                          >
                            {listEmployee?.data?.map((member, index) => (
                              <Option key={index} value={member.id}>
                                <Avatar
                                  src={
                                    member.avatar ? (
                                      <img
                                        src={member.avatar}
                                        alt="avatar"
                                        sizes="small"
                                      />
                                    ) : (
                                      <UserOutlined />
                                    )
                                  }
                                />
                                <Text
                                  style={{
                                    marginLeft: 10,
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {member.name.toLowerCase()}
                                </Text>
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>

                        <Form.Item
                          label={t("main.Role")}
                          rules={[
                            {
                              required: true,
                              message: t(
                                "main.Please enter Language/Framework!"
                              ),
                            },
                          ]}
                        >
                          <Select
                            value={newRole}
                            mode="multiple"
                            autoSize={{ minRows: 2, maxRows: 6 }}
                            style={{
                              height: "auto",
                              maxHeight: "100px",
                              maxWidth: 300,
                            }}
                            onChange={(value) =>
                              handleInputChange({
                                target: { name: "roles", value },
                              })
                            }
                            placeholder="Select roles"
                          >
                            <Option value={PositionEnum.FE}>FRONT-END</Option>
                            <Option value={PositionEnum.BE}>BACK-END</Option>
                            <Option value={PositionEnum.FULLSTACK}>
                              FULL STACK
                            </Option>
                            <Option value={PositionEnum.DEVOPS}>DEVOPS</Option>
                            <Option value={PositionEnum.BA}>
                              BUSSINESS ANNALIST
                            </Option>
                            <Option value={PositionEnum.QA}>QA</Option>
                            <Option value={PositionEnum.UX_UI}>UX-UI</Option>
                          </Select>
                        </Form.Item>
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={handleAssignEmployee}
                        ></Button>
                      </Col>
                      <Col span={12}>
                        {editAssignMode ? (
                          <Table
                            className="skills-table"
                            rowKey="name"
                            dataSource={project.project.employee_project
                              .map((member) => ({
                                key: member.id,
                                roles: member.roles.join(", "),
                                ...member.employee,
                              }))
                              .reverse()}
                            style={{
                              width: "300px",
                              maxHeight: "200px",
                              overflow: "auto",
                              textTransform: "uppercase",
                            }}
                            columns={[
                              ...selectRole,
                              {
                                title: "ACTION",
                                width: 50,
                                render: (record) => (
                                  <Flex justify="space-between">
                                    <CheckOutlined
                                      onClick={() =>
                                        handleUpdateAssign(record.id)
                                      }
                                    />
                                    <CloseCircleOutlined
                                      type="link"
                                      onClick={() =>
                                        handleUnAssignEmployee(record.id)
                                      }
                                    />
                                  </Flex>
                                ),
                              },
                            ]}
                            pagination={false}
                          />
                        ) : (
                          <Table
                            className="skills-table"
                            rowKey="name"
                            dataSource={project.project.employee_project
                              .map((member) => ({
                                key: member.id,
                                roles: member.roles.join(", "),
                                ...member.employee,
                              }))
                              .reverse()}
                            style={{
                              width: "300px",
                              maxHeight: "200px",
                              overflow: "auto",
                              textTransform: "uppercase",
                            }}
                            columns={[
                              ...teamMember,
                              {
                                title: "ACTION",
                                width: 50,
                                render: (record) => (
                                  <Flex justify="space-between">
                                    <EditOutlined
                                      onClick={handleEditAssignClick}
                                    />
                                    <CloseCircleOutlined
                                      type="link"
                                      onClick={() =>
                                        handleUnAssignEmployee(record.id)
                                      }
                                    />
                                  </Flex>
                                ),
                              },
                            ]}
                            pagination={false}
                          />
                        )}
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label={t("main.Start Date")} >
                    {editMode ? (
                      <DatePicker
                        value={
                          editedProject.startDate
                            ? dayjs(editedProject.startDate)
                            : null
                        }
                        onChange={handleStartDateChange}
                        format="YYYY-MM-DD"
                        name="startDate"
                        disabledDate={disabledStartDate}
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
                  <Form.Item label={t("main.End Date")}>
                    {editMode ? (
                      <DatePicker
                        value={
                          editedProject.endDate
                            ? dayjs(editedProject.endDate)
                            : null
                        }
                        onChange={handleEndDateChange}
                        format="YYYY-MM-DD"
                        name="endDate"
                        disabledDate={disabledEndDate}
                      />
                    ) : (
                      <Input
                        value={dayjs(endDate).format("YYYY-MM-DD")}
                        style={{ maxWidth: "300px" }}
                        disabled
                      />
                    )}
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label={t("main.Description")}
                    name="description"
                    initialValue={description}
                  >
                    {editMode ? (
                      <TextArea
                        value={editedProject.description}
                        rows={4}
                        style={{ width: "90%" }}
                        onChange={handleInputChange}
                        name="description"
                      />
                    ) : (
                      <TextArea rows={4} style={{ width: "90%" }} disabled />
                    )}
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label={t("main.Language/Framework")}>
                    {editMode ? (
                      langFrame.map((item, index) => (
                        <div
                          key={index}
                          style={{
                            marginBottom: "8px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Input
                            value={item}
                            onChange={(e) =>
                              handleLangFrameInputChange(e, index)
                            }
                            style={{ width: "120px", marginRight: "8px" }}
                            placeholder="Language/Framework"
                          />
                          <CloseCircleOutlined
                            type="danger"
                            onClick={() => handleRemoveLangFrame(index)}
                          />
                        </div>
                      ))
                    ) : (
                      <div
                        style={{
                          width: "300px",
                          display: "flex",
                          flexWrap: "wrap",
                        }}
                      >
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
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAddLangFrame}
                      ></Button>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t("main.Technology")}>
                    {editMode ? (
                      technology.map((item, index) => (
                        <div
                          key={index}
                          style={{
                            marginBottom: "8px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Input
                            value={item}
                            onChange={(e) => handleTechInputChange(e, index)}
                            style={{ width: "120px", marginRight: "8px" }}
                            placeholder="Language/Framework"
                          />
                          <CloseCircleOutlined
                            type="danger"
                            onClick={() => handleRemoveTech(index)}
                          />
                        </div>
                      ))
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                        }}
                      >
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
                    )}

                    {editMode && (
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAddTech}
                      ></Button>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <Row gutter={8} justify="center">
              <Col>
                {editMode ? (
                  <Button type="primary" onClick={handleSaveClick}>
                    {t("main.Save")}
                  </Button>
                ) : (
                  <Button type="default" onClick={handleEditClick}>
                    {t("main.Edit")}
                  </Button>
                )}
              </Col>
              <Col>
                <Button type="primary" onClick={handleDeleteConfirm}>
                  {t("main.Delete")}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>
    </Card>
  );
};
