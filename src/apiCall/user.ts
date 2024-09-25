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
  const deletedUser = await instance.post(`/user/removetoken/`, {
    username,
    token,
  });
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
