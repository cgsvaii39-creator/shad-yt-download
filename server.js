const express = require("express");
const cors = require("cors");
const ytdl = require("@distube/ytdl-core");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("YT API RUNNING");
});

app.get("/info", async (req, res) => {

  try {

    const url = req.query.url;

    if (!url) {
      return res.json({
        error: "No URL"
      });
    }

    const info = await ytdl.getInfo(url);

    const videoFormats = ytdl.filterFormats(info.formats, "videoandaudio");

    const audioFormats = ytdl.filterFormats(info.formats, "audioonly");

    const video = videoFormats[0];
    const audio = audioFormats[0];

    res.json({
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails.pop().url,
      video: video.url,
      audio: audio.url
    });

  } catch (err) {

    res.json({
      error: "Failed",
      details: err.toString()
    });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Running");
});
