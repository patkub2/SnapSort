import axios from "axios";

export const getAllAlbums = (token: string | undefined) => {
  return axios.get("http://localhost:8080/api/albums/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllTags = (token: string | undefined) => {
  return axios.get("http://localhost:8080/tags/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
