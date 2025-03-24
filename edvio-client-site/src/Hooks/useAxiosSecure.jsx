import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://edvio-server-site.vercel.app",
});
export default function useAxiosSecure() {
  return axiosSecure;
}
