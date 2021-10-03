import axios from "axios";
import { useHistory } from "react-router-dom";
import {SERVER_URLS} from "./constants";
const APIs = {
  auth: {
    login(User) {
      return {
        url: `${SERVER_URLS.BACKEND}/login`,
        method: "POST",
        data: User,
      };
    },
    signUp(User) {
      return {
        url: `${SERVER_URLS.BACKEND}/users`,
        method: "POST",
        data: User,
      };
    }
  },
};
class APICall {
  /**
   * @param {{ module: any; apiName: any; params: any; }} [APICall]
   */
  constructor(APICall) {
    this.module = APICall.module;
    this.apiName = APICall.apiName;
    this.params = APICall.params;
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  addAuthKey() {
    let user = localStorage["user"] || null;
    if (!user) {
      useHistory().push("/signin");
    }
    user = JSON.parse(user);
    this.headers = {
      ...this.headers,
      Authorization: "Bearer " + user.token,
    };
  }

  getResponse() {
    let payload = APIs[this.module][this.apiName](this.params);
    payload.headers = this.headers;
    return axios(payload);
  }
}

export {APIs, APICall };
