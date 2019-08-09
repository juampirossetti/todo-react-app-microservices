import React, { useState, useEffect } from "react";
import { Input, Modal, Form, Button, Row, Col } from "antd";
import { editTodo } from "../api";

const TodoEditModal = ({ form, visible, setShowTodoEditModal, todo, list }) => {
  const { getFieldDecorator, setFieldsValue } = form;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFieldsValue({ newDescription: todo.description });
  }, [setFieldsValue, todo.description]);

  return (
    <Modal
      visible={visible}
      destroyOnClose={true}
      onCancel={() => setShowTodoEditModal(false)}
      maskClosable={false}
      title={"Edit Todo name"}
      footer={[
        <Button
          key="close"
          icon="close-circle"
          type="defualt"
          onClick={() => setShowTodoEditModal(false)}
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
                await editTodo(todo, values.newDescription);
                list();
                setLoading(false);
                setShowTodoEditModal(false);
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
            <Form.Item label={"New description"} name="newDescription">
              {getFieldDecorator("newDescription", {
                rules: [
                  {
                    required: true,
                    message: "Todo must have 3 characters or more",
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

export default Form.create()(TodoEditModal);

