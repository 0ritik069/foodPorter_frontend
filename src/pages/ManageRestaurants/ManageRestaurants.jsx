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

const BASE_URL = "http://192.168.1.82:5000";
const API = axios.create({ baseURL: `${BASE_URL}/api` });
const PER_PAGE = 10;

const getImageUrl = (path) =>
  path?.startsWith("http") ? path : `${BASE_URL}/${path}`;
const normalize = (r) => ({ ...r, id: r.id || r._id });

const emptyForm = {
  id: "",
  name: "",
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
      const { data } = await API.post("/restaurants/list", { signal });
      const list = (data.data || data).map(normalize);
      setRestaurants(list);
    } catch {
      showToast("Failed to fetch restaurants", "error");
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

  const openEditModal = async (id) => {
    try {
      const { data } = await API.get(`/restaurants/${id}`);
      const res = normalize(data.data || data);
      setFormData({ ...emptyForm, ...res, preview: res.image, image: null });
      setOpenEdit(true);
    } catch {
      showToast("Unable to fetch", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete?",
      text: "Restaurant will be removed permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });
    if (!confirm.isConfirmed) return;
    try {
      await API.delete(`/restaurants/${id}`);
      fetchRestaurants();
      showToast("Deleted");
    } catch {
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
    } catch {
      showToast("Update failed", "error");
    }
  };

  const handleAdd = async () => {
    const { name, email, phone, password, address } = addData;
    if (!name || !email || !phone || !password || !address)
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
    } catch {
      showToast("Creation failed", "error");
    }
  };

  const filtered = restaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );
  const slice = filtered.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <Box p={3}>
      <Box mb={3} display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
        <Typography variant="h5" fontWeight={600}>Manage Restaurants</Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField size="small" label="Search name" value={search} onChange={(e) => setSearch(e.target.value)} />
          <Button
            variant="contained"
            sx={{ backgroundColor: "#facc15", color: "#000", textTransform: "none", "&:hover": { backgroundColor: "#eab308" } }}
            onClick={() => setOpenAdd(true)}
          >
            + Add Restaurant
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Box display="flex" height={300} alignItems="center" justifyContent="center"><CircularProgress /></Box>
      ) : (
        <Paper elevation={3}>
          <TableContainer sx={{ maxHeight: 740 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {["Img", "Name", "Phone", "City", "Status", "Actions"].map((h) => (
                    <TableCell key={h}><b>{h}</b></TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {slice.map((r) => (
                  <TableRow key={r.id} hover>
                    <TableCell><Avatar src={getImageUrl(r.image)} alt={r.name} /></TableCell>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.phone}</TableCell>
                    <TableCell>{r.city || "—"}</TableCell>
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
                      <Box display="flex" gap={1}>
                        <IconButton size="small" onClick={() => handleView(r.id)}><VisibilityIcon fontSize="small" /></IconButton>
                        <IconButton size="small" onClick={() => openEditModal(r.id)} sx={{ color: "#f59e0b" }}><EditIcon fontSize="small" /></IconButton>
                        <IconButton size="small" onClick={() => handleDelete(r.id)} sx={{ color: "red" }}><DeleteIcon fontSize="small" /></IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            onPageChange={(_, p) => setPage(p)}
            rowsPerPage={PER_PAGE}
            rowsPerPageOptions={[]}
          />
        </Paper>
      )}

     
      <Modal open={openView} onClose={() => setOpenView(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2} fontWeight={600}>Restaurant Details</Typography>
          {restaurantDetails ? (
            <Table size="small">
              <TableBody>
                {Object.entries({
                  Name: restaurantDetails.name,
                  Email: restaurantDetails.email,
                  Phone: restaurantDetails.phone,
                  Address: restaurantDetails.address,
                  Status: restaurantDetails.status,
                }).map(([k, v]) => (
                  <TableRow key={k}>
                    <TableCell sx={{ fontWeight: 600 }}>{k}</TableCell>
                    <TableCell>
                      {k === "Status" ? (
                        <Chip label={v} size="small" color={v === "open" ? "success" : "error"} />
                      ) : v}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : <CircularProgress />}
          <Box textAlign="right" mt={2}>
            <Button variant="contained" onClick={() => setOpenView(false)}>Close</Button>
          </Box>
        </Box>
      </Modal>

    
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2} fontWeight={600}>Edit Restaurant</Typography>
          <Avatar
            sx={{ width: 56, height: 56, mb: 1 }}
            src={formData.image ? URL.createObjectURL(formData.image) : getImageUrl(formData.preview)}
          />
          {["name", "email", "phone", "address"].map((f) => (
            <TextField
              key={f}
              label={f.charAt(0).toUpperCase() + f.slice(1)}
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              value={formData[f]}
              onChange={(e) => setFormData({ ...formData, [f]: e.target.value })}
            />
          ))}
          <Button component="label" sx={{ mb: 2 }}>
            Upload Image
            <input hidden type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] })} />
          </Button>
          <Box textAlign="right">
            <Button onClick={() => setOpenEdit(false)} sx={{ mr: 1 }}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>Save</Button>
          </Box>
        </Box>
      </Modal>

   
      <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2} fontWeight={600}>Add Restaurant</Typography>
          <Avatar
            sx={{ width: 56, height: 56, mb: 1 }}
            src={addData.image ? URL.createObjectURL(addData.image) : ""}
          />
          {["name", "email", "phone", "password", "address"].map((field) => (
            <TextField
              key={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              value={addData[field]}
              onChange={(e) => setAddData({ ...addData, [field]: e.target.value })}
            />
          ))}
          <Button component="label" sx={{ mb: 2 }}>
            Upload Image
            <input hidden type="file" accept="image/*" onChange={(e) => setAddData({ ...addData, image: e.target.files?.[0] })} />
          </Button>
          <Box textAlign="right">
            <Button onClick={() => setOpenAdd(false)} sx={{ mr: 1 }}>Cancel</Button>
            <Button variant="contained" onClick={handleAdd}>Add</Button>
          </Box>
        </Box>
      </Modal>
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
