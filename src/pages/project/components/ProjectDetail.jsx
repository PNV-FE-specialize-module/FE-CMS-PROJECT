import React from 'react'
import { Row, Col, Button, Form, Input, Typography, Card, Spin, Select  } from 'antd';
import { useGetDetaiProject } from '../../../hooks/useProject';
import { useParams } from 'react-router-dom';
import { checkProjectStatus } from '../../../components/enum/enum';
import { useTranslation} from 'react-i18next';


const { TextArea } = Input;
const { Option } = Select;


export const ProjectDetail = () => {
  const { id } = useParams();
  const { data: project, isLoading, isError, error } = useGetDetaiProject(id);
  const { t, i18n } = useTranslation();


  if (isLoading) {
    return <Spin spinning={isLoading} tip={t('main.Loading...')}></Spin>;
  }

  if (isError) {
    return <div>{t('main.Error loading project data:')} {error.message}</div>;
  }

  const {
    name,
    description,
    specification,
    langFrame,
    technology,
    status,
    startDate,
    endDate,
    managerProject,
    employee_project
  } = project?.project || {};

  return (
    <Card>
      <Spin spinning={isLoading} tip={t('main.Loading...')}>
        <Row gutter={32} align="middle" justify="center">
          <Col md={24} lg={16}>
            <Form layout="vertical" >
              <Typography.Title level={3} style={{ lineHeight: "30px" }}>
                {t('main.Project Infomation')}
              </Typography.Title>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label={t("main.Project Name")} name="name" initialValue={name}>
                    <Input
                      style={{ maxWidth: "300px" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t("main.Manager Name")} name="managername" initialValue={managerProject.name}>
                    <Input
                      style={{ maxWidth: "300px" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t("main.Specification")} name="specification" initialValue={specification}>
                    <Input
                      style={{ maxWidth: "300px" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t("main.Status")} name="status" initialValue={checkProjectStatus(status)}>
                    <Input
                      style={{ maxWidth: "300px" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t("main.Start Date")} name="startDate" initialValue={new Date(startDate).toLocaleDateString('en-US')}>
                    <Input
                      style={{ maxWidth: "300px" }}
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label={t("main.End Date")} name="endDate" initialValue={new Date(endDate).toLocaleDateString('en-US')}>
                    <Input
                      style={{ maxWidth: "300px" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t("main.Team Member")}  initialValue={employee_project}>
                    <Select
                      style={{ width: "300px" }}
                      placeholder={t("main.Team Member")}
                    >
                      {employee_project.map((member, index) => (
                        <Option key={index} value={member.id}>
                          {member.employee.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t("main.LangFrame")} initialValue={langFrame}>
                  <Select
                      style={{ width: "300px" }}
                      placeholder={t("main.LangFrame")}
                    >
                      {langFrame.map((item, index) => (
                        <Option key={index} value={item.id}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label= {t("main.Description")} name="description" initialValue={description}>
                    <TextArea
                      rows={4} style={{width:'300px' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t("main.Technology")}>
                    <div style={{
                      display: "flex",
                      flexWrap: 'wrap'
                    }}>
                      {technology.map((item, index) => (
                        <div
                          key={index}
                          style={{
                            backgroundColor: "green",
                            color: "whitesmoke",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            margin: "4px",
                            maxWidth: "fit-content",
                            opacity: 0.5
                          }}
                        >
                          <span style={{ marginRight: '8px' }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <Row gutter={10} justify="center">
              <Col>
                <Button type="default">{t("main.Edit")}</Button>
              </Col>
              <Col>
                <Button type="primary">{t("main.Delete")}</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>
    </Card>

  )
}
