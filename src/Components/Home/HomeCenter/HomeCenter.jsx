import React, { useEffect } from "react";
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
import { setSendMessage } from "../../Store/Redux-Slices/SendMessageSlice";

const HomeCenter = (props) => {
  const dispatch = useDispatch();
  const { selectedChat, receiverId } = props;

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

  useEffect(() => {
    if (selectedChat?._id) {
      dispatch(ReceiveMessageThunk(selectedChat._id));
    }
  }, [selectedChat?._id, dispatch]);

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

      toast.success(response.message);
      console.log(response, "sendMsg");

      reset();
    } catch (error) {
      toast.error(error?.message || "Something Went Wrong");
    }
  };
  console.log(sendMessage._id, "sendId");
  console.log(receiveMessage._id, "receiveId");
  

  // No chat selected state - with "come later" image
  if (!selectedChat?._id) {
    return (
      <Card
        sx={{
          p: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CardMedia
            className="img-fluid"
            image="/imgs/no chat selected.jpg"
            component="img"
          />
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
        height: "100%",
        maxHeight: "100vh",
        flexDirection: "column",
        backgroundColor: "#f5f8ff", // Match your original background
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
          <>
            {/* Received Messages */}
            <Box
              sx={{
                marginRight: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                mb: 1,
              }}
            >
              {receiveMessage.map((msg) => (
                <Box
                  key={msg._id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor: "#e5e5ea",
                    color: "black",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                  }}
                >
                  <Avatar
                    src={selectedChat.profilePhoto}
                    sx={{ width: 30, height: 30, ml: 1 }}
                  />
                  <Typography variant="body2">{msg.message}</Typography>
                  <Typography
                    sx={{ fontSize: 12, textAlign: "right", color: "gray" }}
                  >
                    {msg.time}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Sent Messages */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                mb: 1,
              }}
            >
              {sendMessage?.map((msg) => (
                <Box
                  key={msg._id}
                  sx={{
                    marginLeft: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor: "#007AFF",
                    color: "black",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                  }}
                >
                  <Avatar
                    src={msg.profilePhoto}
                    sx={{ width: 30, height: 30, ml: 1 }}
                  />
                  <Typography variant="body2">
                    {msg.message || "ERR"}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 12, textAlign: "right", color: "gray" }}
                  >
                    {msg.time || "12:00"}
                  </Typography>
                </Box>
              ))}
            </Box>
          </>
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
      </Box>

      {/* Input Field at Bottom */}
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
                      <Button sx={{ minWidth: "0" }} size="small">
                        <PhotoLibraryIcon sx={{ color: "gray" }} />
                      </Button>
                      <Button
                        disabled={sendMessageLoading}
                        type="submit"
                        sx={{ minWidth: "0" }}
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
