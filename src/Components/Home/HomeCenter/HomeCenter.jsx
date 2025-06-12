import React, { useEffect, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Typography,
  Avatar,
  Divider,
  Card,
  Skeleton,
  CardMedia,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";
import toast from "react-hot-toast";
import SendMessageThunk from "../../Store/Redux-Thunks/SendMessageThunk";
import ReceiveMessageThunk from "../../Store/Redux-Thunks/ReceiveMessageThunk";
import GetProfileThunk from "../../../Components/Store/Redux-Thunks/GetProfileThunk";
import { Icon } from "@iconify-icon/react/dist/iconify.js";

const HomeCenter = (props) => {
  const dispatch = useDispatch();
  const { selectedChat, receiverId, isMobile, onSelectBackChat, onSelectChat } = props;
  
  const handleBackToChat = () => {
    onSelectBackChat();
  };
  const { getProfileUser } = useSelector((state) => state.GetProfileSlice);
  const { sendMessage, sendMessageLoading } = useSelector(
    (state) => state.SendMessageSlice
  );
  const { receiveMessage, receiveMessageLoading } = useSelector(
    (state) => state.ReceiveMessageSlice
  );
  const { getOtherUsersLoading } = useSelector(
    (state) => state.GetOtherUsersSlice
  );

  // const bottomRef = useRef(null);

  const myId = getProfileUser?.registeredUser?._id;

  useEffect(() => {
    dispatch(GetProfileThunk());
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedChat._id) {
        try {
          await dispatch(ReceiveMessageThunk(selectedChat._id)).unwrap();
        } catch (error) {
          toast.error(error.message);
          // receiveMessage Redux state doesn't get cleared.
          // Dispatch an action to clear old messages
          dispatch({ type: "CLEAR_RECEIVE_MESSAGES" });
        }
      }
    };
    fetchMessages();
  }, [myId, sendMessage, selectedChat?._id]);

  // useEffect(() => {
  //   bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  // }, [receiveMessage]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(
        SendMessageThunk({ data, receiverId })
      ).unwrap();

      reset();
    } catch (error) {
      toast.error(error?.message || "Something Went Wrong");
    }
  };

  if (!selectedChat?._id) {
    return (
      <Card
        sx={{
          p: 2,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CardMedia sx={{width:"300px",height:"auto"}} image="/imgs/select chat.jpg" component="img" />
          <Typography variant="h6" color="text.secondary">
            Whoops! No Chat Selected <br /> Select any chat to continue
          </Typography>
        </Box>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        display: "flex",
        height: "100vh",
        // maxHeight: "100vh",
        flexDirection: "column",
        backgroundColor: "#f5f8ff",
      }}
    >
      {/* Top Header */}
      <Box
        sx={{
          px: 2,
          py: 1,
          backgroundColor: "#f5f8ff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {getOtherUsersLoading ? (
          <Box className="d-flex align-items-center px-1 py-1 gap-2">
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ width: "100%" }}>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Back Button */}
            {isMobile && (
              <Button
                onClick={handleBackToChat}
                sx={{ minWidth: "0" }}
                size="small"
              >
                <iconify-icon
                  icon="ic:sharp-arrow-back"
                  width="25"
                  height="25"
                ></iconify-icon>
              </Button>
            )}

            <Avatar
              src={selectedChat?.profilePhoto}
              sx={{ width: 40, height: 40 }}
            />
            <Typography
              className="text-capitalize"
              sx={{ fontWeight: "medium" }}
            >
              {selectedChat?.username}
            </Typography>
          </Box>
        )}
        <Button>
          <BubbleChartIcon sx={{ color: "black" }} />
        </Button>
      </Box>

      <Divider component="div" color="black" />

      {/* Messages Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          backgroundColor: "#f5f8ff",
        }}
      >
        {receiveMessageLoading ? (
          [...Array(5)].map((_, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                gap: "10px",
                alignSelf: index % 2 ? "flex-end" : "flex-start",
              }}
            >
              {index % 2 === 0 && (
                <Skeleton variant="circular" width={30} height={30} />
              )}
              <Skeleton variant="rounded" width={200} height={35} />
              {index % 2 !== 0 && (
                <Skeleton variant="circular" width={30} height={35} />
              )}
            </Box>
          ))
        ) : receiveMessage?.length > 0 ? (
          receiveMessage.map((msg) => {
            const isMe = msg.senderId === myId;
            return (
              <Box
                key={msg._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: isMe ? "#007AFF" : "#e5e5ea",
                  color: isMe ? "white" : "black",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  alignSelf: isMe ? "flex-end" : "flex-start",
                }}
              >
                <Avatar
                  src={
                    isMe
                      ? getProfileUser?.registeredUser?.profilePhoto
                      : selectedChat?.profilePhoto
                  }
                  sx={{ width: 30, height: 30 }}
                />
                <Typography variant="body2">{msg.message}</Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    textAlign: "right",
                    color: isMe ? "white" : "grey",
                  }}
                >
                  {new Date(msg.createdAt).toLocaleTimeString() || "12:00"}
                </Typography>
              </Box>
            );
          })
        ) : (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body1" color="text.secondary">
              No messages yet
            </Typography>
          </Box>
        )}
        {/* <Box ref={bottomRef} /> */}
      </Box>

      {/* Input Field */}
      <Box
        sx={{
          borderTop: "1px solid #ddd",
          p: 2,
          backgroundColor: "white",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
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
                      <Button
                        sx={{
                          minWidth: "0",
                          "&:hover": {
                            backgroundColor: "transparent", // Removes hover background
                          },
                        }}
                        disableRipple
                        size="small"
                      >
                        <PhotoLibraryIcon sx={{ color: "gray" }} />
                      </Button>
                      <Button
                        disableRipple
                        disabled={sendMessageLoading}
                        type="submit"
                        sx={{
                          minWidth: "0",
                          "&:hover": {
                            backgroundColor: "transparent", // Removes hover background
                          },
                        }}
                        size="small"
                      >
                        {sendMessageLoading ? (
                          <LoadingComponent />
                        ) : (
                          <SendIcon sx={{ color: "#007bff" }} />
                        )}
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </form>
      </Box>
    </Card>
  );
};

export default HomeCenter;
