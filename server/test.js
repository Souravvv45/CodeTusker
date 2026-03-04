const axios = require("axios");
require("dotenv").config();

const payload = {
  source_code: '#include <iostream>\nint main() { std::cout << "Hello"; return 0; }',
  language_id: 54, // 54 = C++
  stdin: ""
};

axios
  .post(
    "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": process.env.RAPIDAPI_HOST
      }
    }
  )
  .then((res) => console.log(res.data))
  .catch((err) => {
    console.error("Error:", err.response?.data || err.message);
  });
