import axios from "axios";
import { instance } from ".";

export const addToken = async ({
  username,
  registrationToken,
}: {
  username: string;
  registrationToken: string;
}) => {
  console.log({
    username,
    token: registrationToken,
  });
  const add = await instance.post("/user/addtoken", {
    username,
    token: registrationToken,
  });
  return add;
};

export const removeToken = async (username: string, token: string) => {
  // const deletedUser = await instance.post(`/user/removetoken/`, {
  //   username,
  //   token,
  // });
  const deletedUser = await fetch("http://localhost:8000/user/removetoken", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      username,
      token,
    }),
  });
  // const deletedUser = await instance.post(
  //   "http://localhost:8000/user/removetoken",
  //   {
  //     username,
  //     token,
  //   }
  //   // {
  //   //   "Access-Control-Allow-Origin": "*",
  //   //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //   // }
  // );
  return deletedUser;
};

export const checkUserRole = async (userid: string) => {
  console.log(userid);
  const role = await instance.get(`/user/role/${userid}`);
  return role.data;
};

export const login = async (userid: string, password: string) => {
  const loginStatus = await instance.post(`/user/login`, {
    username: userid,
    password,
  });
  console.log(loginStatus.config);
  return loginStatus.status;
};
