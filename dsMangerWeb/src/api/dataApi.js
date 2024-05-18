import request from "@/utils/request";

export async function loginApi(data) {
  return request({
    url: "/api/auth/login",
    method: "post",
    data,
  });
}

//数据源新增
export async function addDataSource(data) {
  return request({
    url: "/api/datasource/add",
    method: "post",
    data,
  });
}

// 数据源编辑
export async function editDataSource(data) {
  return request({
    url: "/api/datasource/edit",
    method: "post",
    data,
  });
}

// 数据源删除
export async function deleteDataSource(data) {
  return request({
    url: "/api/datasource/delete",
    method: "post",
    data,
  });
}

//  数据源列表
export async function getDataSourceList(data) {
  return request({
    url: "/api/datasource/list",
    method: "get",
    params: data,
  });
}

// 数据源详情
export async function getDataSourceDetail(data) {
  return request({
    url: "/api/datasource/" + data.id,
    method: "get",
    data,
  });
}

// 数据集列表
export async function getDataSetList(data) {
  return request({
    url: "/api/dataSet/list",
    method: "get",
    params: data,
  });
}


//数据集新增
export async function addDataSet(data) {
  return request({
    url: "/api/dataSet/add",
    method: "post",
    data,
  });
}

// 数据集编辑
export async function editDataSet(data) {
  return request({
    url: "/api/dataSet/edit",
    method: "post",
    data,
  });
}

export async function getDataSetDetail(data) {
  return request({
    url: "/api/dataSet/" + data.id,
    method: "get",
    data,
  });
}

// 数据集测试
export async function testDataSet(data) {
  return request({
    url: "/api/dataSet/execute",
    method: "post",
    data,
  });
}

// export function getList(params) {
//   return request({
//     url: "/table/list",
//     method: "get",
//     params,
//   });
// }
