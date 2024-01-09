import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
    Button, Col, DatePicker, Form, Input, InputNumber, Radio, Row, Select, Spin, Table, Upload, message,
} from "antd";
import { Image as CloudImage, CloudinaryContext } from "cloudinary-react";
import moment from "moment";
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Cloudinary } from "@cloudinary/url-gen";
import { Divider } from "antd";
import { useNavigate } from "react-router";
import {useCreateEmployee, useGetManager} from "../../../hooks/useEmployee.jsx";
const { useForm } = Form;

const CreateEmployee = () => {
    const [formCreate] = useForm();
    const [newCode, setNewCode] = useState("")
    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newDob, setNewDob] = useState("");
    const [newIdentityCard, setNewIdentityCard] = useState("");
    const [newGender, setNewGender] = useState("");
    const [newPosition, setNewPosition] = useState("");
    const [newStatus, setNewStatus] = "active";
    const [newEmail, setNewEmail] = useState("");
    const [newJoinDate, setNewJoinDate] = useState("");
    const [newAvatar, setNewAvatar] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newIsManager, setNewIsManager] = useState(false);
    const [newManager, setNewManager] = useState("");
    const [newSkills, setNewSkills] = useState([]);
    const [newSkill, setNewSkill] = useState("");
    const [newExperience, setNewExperience] = useState("");
    const [newLangFrames, setNewLangFrames] = useState([]);
    const [newLangFrame, setNewLangFrame] = useState("");
    const [newLangExperience, setNewLangExperience] = useState("");
    const [newTechs, setNewTechs] = useState([]);
    const [newTech, setNewTech] = useState("");
    const [newTechExperience, setNewTechExperience] = useState("");


    const skills = [
        {
            title: "SOFT SKILL",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "EXPERIENCE",
            dataIndex: "exp",
            key: "exp",
        },
    ];

    const langFrames = [
        {
            title: "LANG FRAME",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "EXPERIENCE",
            dataIndex: "exp",
            key: "exp",
        },
    ];

    const techs = [
        {
            title: "TECHNOLOGY NAME",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "EXPERIENCE",
            dataIndex: "exp",
            key: "exp",
        },
    ];

    const [imageUrl, setImageUrl] = useState(
        "https://res.cloudinary.com/da9hiv52w/image/upload/v1704559896/xljfi1wpvhfabwihemgr.png",
    );
    const [loading, setLoading] = useState(false);
    const cld = new Cloudinary({ cloud: { cloudName: "dvm8fnczy" } });
    const navigate = useNavigate();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { data: managers } = useGetManager();
    const { mutate: createEmployee, isError, error } =useCreateEmployee();

    const addToSkills = () => {
        if (!newSkill || !newExperience) {
            message.error("ERROR SKILL");
            return;
        }
        const existingSkill = newSkills.find((skill) => skill.name === newSkill);

        if (existingSkill) {
            message.error("EXIST SKILL");
            return;
        }
        const newEntry = {
            name: newSkill,
            exp: newExperience,
        };
        setNewSkills([...newSkills, { ...newEntry, key: newSkills.length + 1 }]);
        setNewSkill("");
        setNewExperience("");
    };
    const removeSkill = (key) => {
        const updatedSkills = newSkills.filter((skill) => skill.key !== key);
        setNewSkills(updatedSkills);
    };
    const addToLangFrame = () => {
        if (!newLangFrame || !newLangExperience) {
            message.error("ERROR LANGUAGE");
            return;
        }
        const existingLangFrame = newLangFrames.find(
            (langFrame) => langFrame.name === newLangFrame,
        );

        if (existingLangFrame) {
            message.error("EXIST LANGUAGE");
            return;
        }
        const newLangEntry = {
            name: newLangFrame,
            exp: newLangExperience,
        };
        setNewLangFrames([
            ...newLangFrames,
            { ...newLangEntry, key: newLangFrame.length + 1 },
        ]);
        setNewLangFrame("");
        setNewLangExperience("");
    };
    const removeLangFrame = (key) => {
        const updatedLangFrames = newLangFrames.filter(
            (langFrame) => langFrame.key !== key,
        );
        setNewLangFrames(updatedLangFrames);
    };
    //Technology
    const addToTech = () => {
        if (!newTech || !newTechExperience) {
            message.error("ERROR TECH");
            return;
        }
        const existingTech = newTechs.find((tech) => tech.name === newTech);

        if (existingTech) {
            message.error("EXIST TECHNOLOGY");
            return;
        }
        const newTechEntry = {
            name: newTech,
            exp: newTechExperience,
        };
        setNewTechs([...newTechs, { ...newTechEntry, key: newTech.length + 1 }]);
        setNewTech("");
        setNewTechExperience("");
    };
    const removeTech = (key) => {
        const updatedTechs = newTechs.filter((tech) => tech.key !== key);
        setNewTechs(updatedTechs);
    };
    const defaultImageUrl =
        "https://res.cloudinary.com/da9hiv52w/image/upload/v1704559896/xljfi1wpvhfabwihemgr.png";

    const handleChange = (info) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            setImageUrl(info.file.response.secure_url);
            setNewAvatar(info.file.response.secure_url);
            message.success(`uploaded successfully`);
            setLoading(false);
        } else {
            setImageUrl(defaultImageUrl);
            setNewAvatar(null);
            setLoading(false);
        }
    };

    const handleAdd = async () => {
        try {
            const formData = await formCreate.validateFields();
            formData.skills = newSkills;
            formData.langFrame = newLangFrames;
            formData.tech = newTechs;
            formData.avatar = imageUrl;
            // formData.code = newCode;
            setConfirmLoading(true);
            createEmployee({
                ...formData,
                code: generateRandomCode(),
            });
            Swal.fire({
                icon: 'success',
                title: 'Employee Created Successfully!',
                showConfirmButton: false,
                timer: 1500, // Optional: You can customize the time the success message stays visible
            });

        } catch (error) {
            message.error("ERROR EMPLOYEE");
        }
    };

    useEffect(() => {
        formCreate.setFields([{ name: "email", errors: [] }]);

        if (isError) {
            formCreate.setFields([
                {
                    name: "email",
                    errors: [error.response.data.message],
                },
            ]);
        }
    }, [isError]);

    // const breadcrumbItems = [
    //     { key: "manageEmployees" },
    //     { key: "", title: "EMPLOYEE.CREATE"},
    // ];
    const generateRandomCode = () => {
        const randomNumber = Math.floor(100 + Math.random() * 900);
        return `ST${randomNumber}`;
    };

    return (
        <>
            {/*<Breadcrumb items={breadcrumbItems} />*/}
            <Form
                form={formCreate}
                name="createEmployee"
                layout="vertical"
                autoComplete="off"
                validateMessages={{
                    required: "Please input }!",
                    types: {
                        email: "${label} is not a valid email!",
                        number: "${label} is not a valid number!",
                    },
                }}
            >
                <Form.Item
                    valuePropName="avatar"
                    value={newAvatar}
                    onChange={(e) => setNewAvatar(e.target.value)}
                >

                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <CloudinaryContext cloudName="dvm8fnczy" cld={cld}>
                            <div style={{ marginTop: "10px" }}>
                                <Upload
                                    listType="picture-circle"
                                    maxCount={1}
                                    action={`https://api.cloudinary.com/v1_1/da9hiv52w/image/upload`}
                                    data={{ upload_preset: "ay2jrgsp" }}
                                    showUploadList={false}
                                    onChange={handleChange}
                                >
                                    <Spin spinning={loading} tip="Uploading...">
                                        {imageUrl ? (
                                            <div className="rounded-image-container">
                                                <CloudImage
                                                    publicId={imageUrl}
                                                    style={{
                                                        width: "100px",
                                                        paddingTop: "5px",
                                                        borderRadius: "100%",
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <PlusOutlined />
                                            </div>
                                        )}
                                    </Spin>
                                </Upload>
                            </div>
                        </CloudinaryContext>
                    </div>
                </Form.Item>
                <Row gutter={32} justify={"center"}>
                    <Col md={24} lg={8}>
                        <Form.Item
                            name="code"
                            label="CODE"
                            style={{ width: "100%" }}
                            required
                        >
                            <Input defaultValue={generateRandomCode()} disabled />
                        </Form.Item>

                        <Form.Item
                            name="name"
                            label="NAME"
                            style={{ width: "100%" }}
                            rules={[{ required: true, message: "NAME"}]}
                        >
                            <Input
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="PHONE"
                            style={{ width: "100%" }}
                            rules={[
                                {
                                    required: true,
                                    pattern: /^[0-9]{10}$/,
                                    message: "PHONE",
                                },
                            ]}
                        >
                            <Input
                                value={newPhone}
                                onChange={(e) => setNewPhone(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            name="address"
                            label="ADDRESS"
                            style={{ width: "100%" }}
                            rules={[{ required: true, message: "ADDRESS" }]}
                        >
                            <Input
                                value={newAddress}
                                onChange={(e) => setNewAddress(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            name="status"
                            label="STATUS"
                            style={{ width: "100%" }}
                            rules={[{ required: true, message: "STATUS" }]}
                        >
                            <Select
                                value={newStatus}
                                onChange={(value) => setNewStatus(value)}
                            >
                                <Select.Option value="inactive">
                                    {"INACTIVE"}
                                </Select.Option>
                                <Select.Option value="active">{"ACTIVE"}</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="position"
                            label="POSITION"
                            style={{ width: "100%" }}
                            rules={[{ required: true, message: "POSITION" }]}
                        >
                            <Select
                                value={newPosition}
                                onChange={(value) => setNewPosition(value)}
                            >
                                <Select.Option value="fe">Front-end Dev</Select.Option>
                                <Select.Option value="be">Back-end Dev</Select.Option>
                                <Select.Option value="fullstack">FullStack</Select.Option>
                                <Select.Option value="ba">Business Analysis</Select.Option>
                                <Select.Option value="qa">Quality Assurance</Select.Option>
                                <Select.Option value="devops">DevOps Engineer</Select.Option>
                                <Select.Option value="ux_ui">User Experience</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="joinDate"
                            label="JOIN DATE"
                            rules={[{ required: true, message: "JOINDATE" }]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                value={moment(newJoinDate)}
                                placeholder="SELECT JOINDATE"
                                onChange={(e) => {
                                    setNewJoinDate(e ? e.format("DD/MM/YYYY") : null);
                                }}
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={8}>
                        <Form.Item
                            name="email"
                            label="EMAIL"
                            style={{ width: "100%" }}
                            rules={[
                                { required: true, message: "EMAIL" },
                                {
                                    type: "email",
                                    message: "VALIDEMAIL",
                                },
                            ]}
                        >
                            <Input
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            name="dateOfBirth"
                            label=" DATE OF BIRTH"
                            style={{ width: "100%" }}
                            rules={[
                                {
                                    required: true,
                                    message: "Date of birth",
                                },
                            ]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                value={moment(newDob)}
                                placeholder={"SELECT DATE OF BIRTH"}
                                onChange={(date) => {
                                    setNewDob(date.format("DD/MM/YYYY"));
                                }}
                                format="DD/MM/YYYY"
                                disabledDate={(current) => {
                                    return current && current > moment().endOf("day");
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="identityCard"
                            label="IDENTITY"
                            style={{ width: "100%" }}
                            rules={[
                                {
                                    required: true,
                                    pattern: /^[0-9]{9,12}$/,
                                    message: "IDENTITY",
                                },
                            ]}
                        >
                            <Input
                                value={newIdentityCard}
                                onChange={(e) => setNewIdentityCard(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            name="gender"
                            label="GENDER"
                            style={{ width: "100%" }}
                            rules={[{ required: true, message: "GENDER" }]}
                        >
                            <Select
                                value={newGender}
                                onChange={(value) => setNewGender(value)}
                            >
                                <Select.Option value="male">{"MALE"}</Select.Option>
                                <Select.Option value="female">{"FEMALE"}</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="isManager"
                            label="IS MANAGER"
                            style={{ width: "100%" }}
                            labelCol={{ span: 8 }}
                            rules={[
                                {
                                    required: true,
                                    message: "MANAGER",
                                },
                            ]}
                        >
                            <Radio.Group
                                value={newIsManager}
                                onChange={(e) => setNewIsManager(e.target.value)}
                                style={{marginBottom: "0px"}}
                            >
                                <Radio value={true}>{"TRUE"}</Radio>
                                <Radio value={false}>{"FALSE"}</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="managerId" label="MANAGER">
                            <Select
                                value={newManager.id}
                                onChange={(value, option) =>
                                    setNewManager({ id: value, name: option.children })
                                }
                            >
                                {(managers || []).map((manager) => (
                                    <Select.Option key={manager.id} value={manager.id}>
                                        {manager.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="DESCRIPTION"
                            style={{ width: "100%" }}
                        >
                            <Input.TextArea
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Divider />
                <Row gutter={15} justify={"center"}>
                    <Col md={24} lg={8}>
                        <Form.Item
                            label="LANG FRAME"
                            style={{ padding: 0, margin: 0 }}
                        >
                            <Select
                                value={newLangFrame}
                                onChange={(value) => setNewLangFrame(value)}
                                placeholder={"LANGUAGE"}
                            >
                                {[
                                    "HTML",
                                    "CSS",
                                    "JavaScript",
                                    "React",
                                    "Node.js",
                                    "Express",
                                    "NestJs",
                                    "Python",
                                    "C#",
                                    "C++",
                                    "Java",
                                    "Ruby",
                                    "PHP",
                                ].map((langFrame) => (
                                    <Select.Option key={langFrame} value={langFrame}>
                                        {langFrame}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="EXPERIENCE"
                            style={{ marginBottom: "8px" }}
                            rules={[
                                {
                                    required: true,
                                    message: "EXPERIENCE",
                                },
                            ]}
                        >
                            <InputNumber
                                value={newLangExperience}
                                onChange={(value) => setNewLangExperience(value)}
                                style={{ width: "100%" }}
                                placeholder={"EXPERIENCE"}
                                min={1}
                            />
                        </Form.Item>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={ addToLangFrame}
                        >
                        </Button>
                    </Col>
                    <Col md={24} lg={8}>
                        <Form.Item name="langFrames">
                            <Table
                                className="skills-table"
                                rowKey="name"
                                dataSource={newLangFrames.map((langFrame) => ({
                                    ...langFrame,
                                    key: langFrame.key,
                                }))}
                                style={{
                                    width: "100%",
                                    maxHeight: "200px",
                                    overflow: "auto",
                                }}
                                columns={[
                                    ...langFrames,
                                    {
                                        title: "ACTION",
                                        width: 50,
                                        render: (record) => (
                                            <CloseCircleOutlined
                                                type="link"
                                                onClick={() => {
                                                    removeLangFrame(record.key);
                                                }}
                                            />
                                        ),
                                    },
                                ]}
                                pagination={false}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Row gutter={15} justify={"center"}>
                    <Col md={24} lg={8}>
                        <Form.Item
                            label="TECHNOLOGY"
                            style={{ padding: 0, margin: 0 }}
                        >
                            <Select
                                value={newTech}
                                onChange={(value) => setNewTech(value)}
                                placeholder={"TECHNOLOGY"}
                            >
                                {[
                                    "Docker",
                                    "Git/GitHub",
                                    "Jira",
                                    "AWS",
                                    "K8S",
                                    "Tailwind",
                                    "MongoDB",
                                    "PostgreSQL",
                                    "SQL Server",
                                    "Redis",
                                ].map((tech) => (
                                    <Select.Option key={tech} value={tech}>
                                        {tech}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label=".EXPERIENCE"
                            style={{ marginBottom: "8px" }}
                            rules={[
                                {
                                    required: true,
                                    message: "EXPERIENCE",
                                },
                            ]}
                        >
                            <InputNumber
                                value={newTechExperience}
                                onChange={(value) => setNewTechExperience(value)}
                                style={{ width: "100%" }}
                                placeholder={"EXPERIENCE"}
                                min={1}
                            />
                        </Form.Item>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={addToTech}
                        >
                        </Button>
                    </Col>
                    <Col md={24} lg={8}>
                        <Form.Item name="techs">
                            <Table
                                className="skills-table"
                                rowKey="name"
                                dataSource={newTechs.map((tech) => ({
                                    ...tech,
                                    key: tech.key,
                                }))}
                                style={{
                                    width: "100%",
                                    maxHeight: "200px",
                                    overflow: "auto",
                                }}
                                columns={[
                                    ...techs,
                                    {
                                        title: "ACTION",
                                        width: 50,
                                        render: (record) => (
                                            <CloseCircleOutlined
                                                type="link"
                                                onClick={() => {
                                                    removeTech(record.key);
                                                }}
                                            />
                                        ),
                                    },
                                ]}
                                pagination={false}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Row gutter={15} justify={"center"}>
                    <Col md={24} lg={8}>
                        <Form.Item
                            label="SOFT SKILL"
                            style={{ padding: 0, margin: 0 }}
                        >
                            <Select
                                value={newSkill}
                                onChange={(value) => setNewSkill(value)}
                                placeholder={"SKILL"}
                            >
                                {["Management", "Planning", "Team Work"].map((skill) => (
                                    <Select.Option key={skill} value={skill}>
                                        {skill}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="EXPERIENCE"
                            style={{ marginBottom: "8px" }}
                            rules={[
                                {
                                    required: true,
                                    message: "EXPERIENCE",
                                },
                            ]}
                        >
                            <InputNumber
                                value={newExperience}
                                onChange={(value) => setNewExperience(value)}
                                style={{ width: "100%" }}
                                placeholder="EXPERIENCE"
                                min={1}
                            />
                        </Form.Item>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={addToSkills}
                        >
                        </Button>
                    </Col>
                    <Col md={24} lg={8}>
                        <Form.Item name="skills">
                            <Table
                                className="skills-table"
                                rowKey="name"
                                dataSource={newSkills.map((skill) => ({
                                    ...skill,
                                    key: skill.key,
                                }))}
                                style={{
                                    width: "100%",
                                    maxHeight: "200px",
                                    overflow: "auto",
                                }}
                                columns={[
                                    ...skills,
                                    {
                                        title: "ACTION",
                                        width: 50,
                                        style: { whiteSpace: "nowrap" },
                                        render: (record) => (
                                            <CloseCircleOutlined
                                                type="link"
                                                onClick={() => {
                                                    removeSkill(record.key);
                                                }}
                                            />
                                        ),
                                    },
                                ]}
                                pagination={false}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={15} justify={"center"}>
                            <Button
                                style={{
                                    marginRight: "10px",
                                    // borderRadius: "50px",
                                    // height: "35px",
                                }}

                            >
                                Back
                            </Button>
                            <Button
                                style={{
                                    marginRight: "10px",
                                    // borderRadius: "50px",
                                    // height: "35px",
                                }}
                                type="primary"
                                onClick={handleAdd}
                            >
                                Save
                            </Button>
                </Row>
            </Form>
        </>
    );
};
export default CreateEmployee;
