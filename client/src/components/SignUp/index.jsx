import React, { useState } from "react";
import { Button, Modal } from "@components";
import styled from "@emotion/styled";
import styles from "@style";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import Swal from "sweetalert2";

const Title = styled.div`
    display: flex;
    font-size: 35px;
    font-weight: bold;
    margin: 30px 0 20px 0;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 50%;
    margin-top: 20px;

    @media ${styles.media.sm} {
        width: 100%;
        flex-direction: column;
        align-items: center;
        font-size: ${styles.fontStyle.small};
        margin-top: 5px;
        Button:nth-of-type(1) {
            margin-bottom: 10px;
        }
    }
`;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
    },
    margin: {
        margin: "10px 0",
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: "25ch",
    },
}));

const SignUp = ({ onClick, ...props }) => {
    const classes = useStyles();
    const [values, setValues] = useState({
        PID: "",
        password: "",
        password2: "",
        name: "",
        email: "",
        team: undefined,
        phone: "",
        nickname: "",
        showPassword: false,
        showPassword2: false,
    });

    const team = JSON.parse(sessionStorage.getItem("team"));

    const handleChangePID = (event) => {
        setValues({ ...values, PID: parseInt(event.target.value) });
    };

    const handleChangePW = (event) => {
        setValues({ ...values, password: event.target.value });
    };

    const handleChangePW2 = (event) => {
        setValues({ ...values, password2: event.target.value });
    };

    const handleChangeName = (event) => {
        setValues({ ...values, name: event.target.value });
    };

    const handleChangeEmail = (event) => {
        setValues({ ...values, email: event.target.value });
    };

    const handleChangeTeam = (event) => {
        setValues({ ...values, team: event.target.value });
    };

    const handleChangePhone = (event) => {
        setValues({ ...values, phone: event.target.value });
    };

    const handleChangeNickname = (event) => {
        setValues({ ...values, nickname: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleClickShowPassword2 = () => {
        setValues({ ...values, showPassword2: !values.showPassword2 });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickConfirmButton = () => {
        const { PID, password, password2, name, email, team, phone, nickname } = values;
        let errorMsg = "";
        let isError = false;

        if (PID === "") {
            errorMsg = "????????? ??????????????????!";
            isError = true;
        } else if (password.length < 8 || password.length > 20) {
            errorMsg = "??????????????? 8??? ??????, 20??? ????????? ??????????????????!";
            isError = true;
        } else if (password2 === "") {
            errorMsg = "???????????? ????????? ???????????????!";
            isError = true;
        } else if (name === "") {
            errorMsg = "????????? ??????????????????!";
            isError = true;
        } else if (email === "") {
            errorMsg = "???????????? ??????????????????!";
            isError = true;
        } else if (team === "") {
            errorMsg = "????????? ??????????????????!";
            isError = true;
        } else if (phone === "") {
            errorMsg = "????????? ????????? ??????????????????!";
            isError = true;
        } else if (password !== password2) {
            errorMsg = "??????????????? ???????????? ????????????!";
            isError = true;
        }

        if (isError) {
            Swal.fire({
                icon: "warning",
                title: errorMsg,
            });
        } else {
            axios
                .post("/api/signup", null, {
                    params: {
                        PID,
                        password,
                        name,
                        email,
                        team,
                        phone,
                        nickname,
                    },
                })
                .then((res) => {
                    if (res.data === "success") {
                        Swal.fire({
                            icon: "success",
                            title: "???????????? ??????!",
                        }).then(() => {
                            onClick();
                        });
                    } else if (res.data === "duplicated") {
                        Swal.fire({
                            icon: "error",
                            title: "?????? ????????? ???????????????!",
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: res.data,
                        });
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "????????? ??????????????????!",
                    });
                });
        }
    };

    return (
        <Modal>
            <Title>????????????</Title>
            <div className={classes.root}>
                <TextField
                    className={classes.margin}
                    required
                    id="standard-required"
                    label="??????"
                    defaultValue=""
                    onChange={handleChangePID}
                />
                <FormControl className={clsx(classes.margin, classes.textField)} required>
                    <InputLabel htmlFor="standard-adornment-password">????????????</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={values.showPassword ? "text" : "password"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        onChange={handleChangePW}
                    />
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.textField)} required>
                    <InputLabel htmlFor="standard-adornment-password">???????????? ??????</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={values.showPassword2 ? "text" : "password"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword2}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        onChange={handleChangePW2}
                    />
                </FormControl>
                <TextField
                    className={classes.margin}
                    required
                    id="standard-required"
                    label="??????"
                    defaultValue=""
                    onChange={handleChangeName}
                />
                <TextField
                    className={classes.margin}
                    required
                    id="standard-required"
                    label="?????????"
                    defaultValue=""
                    onChange={handleChangeEmail}
                />
                <FormControl className={classes.margin} required>
                    <InputLabel id="demo-simple-select-label">??????</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.team || ""}
                        onChange={handleChangeTeam}
                    >
                        {team.map((v, index) => (
                            <MenuItem value={v.TID} key={index}>
                                {v.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    className={classes.margin}
                    required
                    id="standard-required"
                    label="?????????"
                    defaultValue=""
                    onChange={handleChangePhone}
                />
                <TextField
                    className={classes.margin}
                    id="standard"
                    label="?????????"
                    defaultValue=""
                    onChange={handleChangeNickname}
                />
            </div>
            <ButtonContainer>
                <Button
                    backgroundColor={styles.color.confirm}
                    style={{ width: "100px" }}
                    onClick={handleClickConfirmButton}
                >
                    ????????????
                </Button>
                <Button
                    backgroundColor={styles.color.cancel}
                    style={{ width: "100px" }}
                    onClick={onClick}
                >
                    ????????????
                </Button>
            </ButtonContainer>
        </Modal>
    );
};

export default SignUp;
