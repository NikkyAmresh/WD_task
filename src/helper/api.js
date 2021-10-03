import axios from "axios";
import { useHistory } from "react-router-dom";
import {SERVER_URLS, AREA} from "./constants";
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
  list:{
    getAll(){
      return {
        url: `${SERVER_URLS.BACKEND}/${AREA.SECURE}/AllData`,
        method: "GET",
      };
    },
    create(List){
      return {
        url: `${SERVER_URLS.BACKEND}/${AREA.SECURE}/lists`,
        method: "POST",
        data: List,
      };
    },
    update(List){
      return {
        url: `${SERVER_URLS.BACKEND}/${AREA.SECURE}/lists/${List.listId}`,
        method: "PUT",
        data: List,
      };
    },
    delete(ListId){
      return {
        url: `${SERVER_URLS.BACKEND}/${AREA.SECURE}/lists/${ListId}`,
        method: "DELETE",
      };
    }
  },
  card:{
    create(Card){
      return {
        url: `${SERVER_URLS.BACKEND}/${AREA.SECURE}/cards`,
        method: "POST",
        data: Card,
      };
    },
    update(Card){
      return {
        url: `${SERVER_URLS.BACKEND}/${AREA.SECURE}/cards/${Card.cardId}`,
        method: "PUT",
        data: Card,
      };
    },
    delete(CardId){
      return {
        url: `${SERVER_URLS.BACKEND}/${AREA.SECURE}/cards/${CardId}`,
        method: "DELETE",
      };
    }
  }
};
class APICall {
  /**
   * @param {{ module: any; apiName: any; params: any; area: any; }} [APICall]
   */
  constructor(APICall) {
    this.module = APICall.module;
    this.apiName = APICall.apiName;
    this.params = APICall.params;
    this.area = APICall.area;
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  addAuthKey() {
    let user = localStorage["user"] || null;
    if (!user) {
      useHistory().push("/");
    }
    user = JSON.parse(user);
    this.headers = {
      ...this.headers,
      Authorization: "Bearer " + user.token,
    };
  }

  getResponse() {
    if (this.area == AREA.SECURE) {
      this.addAuthKey();
    }
    let payload = APIs[this.module][this.apiName](this.params);
    payload.headers = this.headers;
    return axios(payload);
  }
}

export {APIs, APICall };
