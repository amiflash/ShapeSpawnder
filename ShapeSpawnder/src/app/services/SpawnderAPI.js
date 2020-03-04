import APIService from "./APIService"
import { Alert } from "react-native";

export default class SpawnderAPI {
    constructor() {
       
    }

    fetchColor() {
        let colorURL = APIService.kGetColor
        return fetch(colorURL, {
          headers: {
            'Accept': 'application/json',  // It can be used to overcome cors errors
            'Content-Type': 'application/json'
          }
          })
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson[0].hex;
        })
        .catch((error) => {
          console.error(error);
        });
    }

    fetchImage() {
        let imageURL = APIService.kGetImage
        return fetch(imageURL, {
          headers: {
            'Accept': 'application/json',  // It can be used to overcome cors errors
            'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson[0].imageUrl
        })
        .catch((error) => {
          console.error(error);
        });
    }
}