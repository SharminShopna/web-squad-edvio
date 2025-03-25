import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://edvio-server-site.vercel.app",
});
export default function useAxiosPublic() {
  return axiosPublic;
}
