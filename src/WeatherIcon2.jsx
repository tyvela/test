import React from "react";
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
import GrainIcon from "@mui/icons-material/Grain";
const WeatherIcon2 = ({ index, checked }) => {
  return (
    <Stack alignItems={"center"}>
      {index === 0 && (
        <>
          <WbSunnyIcon
            sx={{
              fontSize: 30,
              color: checked
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(0, 0, 0, 0.8)",
            }}
          ></WbSunnyIcon>
          <Typography
            fontSize={20}
            sx={{
              color: checked
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(0, 0, 0, 0.8)",
            }}
          >
            Sunny
          </Typography>
        </>
      )}
      {index === 1 && (
        <>
          <WbSunnyIcon
            sx={{
              fontSize: 30,
              color: checked
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(0, 0, 0, 0.8)",
            }}
          ></WbSunnyIcon>
          <Typography
            fontSize={20}
            sx={{
              color: checked
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(0, 0, 0, 0.8)",
            }}
          >
            mostly clear
          </Typography>
        </>
      )}
      {index === 2 && (
        <>
          <CloudIcon
            sx={{
              fontSize: 30,
              color: checked
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(0, 0, 0, 0.8)",
            }}
          ></CloudIcon>
          <Typography
            fontSize={20}
            sx={{
              color: checked
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(0, 0, 0, 0.8)",
            }}
          >
            partly cloudy
          </Typography>
        </>
      )}
      {index === 3 && (
        <>
          <CloudIcon
            sx={{
              fontSize: 30,
              color: checked
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(0, 0, 0, 0.8)",
            }}
          ></CloudIcon>
          <Typography
            fontSize={20}
            sx={{
              color: checked
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(0, 0, 0, 0.8)",
            }}
          >
            overcast
          </Typography>
        </>
      )}
      {index === 80 && (
        <>
          <GrainIcon
            sx={{
              fontSize: 30,
              color: checked
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(0, 0, 0, 0.8)",
            }}
          ></GrainIcon>
          <Typography
            fontSize={20}
            sx={{
              color: checked
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(0, 0, 0, 0.8)",
            }}
          >
            Rain Shower
          </Typography>
        </>
      )}
      {index === 81 && (
        <>
          <GrainIcon
            sx={{
              fontSize: 30,
              color: checked
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(0, 0, 0, 0.8)",
            }}
          ></GrainIcon>
          <Typography
            fontSize={20}
            sx={{
              color: checked
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(0, 0, 0, 0.8)",
            }}
          >
            Rain
          </Typography>
        </>
      )}
      {index === 82 && (
        <>
          <GrainIcon
            sx={{
              fontSize: 30,
              color: checked
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(0, 0, 0, 0.8)",
            }}
          ></GrainIcon>
          <Typography
            fontSize={20}
            sx={{
              color: checked
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(0, 0, 0, 0.8)",
            }}
          >
            Heavy Rain
          </Typography>
        </>
      )}
      {index === 83 && (
        <>
          <ThunderstormIcon
            sx={{
              fontSize: 30,
              color: checked
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(0, 0, 0, 0.8)",
            }}
          ></ThunderstormIcon>
          <Typography
            fontSize={20}
            sx={{
              color: checked
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(0, 0, 0, 0.8)",
            }}
          >
            thunder
          </Typography>
        </>
      )}
      {index === 84 && (
        <>
          <ThunderstormIcon
            sx={{
              fontSize: 30,
              color: checked
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(0, 0, 0, 0.8)",
            }}
          ></ThunderstormIcon>
          <Typography
            fontSize={20}
            sx={{
              color: checked
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(0, 0, 0, 0.8)",
            }}
          >
            heavy thunder
          </Typography>
        </>
      )}
    </Stack>
  );
};

export default WeatherIcon2;
