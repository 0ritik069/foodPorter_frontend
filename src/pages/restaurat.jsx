import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Avatar,
  Box,
  Button,
  Chip,
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

const BASE_URL = "http://192.168.1.80:5000";
const API = axios.create({ baseURL: `${BASE_URL}/api` });
const PER_PAGE = 10;

const getImageUrl = (path) =>
  path?.startsWith("http") ? path : `${BASE_URL}/${path}`;
const normalize = (r) => ({ ...r, id: r.id || r._id });

const emptyForm = {
  id: "",
  name: "",
  ownerName: "",
  email: "",
  phone: "",
  address: "",
  status: "open",
  image: null,
  preview: "",
};

export default function ManageRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [addData, setAddData] = useState({ ...emptyForm, password: "" });

  const showToast = (title, icon = "success") =>
    Swal.fire({ title, icon, toast: true, timer: 2000, position: "top" });

  const fetchRestaurants = async (signal) => {
    setLoading(true);
    try {
      const { data } = await API.get("/restaurants", { signal });
      const list = (data.data || data).map(normalize);
      setRestaurants(list);
      setError("");
    } catch (err) {
      if (!axios.isCancel(err)) setError("Failed to fetch restaurants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchRestaurants(controller.signal);
    return () => controller.abort();
  }, []);

  const handleView = async (id) => {
    try {
      const { data } = await API.get(`/restaurants/${id}`);
      setRestaurantDetails(normalize(data.data || data));
      setOpenView(true);
    } catch {
      showToast("Unable to fetch", "error");
    }
  };

  const handleDelete = async (id) => {
    const c = await Swal.fire({
      title: "Delete?",
      text: "Permanent!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });
    if (!c.isConfirmed) return;
    try {
      await API.delete(`/restaurants/${id}`);
      fetchRestaurants();
      showToast("Deleted");
    } catch (err) {
      showToast("Delete failed", "error");
    }
  };

  const toggleStatus = async (id, current) => {
    try {
      await API.patch(`/restaurants/${id}/status`, {
        status: current === "open" ? "closed" : "open",
      });
      fetchRestaurants();
    } catch {
      showToast("Status update failed", "error");
    }
  };

  const openEditModal = (r) => {
    setFormData({ ...emptyForm, ...r, preview: r.image, image: null });
    setOpenEdit(true);
  };

  const handleSave = async () => {
    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => {
      if (k === "id" || k === "preview") return;
      if (k === "image" && !v) return;
      fd.append(k, v);
    });

    try {
      await API.put(`/restaurants/${formData.id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showToast("Restaurant updated");
      setOpenEdit(false);
      fetchRestaurants();
    } catch (err) {
      showToast("Update failed", "error");
    }
  };

  const handleAdd = async () => {
    const { name, ownerName, email, phone, password, address } = addData;
    if (!name || !ownerName || !email || !phone || !password || !address)
      return showToast("All fields required", "warning");

    const fd = new FormData();
    Object.entries(addData).forEach(([k, v]) => {
      if (k === "image" && !v) return;
      fd.append(k, v);
    });

    try {
      await API.post("/restaurants", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showToast("Restaurant created");
      setOpenAdd(false);
      setAddData({ ...emptyForm, password: "" });
      fetchRestaurants();
    } catch (err) {
      showToast("Creation failed", "error");
    }
  };

  const filtered = restaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );
  const slice = filtered.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <Box p={3}>
      <Box
        mb={3}
        display="flex"
        gap={2}
        alignItems="center"
        flexWrap="wrap"
        justifyContent="space-between"
      >
        <Typography variant="h5" fontWeight={600}>
          Manage Restaurants
        </Typography>

        <Box display="flex" gap={2}>
          <TextField
            size="small"
            placeholder="Search by name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            sx={{
              backgroundColor: "#facc15",
              color: "#000",
              textTransform: "none",
              "&:hover": { backgroundColor: "#eab308" },
            }}
            onClick={() => setOpenAdd(true)}
          >
            + Add Restaurant
          </Button>
        </Box>
      </Box>

      {loading && (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      )}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <Paper sx={{ maxHeight: "calc(100vh - 300px)", overflow: "auto" }}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {["Img", "Name", "Owner", "Phone", "City", "Status", "Actions"].map((h) => (
                    <TableCell key={h}>
                      <b>{h}</b>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {slice.map((r) => (
                  <TableRow key={r.id} hover>
                    <TableCell>
                      <Avatar src={getImageUrl(r.image)} alt={r.name} />
                    </TableCell>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.ownerName}</TableCell>
                    <TableCell>{r.phone}</TableCell>
                    <TableCell sx={{ maxWidth: 160 }}>
                      {r.city || "—"}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={r.status}
                        size="small"
                        color={r.status === "open" ? "success" : "error"}
                        sx={{ mr: 1 }}
                      />
                      <Switch
                        size="small"
                        checked={r.status === "open"}
                        onChange={() => toggleStatus(r.id, r.status)}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => handleView(r.id)}>
                        <VisibilityIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton size="small" onClick={() => openEditModal(r)}>
                        <EditIcon fontSize="inherit" sx={{ color: "#f59e0b" }} />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDelete(r.id)}>
                        <DeleteIcon fontSize="inherit" sx={{ color: "red" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={filtered.length}
            page={page}
            rowsPerPage={PER_PAGE}
            onPageChange={(_, p) => setPage(p)}
          />
        </Paper>
      )}
    </Box>
  );
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
  width: 460,
  maxHeight: "85vh",
  overflowY: "auto",
};
