import React from "react";
import { Avatar } from "@mui/material";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

export default function UnSupportIcon(props) {

  return (
    <Avatar style={{ backgroundColor: "#ff1270" }}>
      <HighlightOffOutlinedIcon style={{ color: 'white'}}></HighlightOffOutlinedIcon>
    </Avatar>
  );
}