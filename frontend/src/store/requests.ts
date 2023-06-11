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

export const deleteAlbumById = (id: number, token: string | undefined) => {
  return axios.delete(`http://localhost:8080/api/albums/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
