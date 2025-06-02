import React from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Typography,
  Avatar,
  Divider,
  Card,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";

const HomeCenter = (props) => {
  const { selectedChat, onSelectChat } = props;

  return (
    <Card
      key={selectedChat?.id}
      sx={{
        // backgroundColor: "#f5f8ff",
        display: "flex",
        height: "100%",
        maxHeight: "100vh",
        flexDirection: "column",
      }}
    >
      {/* Top Header */}
      <Box
        sx={{
          px: 2,
          py: 1,
          // backgroundColor: "#f5f8ff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar src={selectedChat?.img} sx={{ width: 40, height: 40 }} />
          <Typography className="text-capitalize" sx={{ fontWeight: "medium" }}>
            {selectedChat?.name}
          </Typography>
        </Box>
        <Button>
          <BubbleChartIcon sx={{ color: "black" }} />
        </Button>
      </Box>

      <Divider component="div" color="black" />

      {/* Messages Area */}
      {/* Receiver Message */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          // justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            marginRight: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            mb: 1,
          }}
        >
          {selectedChat?.messages?.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "#f1f0f0;",
                color: "black",
                px: 2,
                py: 1,
                borderRadius: 2,
              }}
            >
              <Avatar src={selectedChat.img} sx={{ width: 30, height: 30, ml: 1 }} />
              <Typography variant="body2">{msg.text}</Typography>
              <Typography
                sx={{ fontSize: 12, textAlign: "right", color: "gray" }}
              >
                {msg.time}
              </Typography>
            </Box>
          ))}
        </Box>
        {/* Sender Message */}
        <Box
          sx={{
            marginLeft: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            mb: 1,
          }}
        >
          {selectedChat?.messages?.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "#0078fe;",
                color: "white",
                px: 2,
                py: 1,
                borderRadius: 2,
              }}
            >
              <Avatar src={selectedChat.img} sx={{ width: 30, height: 30, ml: 1 }} />
              <Typography variant="body2">{msg.text}</Typography>
              <Typography
                sx={{ fontSize: 12, display: "block", color: "white" }}
              >
                {msg.time}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Input Field at Bottom */}
      <Box
        sx={{
          borderTop: "1px solid #ddd",
          p: 2,
          backgroundColor: "white",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Send a message"
          size="small"
          fullWidth
          sx={{
            backgroundColor: "#f0f0f0",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { border: "none" },
              "& input": { padding: "10px" },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button sx={{ minWidth: "0" }} size="small">
                  <PhotoLibraryIcon sx={{ color: "gray" }} />
                </Button>
                <Button sx={{ minWidth: "0" }} size="small">
                  <SendIcon sx={{ color: "#007bff" }} />
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Card>
  );
};

export default HomeCenter;
