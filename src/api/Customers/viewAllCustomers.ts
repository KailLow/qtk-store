const axios = require('axios');

export default async function viewCustomerList() {
    
    const tokenStr = localStorage.getItem("token") || "";
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://103.57.221.113:3000/v1//customers",
        headers: {
          Authorization:
            "Bearer " + tokenStr,
        },
      };

  try {
    const response = await axios.request(config);
    const data = JSON.stringify(response.data.results);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};