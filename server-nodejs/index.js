const express = require("express"); //run le serveur http avec express
const cors = require("cors");// permet de faire des requetes entre le front et le back sans avoir de problemes de CORS
const axios = require("axios");

const app = express(); 
app.use(express.json());
app.use(cors({ origin: true })); //(call the server from any other origin)

const CHAT_ENGINE_PROJECT_ID = "356239ea-fb6a-4151-801d-0a4ff1a3f62f";
const CHAT_ENGINE_PRIVATE_KEY = "3098304f-c4e5-46a8-83c0-324c9badab30";

app.post("/signup", async (req, res) => {
  const { username, secret, email, first_name, last_name } = req.body;

  // Store a user-copy on Chat Engine!
  // Docs at rest.chatengine.io
  try {
    const r = await axios.post(
      "https://api.chatengine.io/users/",
      { username: username, secret: secret, first_name: username},
      { headers: { "Private-Key": CHAT_ENGINE_PRIVATE_KEY } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.post("/login", async (req, res) => {
  const { username, secret } = req.body;

  // Fetch this user from Chat Engine in this project!
  // Docs at rest.chatengine.io
  try {
    const r = await axios.get("https://api.chatengine.io/users/me/", {
      headers: {
        "Project-ID": CHAT_ENGINE_PROJECT_ID,
        "User-Name": username,
        "User-Secret": secret,
      },
    });
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

// vvv On port 3001!
app.listen(3001);
