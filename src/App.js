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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InfoIcon from "@mui/icons-material/Info";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
function App() {
  const [errors, setError] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState("src/testikuva.jpg");

  const [city, setCity] = React.useState([
    { Name: " Oulu", Lat: "65.0142", Long: "25.471" },
    { Name: "Malmö", Lat: "55.5932", Long: "13.0214" },
    { Name: " Oslo", Lat: "59.9111", Long: "10.7528" },
  ]);
  const [age, setAge] = React.useState(0);
  useEffect(() => {
    console.log(city);
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=" +
        city[age].Lat +
        "&longitude=" +
        city[age].Long +
        "&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability,weathercode,snow_depth"
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
  }, [age]);

  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = React.useState(false);
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleInfo = () => {
    setInfo(!info);
  };

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
        <div className="App-test" style={{ backgroundImage: kuva }}></div>
        <Card className="test" sx={{ width: 500 }} elevation={24}>
          <div style={{ position: "relative" }}>
            <CardMedia sx={{ height: 500 }} image={kuva} title="weathers" />
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
              <Box sx={{ ml: 22 }}>
                <FormControl fullWidth>
                  <Select
                    onClose={handleClose}
                    onOpen={handleOpen}
                    variant="standard"
                    disableUnderline
                    sx={{
                      border: 0,
                    }}
                    value={age}
                    onChange={handleChange}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          width: 250,
                          bgcolor: "rgba(255, 255, 255, 0)",
                          color: "white",
                          ml: 9,
                        },
                      },
                    }}
                  >
                    <MenuItem value={0}>
                      <Typography
                        variant="h2"
                        sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                      >
                        {city[0].Name}
                      </Typography>
                    </MenuItem>
                    <MenuItem value={1}>
                      <Typography
                        variant="h2"
                        sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                      >
                        {city[1].Name}
                      </Typography>
                    </MenuItem>
                    <MenuItem value={2}>
                      <Typography
                        variant="h2"
                        sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                      >
                        {city[2].Name}
                      </Typography>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {!open && (
                <Typography
                  variant="h5"
                  sx={{ ml: 25, color: "rgba(255, 255, 255, 0.8)" }}
                >
                  {moment().format("dddd DD.MM")}
                </Typography>
              )}
            </div>
            <div
              style={{
                position: "absolute",
                color: "white",
                top: 1,
                right: -10,
                transform: "translateX(-50%)",
                alignItems: "center",
              }}
            >
              <InfoIcon
                sx={{ fontSize: 30, color: "rgba(255, 255, 255, 0.9)" }}
                onClick={handleInfo}
              ></InfoIcon>
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
                      {Math.ceil(items.hourly.windspeed_10m[index]) + "km/h"}
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </div>
          </div>
          <Dialog onClose={handleInfo} open={info}>
            <DialogTitle>Set backup account</DialogTitle>
          </Dialog>
        </Card>
      </div>
    </div>
  );
}

export default App;
