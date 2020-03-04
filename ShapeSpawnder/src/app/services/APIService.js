 export default class APIService {
 static baseURL = "http://www.colourlovers.com/api"
 static kGetColor = APIService.baseURL + "/colors/random?format=json"
 static kGetImage = APIService.baseURL + "/patterns/random?format=json"
 }