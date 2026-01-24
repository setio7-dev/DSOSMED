import axios from "axios";

const VIRTUSIM_API = axios.create({
    baseURL: "https://virtusim.com/api/v2/json.php?api_key=CkLMBwcFoORWm0P5iThVqJf1Drsbyj&action="
})

export default VIRTUSIM_API;