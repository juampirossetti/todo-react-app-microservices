import axios from "axios";

let usersUrl = "http://localhost:3001";
let todosUrl = "http://localhost:3002";
export const fetchUsers = async id => {
  const result = await axios(usersUrl + "/api/users");
  return result.data.users;
};

export const addUser = async name => {
  const result = await axios.post(usersUrl + "/api/user", {
    name
  });
  return result.data.user;
};

export const deleteUser = async id => {
  await axios.delete(usersUrl + "/api/user/" + id);
};

export const editUser = async (user, name) => {
  const result = await axios.put(usersUrl + "/api/user/" + user._id, {
    name
  });
  return result.data.user;
};

export const fetchTodos = async id => {
  const result = await axios(todosUrl + "/api/todos/user/" + id);
  return result.data.todos;
};
export const addTodo = async (user_id, description) => {
  const result = await axios.post(todosUrl + "/api/todo", {
    user_id,
    state: "todo",
    description
  });
  return result.data.todo;
};

export const deleteTodo = async id => {
  await axios.delete(todosUrl + "/api/todo/" + id);
};

export const switchStatus = async (item, state) => {
  await axios.put(todosUrl + "/api/todo/" + item._id, {
    user_id: item.user_id,
    state,
    description: item.description
  });
};

export const editTodo = async (todo, description) => {
  const result = await axios.put(todosUrl + "/api/todo/" + todo._id, {
    state: todo.state,
    description,
    user_id: todo.user_id
  });
  return result.data.todo;
};