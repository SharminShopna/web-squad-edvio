import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://edvio-server-site.vercel.app",
  // baseURL: "http://localhost:4000",
});
export default function useAxiosSecure() {
  return axiosSecure;
}
