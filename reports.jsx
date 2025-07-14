import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {

    Avatar,
    Box,
    Button,
    CircularProgress,
    IconButton,
    Modal,
    Paper,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { baseUrl } from "../../features/Api/BaseUrl";

const BaseUrl =  axios.create({ baseURL: baseUrl});


