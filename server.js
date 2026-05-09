const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.static("./"));

app.get("/", (req, res) => {
  res.send("Shad YT API Running");
});

app.get("/api/download", (req, res) => {

  const url = req.query.url;

  if (!url) {
    return res.json({
      error: "No URL"
    });
  }

  res.json({
    title: "ভিডিও পাওয়া গেছে",
    thumbnail: "https://i.imgur.com/7P7R9YB.jpeg",

    formats: [
      {
        quality: "360p",
        size: "8 MB",
        type: "mp4",
        url: url
      },

      {
        quality: "720p",
        size: "15 MB",
        type: "mp4",
        url: url
      },

      {
        quality: "MP3",
        size: "4 MB",
        type: "mp3",
        url: url
      }
    ]
  });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Running");
});
