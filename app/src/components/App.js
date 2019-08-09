import React, { useState, useEffect } from "react";
import { Header, List, Button, Input, notification, Popconfirm } from "antd";
import styled from "styled-components";
import { fetchUsers as fetch } from "../api";
import UserEditModal from "./UserEditModal";
import { Link } from "react-router-dom";
import { addUser as add, deleteUser as deleteU } from "./../api";

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

const App = () => {
  const [userName, setUserName] = useState("");
  const [userNameEdit, setUserNameEdit] = useState({});
  const [showUserEdit, setShowUserEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const addUser = async name => {
    setLoading(true);
    setList(list.concat(await add(name)));
    setUserName("");
    setLoading(false);
  };

  const deleteUser = async id => {
    setLoading(true);
    await deleteU(id);
    setList(list.filter(i => i._id !== id));
    setLoading(false);
  };

  const fetchUsers = async () => {
    setLoading(true);
    const result = await fetch();
    setList(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [setLoading]);

  return (
    <Content>
      <h1>Users</h1>
      <div style={{ display: "flex", paddingRight: 12 }}>
        <Input value={userName} onChange={e => setUserName(e.target.value)} />
        <Button
          onClick={() => {
            if (userName.length > 2) {
              addUser(userName);
            } else {
              notification.error({
                message: "Error",
                description: "Name must have 3 characters or more"
              });
            }
          }}
          style={{ marginLeft: 5 }}
          type="primary"
        >
          Add User
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
                <Button
                  type="dashed"
                  onClick={() => {
                    setUserNameEdit(item);
                    setShowUserEditModal(true);
                  }}
                >
                  Edit
                </Button>,
                <Link to={`/todos/${item._id}`}>
                  <Button type="primary">Todos</Button>
                </Link>,
                <Popconfirm
                  title="Are you sure?"
                  onConfirm={() => deleteUser(item._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="danger">Delete</Button>
                </Popconfirm>
              ]}
            >
              <List.Item.Meta title={item.name} />
            </List.Item>
          )}
        />
      </div>
      {showUserEdit && (
        <UserEditModal
          visible={showUserEdit}
          setShowUserEditModal={show => setShowUserEditModal(show)}
          user={userNameEdit}
          list={() => fetchUsers()}
        />
      )}
    </Content>
  );
};

export default App;

