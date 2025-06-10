import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  OutlinedInput,
  CardMedia,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignupThunk from "../../Store/Redux-Thunks/SignupThunk";
import toast, { Toaster } from "react-hot-toast";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";

const SignUpPage = () => {
  const dispatch = useDispatch();
const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      gender: "",
    },
  });

  const { signupUser, signupLoading } = useSelector(
    (state) => state.SignupSlice
  );

  const onSubmit = async (data) => {
    try {
      const res = await dispatch(SignupThunk(data)).unwrap();
      console.log(data, "data");

      toast.success(signupUser?.message || "Registration Success!");
      reset();
      navigate("/login")
      // without catching error unwrap doesn't work
    } catch (error) {
      console.error(error?.message || "Something Went Wrong");
      toast.error(error?.message || "Something Went Wrong");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Box
        sx={{
          height: "100vh",
          backgroundImage: 'url("/imgs/background.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          className="container"
          sx={{
            height: "100vh",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around", // aligns the card to the right
            alignItems: "center", // vertically centers the card
            //   px: 2,
          }} // horizontal padding for small screens}}
        >
          <Box className="d-flex flex-column align-items-center">
            <CardMedia
              sx={{ width: "300px" }}
              component="img"
              image="/imgs/logo_big.png"
            />
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Paper
              elevation={6}
              sx={{
                width: "100%",
                maxWidth: 350,
                p: 3,
                borderRadius: 3,
                mr: { xs: 0, sm: 4 }, // margin right on medium+ screens
              }}
            >
              <Typography variant="h5" mb={2}>
                Sign up
              </Typography>
              <Box sx={{ gap: "15px" }} className="d-flex flex-column">
                {/* USERNAME */}
                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: { value: true, message: "Username is required!" },
                  }}
                  render={({ field }) => (
                    <TextField
                      error={!!errors?.username}
                      {...field}
                      size="small"
                      fullWidth
                      placeholder="Username"
                      sx={{
                        height: "37px",
                        borderRadius: "4px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "4px",
                          "& fieldset": {
                            borderColor: "#ccc",
                          },
                          "&:hover fieldset": {
                            borderColor: "#ccc", // neutral hover
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#1976D2", // neutral focus
                            boxShadow: "none",
                          },
                        },
                      }}
                    />
                  )}
                />
                {errors?.username && (
                  <Typography
                    sx={{ marginTop: "-12px" }}
                    variant="body2"
                    color="error"
                    component="span"
                  >
                    {errors?.username?.message}
                  </Typography>
                )}
                {/* Email */}
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email Is Required!",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address!",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors?.email}
                      size="small"
                      fullWidth
                      placeholder="Email"
                      sx={{
                        height: "37px",
                        borderRadius: "4px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "4px",
                          "& fieldset": {
                            borderColor: "#ccc",
                          },
                          "&:hover fieldset": {
                            borderColor: "#ccc", // neutral hover
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#1976D2", // neutral focus
                            boxShadow: "none",
                          },
                        },
                      }}
                    />
                  )}
                />{" "}
                {errors?.email && (
                  <Typography
                    sx={{ marginTop: "-12px" }}
                    variant="body2"
                    color="error"
                    component="span"
                  >
                    {errors?.email?.message}
                  </Typography>
                )}
                {/* PASSWORD */}
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required!",
                    pattern: {
                      value:
                        /^[A-Z][A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{5,16}$/,
                      message:
                        "Password must be 6 characters long, start with a capital letter, and may include special characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={errors?.password}
                      size="small"
                      fullWidth
                      placeholder="Password"
                      sx={{
                        height: "37px",
                        borderRadius: "4px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "4px",
                          "& fieldset": {
                            borderColor: "#ccc",
                          },
                          "&:hover fieldset": {
                            borderColor: "#ccc", // neutral hover
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#1976D2", // neutral focus
                            boxShadow: "none",
                          },
                        },
                      }}
                    />
                  )}
                />{" "}
                {errors?.password && (
                  <Typography
                    sx={{ marginTop: "-12px" }}
                    variant="body2"
                    color="error"
                    component="span"
                  >
                    {errors?.password?.message}
                  </Typography>
                )}
              </Box>

              <FormControl>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      row
                      value={field.value || ""}
                      // connecting radio group with form hook
                      onChange={(e) => field.onChange(e.target.value)}
                      sx={{ marginTop: "10px" }}
                    >
                      <FormControlLabel
                        value="male"
                        control={
                          <Radio
                            disableRipple
                            sx={{
                              marginRight: "-6px",
                              "& .MuiSvgIcon-root": { fontSize: 20 },
                              "&:hover": { backgroundColor: "transparent" },
                              "& .MuiTouchRipple-root": { display: "none" },
                            }}
                          />
                        }
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={
                          <Radio
                            disableRipple
                            sx={{
                              marginRight: "-6px",
                              "& .MuiSvgIcon-root": { fontSize: 20 },
                              "&:hover": { backgroundColor: "transparent" },
                              "& .MuiTouchRipple-root": { display: "none" },
                            }}
                          />
                        }
                        label="Female"
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>
              {errors?.gender && (
                <Typography
                  sx={{ marginTop: "-5px" }}
                  variant="body2"
                  color="error"
                >
                  {errors?.gender?.message}
                </Typography>
              )}

              {/* Signup Button */}

              <Button
                className="signup-button bg-primary text-white text-capitalize"
                disabled={signupLoading}
                type="submit"
                fullWidth
                sx={{ mt: 2 }}
              >
                {signupLoading ? (
                  <>
                    Creating...
                    <LoadingComponent />
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 14, // smaller checkbox icon
                      },
                      padding: "4px ", // reduce checkbox padding
                    }}
                  />
                }
                label="Agree to the terms of use & privacy policy."
                sx={{
                  mt: 2,
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                    fontWeight: "normal",
                  },
                }}
              />
              <Typography
                className="d-flex align-items-center gap-1 fs-14 fw-light"
                variant="body2"
                sx={{ mt: 2 }}
              >
                Already have an account?
                <Link className="text-primary text-decoration-none" to="/login">
                  <Typography variant="body1">Login here</Typography>
                </Link>
              </Typography>
            </Paper>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default SignUpPage;
