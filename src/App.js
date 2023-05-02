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

function App() {
  const [errors, setError] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=65.0142&longitude=25.4719&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
        }
      );
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Card sx={{ width: 500 }} elevation={24}>
          <div style={{ position: "relative" }}>
            <CardMedia sx={{ height: 500 }} image={kuva} title="weathers" />
            <div
              style={{
                position: "absolute",
                color: "white",
                top: "5%",
                left: "52%",
                transform: "translateX(-50%)",
                alignItems: "center",
              }}
            >
              <Typography gutterBottom variant="h4">
                {moment().format("dddd DD.MM")}
              </Typography>
            </div>
            <div
              style={{
                position: "absolute",
                color: "white",
                bottom: "30%",
                left: "52%",
                transform: "translateX(-50%)",
                alignItems: "center",
              }}
            >
              <Typography gutterBottom variant="h2">
                Oulu
              </Typography>
              {isLoaded && (
                <Typography gutterBottom variant="h2">
                  {Math.ceil(items.current_weather.temperature)}&deg;C
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
                  <CloudIcon sx={{ fontSize: 30 }}></CloudIcon>
                  <Typography fontSize={20}>Cloudy</Typography>
                </Stack>
                <Stack alignItems={"center"}>
                  <WaterDropIcon sx={{ fontSize: 30 }}></WaterDropIcon>
                  <Typography fontSize={20}>83%</Typography>
                </Stack>
                <Stack alignItems={"center"}>
                  <AirIcon sx={{ fontSize: 30 }}></AirIcon>
                  {isLoaded && (
                    <Typography fontSize={20}>
                      {Math.ceil(items.current_weather.windspeed) + "m/s"}
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </div>
          </div>
        </Card>
      </header>
    </div>
  );
}

export default App;
