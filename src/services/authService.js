import axios from "axios";
import jwtDecode from "jwt-decode";
import jwt from "jsonwebtoken";
import { toast } from "react-toastify";
const API_URL = "http://localhost:5000/api/user/";
//const API_URL = "http://192.168.225.23:5000/api/user/"

export default {
  isAuthenticated() {
    const token = localStorage.getItem("userTicket");
    if (token) {
      return true;
    } else {
      return false;
    }
  },

  getGuestUser() {
    return { name: "Guest 123", userId: "guest123", email: "coolboy69@gg.com" };
  },

  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },

  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
  register(user) {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(API_URL + "signup", user)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || "Something went wrong");
          reject(error);
        });
    });
  },
  loginUser(user) {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(API_URL + "login", user)
        .then((response) => {
          if (response.data) {
            localStorage.setItem(
              "userTicket",
              JSON.stringify(response.data.data._id)
            );
          }
          resolve(response.data);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || "Something went wrong");
          reject(error);
        });
    });
  },

  logout() {
    localStorage.removeItem("userTicket");
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("userTicket"));
  },
};
