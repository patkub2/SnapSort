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

export const uploadMultipleImages = (
  imageData: FormData,
  token: string | undefined
) => {
  return axios.post("http://localhost:8080/photos/upload/multiple", imageData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multiple/form-data",
    },
  });
};

export const getThumbnailsById = (
  id: number | undefined,
  token: string | undefined
) => {
  return axios.get(`http://localhost:8080/photos/album/${id}/thumbnails`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPhotoById = (id: number, token: string | undefined) => {
  return axios.get(`http://localhost:8080/photos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deletePhotoById = (id: number, token: string | undefined) => {
  return axios.delete(`http://localhost:8080/photos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changePhotoTagsById = (
  id: number | undefined,
  token: string | undefined,
  newTags: string[]
) => {
  return axios.post(`http://localhost:8080/photos/${id}/tags`, newTags, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getIsNewUser = (token: string | undefined) => {
  return axios.get(`http://localhost:8080/api/users/isNewUser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const setIsNewUser = (isNew: boolean, token: string | undefined) => {
  return axios.post(
    `http://localhost:8080/api/users/changeNewUserStatus?isNewUser=${isNew}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
