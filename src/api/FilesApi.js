import axiosInstance from "./axiosInstance";

export const getSignedUrlApi = (bucket, path) =>
  axiosInstance
    .get("/api/files/signed-url", { params: { bucket, path } })
    .then((res) => res.data);
