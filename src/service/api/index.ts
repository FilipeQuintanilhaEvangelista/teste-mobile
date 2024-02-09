import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.118:8080/",
});

export const registerUser = (username: string, password: string) => {
  return api.post("users/register", {
    username: username,
    password: password,
  });
};

export const postLogin = (username: string, password: string) => {
  return api.post("auth/login", {
    username: username,
    password: password,
  });
};

export const getUsers = (config: object) => {
  return api.get("users", config);
};

export const getSkillsByUserId = (userId: number, config: object) => {
  return api.get(`user-skills/user/${userId}`, config);
};

export const getSkills = (config: object) => {
  return api.get("skills", config);
};

export const addUserSkill = (
  userId: number,
  skillId: number,
  config: object
) => {
  return api.post(
    "user-skills",
    {
      userId: userId,
      skillId: skillId,
    },
    config
  );
};

export const updateUserSkillLevel = (
  userSkillId: number,
  newLevel: string,
  config: object
) => {
  return api.put(
    `user-skills/${userSkillId}?newLevel=${newLevel}`,
    null,
    config
  );
};

export const deleteUserSkill = (userSkillId: number, config: object) => {
  return api.delete(`user-skills/${userSkillId}`, config);
};
