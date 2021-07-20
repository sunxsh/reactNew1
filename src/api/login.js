import { resquest } from '../http'
import { http } from '@/hooks/useAsync'

export const login = (data) => resquest('post',`/user/login`,data);
export const userAdd = (data) => resquest('post',`/user/addOrUpdateUser`,data);
// export const findAllUsers = () => resquest('get',`/user/findAllUsers`);

export const findAllUsers = (data) => resquest('get',`/gsuser1/findAllUsers`,data); // 账号设置分页查询

export const sendemailtouser = (data) => resquest('get',`/gsuser1/sendemailtouser`,data); // 账号设置分页查询

// export const deleteuser = (data) => resquest('get',`/user/deleteuser`,data);
export const deleteuser = (data) => resquest('get',`/gsuser1/deleteuser`,data); // 删除数据

// export const forbiduser = (data) => resquest('get',`/user/forbiduser`,data);
export const forbiduser = (data) => resquest('get',`/gsuser1/forbiduser`,data); // 禁用用户

export const userUpdate = (data) => resquest('post',`/user/userUpdate`,data);

export const sysdeptList = (data) => resquest('get',`/sysdept/list`,data); // 部门分页查询

export const sysdeptSave = (data) => resquest('post',`/sysdept/save`,data); // 保存数据

export const sysdeptDel = (data) => resquest('post',`/sysdept/del`,data); // delete

export const sysdeptTreeselect = (data) => resquest('get',`/sysdept/treeselect`,data); // 下拉部门

export const sysroleList = (data) => resquest('get',`/sysrole/list`,data); // 角色分页查询

export const addOrUpdateUser = (data) => resquest('post',`/gsuser1/addOrUpdateUser`,data); // 保存数据

export const saveRole = (data) => resquest('post',`/sysmenuOrRole/saveRole`,data); // 保存角色列表

export const delRole = (data) => resquest('post',`/sysmenuOrRole/delRole`,data); // 删除角色列表

export const sysmenuOrRoleList = (data) => resquest('get',`/sysmenuOrRole/list`,data); // 更具角色nid查询用户

export const userNotByRoleId = (data) => resquest('get',`/sysmenuOrRole/userNotByRoleId`,data);

export const saveUserByRoleId = (data) => resquest('post',`/sysmenuOrRole/saveUserByRoleId`,data); // 保存角色用户表

export const delUserIdAndRoleId = (data) => resquest('post',`/sysmenuOrRole/delUserIdAndRoleId`,data); // 删除角色列表

export const saveOrUpdate = (data) => resquest('post',`/sysmenuOrRole/saveOrUpdate`,data); // 更新绑定角色列表

export const listRole = (data) => http('get',`/sysmenuOrRole/listRole`,data); // 角色列表

export const sysmenuList = (data) => resquest('get',`/sysmenu/list`,data); // 菜单权限模块菜单列表

export const sysmenuDel = (data) => resquest('post',`/sysmenu/del`,data); // 菜单权限模块删除数据

export const sysmenuSave = (data) => resquest('post',`/sysmenu/save`,data); // 菜单权限模块保存数据

export const sysmenuUpdate = (data) => resquest('post',`/sysmenu/update`,data); // 菜单权限模块修改数据

export const sysmenuInfoPullDown = (data) => resquest('get',`/sysmenu/infoPullDown`,data); // 菜单权限模块根据菜单类型查询 父级下拉

export const newLogin = (data) => resquest('post',`/login `,data); // 新增的登录接口

export const getRouters = (data) => resquest('get',`/getRouters`,data); // 新增权限码

export const newLogout = (data) => resquest('post',`/logout`,data); // 退出登录

export const gsuser1Info = (data) => resquest('get',`/gsuser1/info`,data); // 根据id查询

export const gsuser1ResetPwd = (data) => resquest('post',`/gsuser1/resetPwd`,data); // 重置密码
