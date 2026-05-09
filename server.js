const express = require("express");
const cors = require("cors");
const ytdl = require("@distube/ytdl-core");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("YT API RUNNING");
});

app.get("/api", async (req, res) => {
  try {
    const url = req.query.url;

    if (!url) {
      return res.json({
        status: false,
        message: "No URL"
      });
    }

    const info = await ytdl.getInfo(url);

    const title = info.videoDetails.title;
    const thumbnail = info.videoDetails.thumbnails.pop().url;

    const formats = ytdl.filterFormats(info.formats, "videoandaudio");

    const data = [];

    formats.forEach((f) => {
      if (f.hasVideo && f.hasAudio && f.container === "mp4") {
        data.push({
          quality: f.qualityLabel,
          url: f.url
        });
      }
    });

    const audio = ytdl.filterFormats(info.formats, "audioonly")[0];

    res.json({
      status: true,
      title,
      thumbnail,
      video: data,
      audio: {
        url: audio.url
      }
    });

  } catch (err) {
    res.json({
      status: false,
      error: err.toString()
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("SERVER RUNNING");
});
