
import app from "./utils/app"
import getInputData from "./utils/getInputData";
import render from "./utils/render";
import sendData from "./utils/sendData";
const APIkey = "a588056cf21a310b19bb34b37d017a9b";
const application = document.getElementById("app");




app({key: APIkey,appNode: application, plugins: [getInputData(), sendData(),render()]});