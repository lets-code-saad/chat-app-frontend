import React, { useState } from "react";
import HomeLeft from "./HomeLeft/HomeLeft/HomeLeft";
import { Box, Grid } from "@mui/material";
import HomeRight from "./HomeRight/HomeRight";
import HomeCenter from "./HomeCenter/HomeCenter";
import { chatData } from "./ChatList";

const HomePage = () => {
  // creating states to manage selected chat
  const [selectedChatId, setSelectedChatId] = useState(null);
  // finding the correct chat based on id
  console.log("All chats:", chatData);
  console.log("Selected ID:", selectedChatId);
  const selectedChat = chatData.find((chat) => String(chat.id) === String(selectedChatId));
  console.log("Found chat:", selectedChat);

  return (
    <Box className="bg-white">
      <Grid container spacing={2} className="container-fluid">
        <Grid item size={{ sm: 12, lg: 3, xl: 3, xs: 12 }}>
          <HomeLeft
            chatData={chatData}
            selectedChatId={selectedChatId}
            onSelectChat={setSelectedChatId}
          />
        </Grid>
        <Grid item size={{ sm: 12, lg: 6, xl: 6, xs: 12 }}>
          <HomeCenter
            selectedChat={
              selectedChat || { id: "", name: "", img: "", messages: [] }
            }
            selectedChatId={selectedChatId}
          />
        </Grid>
        <Grid item size={{ sm: 12, lg: 3, xl: 3, xs: 12 }}>
          <HomeRight
            selectedChat={
              selectedChat || { id: "", name: "", img: "", messages: [] }
            }
            selectedChatId={selectedChatId}
            onSelectChat={setSelectedChatId}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
