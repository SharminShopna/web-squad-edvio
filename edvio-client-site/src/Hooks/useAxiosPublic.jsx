import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "https://edvio-server-site.vercel.app",
  baseURL: "http://localhost:4000",
});
export default function useAxiosPublic() {
  return axiosPublic;
}
