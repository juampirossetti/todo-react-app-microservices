import React, { useState, useEffect } from "react";
import { Input, Modal, Form, Button, Row, Col } from "antd";
import { editUser } from "../api";

const UserEditModal = ({ form, visible, setShowUserEditModal, user, list }) => {
  const { getFieldDecorator, setFieldsValue } = form;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFieldsValue({ newName: user.name });
  }, [setFieldsValue, user.name]);

  return (
    <Modal
      visible={visible}
      destroyOnClose={true}
      onCancel={() => setShowUserEditModal(false)}
      maskClosable={false}
      title={"Edit name"}
      footer={[
        <Button
          key="close"
          icon="close-circle"
          type="defualt"
          onClick={() => setShowUserEditModal(false)}
        >
          Close
        </Button>,
        <Button
          key="share"
          loading={loading}
          icon="save"
          type="primary"
          onClick={e => {
            e.preventDefault();
            form.validateFields(async (err, values) => {
              if (!err) {
                setLoading(true);
                await editUser(user, values.newName);
                list();
                setLoading(false);
                setShowUserEditModal(false);
              }
            });
          }}
        >
          Edit
        </Button>
      ]}
    >
      <Form layout="horizontal">
        <Row gutter={20}>
          <Col>
            <Form.Item label={"New name"} name="newName">
              {getFieldDecorator("newName", {
                rules: [
                  {
                    required: true,
                    message: "Name must have 3 characters or more",
                    min: 3
                  }
                ]
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default Form.create()(UserEditModal);

