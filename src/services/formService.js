import axios from "axios";
import { toast } from "react-toastify";
const API_URL = "http://localhost:5000/api/form/";

export default {
  getForms(userId) {
    return axios.get(API_URL + "getUserForms/" + userId).then((response) => {
      return response.data;
    });
  },

  createForm(data) {
    return axios.post(API_URL + "create", data).then((response) => {
      console.log(response.data);
      return response.data;
    });
  },

  getForm(formId) {
    return axios.get(API_URL + "form/" + formId).then((response) => {
      //  console.log(response.data);
      return response.data.data;
    });
  },

  autoSave(data) {
    // console.log(data);
    data.userId = JSON.parse(localStorage.getItem("userTicket"));
    return axios.put(API_URL + "/editForm/", data).then((response) => {
      console.log(response.data);
      return response.data;
    });
  },

  submitResponse(data) {
    console.log(data);
    return axios.post(API_URL + "addresponse", data).then((response) => {
      console.log(response.data);
      return response.data;
    });
  },

  getResponse(formId) {
    //  console.log(formId);
    return axios.get(API_URL + "getResponse/" + formId).then((response) => {
      // console.log(response.data);
      return response.data;
    });
  },

  deleteForm(formId, userId) {
    return axios
      .delete(API_URL + "deleteForm/" + formId + "/" + userId)
      .then((response) => {
        toast.success("Form deleted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        return response.data;
      })
      .catch((err) => {
        toast.error("You are not authorized to delete this form");
        return err;
      });
  },
};
