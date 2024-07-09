import React from "react";
import { Avatar } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

export default function SupportIcon(props) {

  return (
    <Avatar style={{ backgroundColor: "#1298ff" }}>
      <CheckCircleOutlineOutlinedIcon style={{ color: 'white'}}></CheckCircleOutlineOutlinedIcon>
    </Avatar>
  );
}