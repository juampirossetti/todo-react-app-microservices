import React, { useState, useEffect } from "react";
import { List, Button, Input, notification, Popconfirm } from "antd";
import styled from "styled-components";
import { fetchTodos as fetch } from "../api";
import { Link } from "react-router-dom";
import TodoEditModal from "./TodoEditModal";
import {
  addTodo as add,
  deleteTodo as deleteT,
  switchStatus as switchS
} from "./../api";

const Content = styled.div`
  display: block;
  justify-content: center;
  background: white;
  padding: 30px;
  border-radius: 4px;
  margin: 0 auto;
  margin-top: 50px;
  width: 700px;
`;

const Todos = ({ id }) => {
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [todoNameEdit, setTodoNameEdit] = useState({});
  const [showTodoEdit, setShowTodoEditModal] = useState(false);
  const [list, setList] = useState([]);

  const addTodo = async (userId, description) => {
    setLoading(true);
    const result = await add(userId, description);
    setList(list.concat(result));
    setTodo("");
    setLoading(false);
  };

  const switchState = async item => {
    setLoading(true);
    const newState = item.state === "done" ? "todo" : "done";
    await switchS(item, newState);
    const todos = list.map(t => {
      if (t._id === item._id) {
        t.state = item.state === "done" ? "todo" : "done";
      }
      return t;
    });

    setList(todos);
    setTodo("");
    setLoading(false);
  };

  const deleteTodo = async id => {
    setLoading(true);
    await deleteT(id);
    setList(list.filter(i => i._id !== id));
    setLoading(false);
  };

  const fetchTodos = async id => {
    setLoading(true);
    const result = await fetch(id);
    setList(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos(id);
  }, [setLoading, id]);

  return (
    <Content>
      <h1>Todos</h1>
      <div style={{ display: "flex", paddingRight: 12 }}>
        <Input value={todo} onChange={e => setTodo(e.target.value)} />
        <Button
          onClick={() => {
            if (todo.length > 2) {
              addTodo(id, todo);
            } else {
              notification.error({
                message: "Error",
                description: "Todo must have 3 characters or more"
              });
            }
          }}
          style={{ marginLeft: 5 }}
          type="primary"
        >
          Add Todo
        </Button>
      </div>
      <div>
        <List
          className="demo-loadmore-list"
          style={{ width: "100%", marginTop: 50 }}
          itemLayout="horizontal"
          loading={loading}
          dataSource={list}
          renderItem={item => (
            <List.Item
              key={item._id}
              actions={[
                <Button type="primary" onClick={() => switchState(item)}>
                  {item.state === "done" ? "Done" : "Pending"}
                </Button>,
                <Button
                  type="dashed"
                  onClick={() => {
                    setTodoNameEdit(item);
                    setShowTodoEditModal(true);
                  }}
                >
                  Edit
                </Button>,
                <Popconfirm
                  title="Are you sure?"
                  onConfirm={() => deleteTodo(item._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="danger">Delete</Button>
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                title={
                  item.state === "done" ? (
                    <s>{item.description}</s>
                  ) : (
                    item.description
                  )
                }
              />
            </List.Item>
          )}
        />
      </div>
      <Link to={"/"}>
        <Button style={{ marginTop: 30 }} type="primary">
          Back
        </Button>
      </Link>
      {showTodoEdit && (
        <TodoEditModal
          visible={showTodoEdit}
          setShowTodoEditModal={show => setShowTodoEditModal(show)}
          todo={todoNameEdit}
          list={() => fetchTodos(id)}
        />
      )}
    </Content>
  );
};

export default Todos;

