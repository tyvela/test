import logo from "./logo.svg";
import "./App.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import kuva from "./testikuva.jpg";
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import CloudIcon from "@mui/icons-material/Cloud";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Stack from "@mui/material/Stack";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { shadows } from "@mui/system";
import "typeface-roboto";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { OpenAIApi } from "openai";
import CircularProgress from "@mui/material/CircularProgress";
function App() {
  const [errors, setError] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState(
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-ruOHXw2Q2V2jJAYyOuyWoxxu/user-oUGP1q2hXKRRG6cbD4BRFR2V/img-s2AsAcqjRRNUMJpPGUCZx8eh.png?st=2023-05-02T11%3A51%3A38Z&se=2023-05-02T13%3A51%3A38Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-01T17%3A37%3A13Z&ske=2023-05-02T17%3A37%3A13Z&sks=b&skv=2021-08-06&sig=3EMHbDH1RN/7aIaA5o2S67PNUG95InMAp%2BTVpW0PkqY%3D"
  );
  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=65.0142&longitude=25.4719&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability,weathercode,snow_depth"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);

          result.hourly.time.forEach((element, index) => {
            if (moment(element).isSame(moment(), "hour")) {
              setIndex(index);
            }
          });

          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
        }
      );
  }, []);

  useEffect(() => {
    //account();
  }, []);

  const { Configuration, OpenAIApi } = require("openai");
  const account = async () => {
    const configuration = new Configuration({
      apiKey: "lörslärä",
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
      prompt:
        "At 10:00 on May 2, 2023, the current temperature is 7.6 degrees Celsius. heavy rain. The wind is blowing from the northwest with a speed of 10.8 meters per second. There is a 90% chance of precipitation, so you might want to bring an umbrella or a raincoat just in case. The snow depth is 0.1 meters, indicating some snow cover still present.",
      n: 1,
      size: "256x256",
    });
    setResponse(response.data.data[0].url);
  };

  if (response === "") {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="App">
      <div className="App-header">
        <div
          className="App-test"
          style={{ backgroundImage: 'url("' + response + '")' }}
        ></div>
        <Card className="test" sx={{ width: 500 }} elevation={24}>
          <div style={{ position: "relative" }}>
            <CardMedia sx={{ height: 500 }} image={response} title="weathers" />
            <div
              style={{
                position: "absolute",
                color: "white",
                top: "2%",
                left: "0%",
                transform: "translateX(-50%)",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h2"
                sx={{ ml: 20, color: "rgba(255, 255, 255, 0.8)" }}
              >
                Oulu
              </Typography>
              <Typography
                variant="h5"
                sx={{ ml: 25, color: "rgba(255, 255, 255, 0.8)" }}
              >
                {moment().format("dddd DD.MM")}
              </Typography>
            </div>
            <div
              style={{
                position: "absolute",
                color: "white",
                bottom: "40%",
                left: "52%",
                transform: "translateX(-50%)",
                alignItems: "center",
              }}
            >
              {isLoaded && (
                <Typography
                  variant="h2"
                  sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                >
                  {Math.ceil(items.hourly.temperature_2m[index])}&deg;C
                </Typography>
              )}
            </div>
            <div
              style={{
                position: "absolute",
                width: 500,
                color: "white",
                backgroundColor: "rgba(52, 52, 52, 0.55)",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                ml: 2,
              }}
            >
              <Stack direction="row" spacing={11} sx={{ ml: 10, mt: 1 }}>
                <Stack alignItems={"center"}>
                  <CloudIcon
                    sx={{ fontSize: 30, color: "rgba(255, 255, 255, 0.9)" }}
                  ></CloudIcon>
                  <Typography
                    fontSize={20}
                    sx={{ color: "rgba(255, 255, 255, 0.9)" }}
                  >
                    Cloudy
                  </Typography>
                </Stack>
                <Stack alignItems={"center"}>
                  <WaterDropIcon
                    sx={{ fontSize: 30, color: "rgba(255, 255, 255, 0.9)" }}
                  ></WaterDropIcon>
                  {isLoaded && (
                    <Typography
                      fontSize={20}
                      sx={{ color: "rgba(255, 255, 255, 0.9)" }}
                    >
                      {items.hourly.precipitation_probability[index]}%
                    </Typography>
                  )}
                </Stack>
                <Stack alignItems={"center"}>
                  <AirIcon
                    sx={{ fontSize: 30, color: "rgba(255, 255, 255, 0.9)" }}
                  ></AirIcon>
                  {isLoaded && (
                    <Typography
                      fontSize={20}
                      sx={{ color: "rgba(255, 255, 255, 0.9)" }}
                    >
                      {Math.ceil(items.hourly.windspeed_10m[index]) + "m/s"}
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
