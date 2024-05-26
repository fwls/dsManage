import request from "@/utils/request";

// 获取用户列表
export async function getUserList(data) {
    return request({
      url: "/api/user/list",
      method: "get",
      params: data,
    });
  }

// 获取单个用户
export async function getUserDetail(data) {
  return request({
    url: "/api/user/" + data.id,
    method: "get",
    data,
  });
}

// 新增用户
export async function addUser(data) {
  return request({
    url: "/api/user/add",
    method: "post",
    data,
  });
}

// 编辑用户
export async function editUser(data) {
  return request({
    url: "/api/user/edit",
    method: "post",
    data,
  });
}

// 删除用户
export async function deleteUser(data) {
  return request({
    url: "/api/user/delete",
    method: "post",
    data,
  });
}