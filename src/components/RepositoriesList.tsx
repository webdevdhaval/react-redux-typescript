import { Button, Col, Form, Input, List, Row, Typography } from 'antd';
import { FC, Fragment } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

const { Item } = Form;
const { Text } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const RepositoriesList: FC = () => {
  const [form] = Form.useForm();

  const { searchRepositories } = useActions();

  const { data, error, loading } = useTypedSelector(
    (state) => state.repositories
  );

  const onFinish = ({ term }: { term: string }) => searchRepositories(term);

  return (
    <Fragment>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Row>
          <Col span={18}>
            <Item name="term" rules={[{ required: true }]}>
              <Input placeholder="Enter Package Name" />
            </Item>
          </Col>
          <Col pull={6}>
            <Item {...tailLayout}>
              <Button loading={loading} type="primary" htmlType="submit">
                Search
              </Button>
            </Item>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col span={12}>
          {!error && !loading && data.length ? (
            <List
              size="small"
              header={<div>Found Packages</div>}
              bordered
              dataSource={data}
              renderItem={(name, index) => (
                <List.Item>
                  <Typography.Text>{index + 1}. </Typography.Text> {name}
                </List.Item>
              )}
            />
          ) : (
            error && <Text type="danger">{error}</Text>
          )}
        </Col>
      </Row>
    </Fragment>
  );
};

export default RepositoriesList;
