import { DataTypes, UsersDataType } from "../../types/data";

export const fetchUsersPicture = (data: { [field: string]: any }) => {
  return { type: DataTypes.FETCH_USERS, payload: data };
};

export const findReq = (findReq: string) => {
  return { type: DataTypes.FIND_USERS, payload: findReq };
};

export const filtredUsers = (arr: UsersDataType[], find: string) => {
  return {
    type: DataTypes.FILTRED_USERS,
    payload: arr.filter((item) => item.username.toLowerCase().includes(find)),
  };
};
