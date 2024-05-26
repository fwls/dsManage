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

// 数据源连通性测试
export async function testDataSourceConn(data) {
  return request({
    url: "/api/datasource/testConnstatus",
    method: "post",
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

// 数据集删除
export async function deleteDataSet(data) {
  return request({
    url: "/api/dataSet/delete",
    method: "post",
    data,
  });
}

//数据频道列表
export async function getChannelList(data) {
  return request({
    url: "/api/dataChannel/list",
    method: "get",
    params: data,
  });
}

// 数据频道新增
export async function addChannel(data) {
  return request({
    url: "/api/dataChannel/add",
    method: "post",
    data,
  });
}

// 数据频道编辑
export async function editChannel(data) {
  return request({
    url: "/api/dataChannel/edit",
    method: "post",
    data,
  });
}

// 数据频道删除
export async function deleteChannel(data) {
  return request({
    url: "/api/dataChannel/delete",
    method: "post",
    data,
  });
}

// 数据频道详情 
export async function getChannelDetail(data) {
  return request({
    url: "/api/dataChannel/" + data.id,
    method: "get",
    data,
  });
}

// 数据频道数据集列表
export async function getChannelDataSetList(data) {
  return request({
    url: "/api/dataChannel/sets/list",
    method: "get",
    params: data,
  });
}

// 频道数据集详情
export async function getDataChannelSetDetail(data) {
  return request({
    url: "/api/dataChannel/sets/" + data.id,
    method: "get",
    data,
  });
}

// 数据频道数据集新增
export async function addChannelDataSet(data) {
  return request({
    url: "/api/dataChannel/sets/add",
    method: "post",
    data,
  });
}

// 数据频道数据集编辑
export async function editChannelDataSet(data) {
  return request({
    url: "/api/dataChannel/sets/edit",
    method: "post",
    data,
  });
}

// 数据频道数据集删除
export async function deleteChannelDataSet(data) {
  return request({
    url: "/api/dataChannel/sets/delete",
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
