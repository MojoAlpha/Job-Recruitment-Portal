import axios from "axios";
let token = null;
if (localStorage.getItem("jwt")) {
  token = JSON.parse(localStorage.getItem("jwt")).token;
}
console.log(`token:${token}`)
//use this name if u need to call with authorisation header
//then no need to pass anything
export const tokenAxios = axios.create({
  baseURL: `http://localhost:8000`,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
export const basicAxios = axios.create({
  baseURL: `http://localhost:8000`,
});