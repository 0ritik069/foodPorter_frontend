import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  Tooltip,
  Typography
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const API = axios.create({ baseURL: 'http://192.168.1.80:5000/api' });
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


const PER_PAGE = 8;
const emptyForm = {
  name: '',
  category: '',
  price: '',
  availability: true,
  image: null
};

export default function RestaurantMenu({ restaurantId }) {

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

 
  const [openView, setOpenView] = useState(false);
  const [details, setDetails] = useState(null);

 
  const [openDlg, setOpenDlg] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  
  const showToast = (title, icon = 'success') =>
    Swal.fire({ title, toast: true, timer: 2000, position: 'top', icon });

  const fetchMenu = async (signal) => {
    setLoading(true);
    try {
      const url = restaurantId
        ? `/dishes/restaurant/${restaurantId}`
        : '/dishes';
      const { data } = await API.get(url, { signal });
      setDishes(data.data || data);
    } catch (err) {
      if (!axios.isCancel(err))
        showToast('Failed to load dishes', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const c = new AbortController();
    fetchMenu(c.signal);
    return () => c.abort();
  }, [restaurantId]);

  
  const handleView = async (id) => {
    try {
      const { data } = await API.get(`/dishes/${id}`);
      setDetails(data.data || data);
      setOpenView(true);
    } catch {
      showToast('Unable to fetch item', 'error');
    }
  };

  const openAddDialog = () => {
    setIsEdit(false);
    setCurrentId(null);
    setFormData(emptyForm);
    setOpenDlg(true);
  };

  const openEditDialog = (dish) => {
    setIsEdit(true);
    setCurrentId(dish.id);
    setFormData({ ...emptyForm, ...dish, image: null });
    setOpenDlg(true);
  };

  const handleDelete = async (id) => {
    const c = await Swal.fire({
      title: 'Delete dish?',
      text: 'This action is irreversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33'
    });
    if (!c.isConfirmed) return;
    try {
      await API.delete(`/dishes/${id}`);
      showToast('Deleted');
      fetchMenu();
    } catch {
      showToast('Delete failed', 'error');
    }
  };

  const handleSave = async () => {
    const { name, category, price } = formData;
    if (!name || !category || !price) return showToast('All fields required', 'warning');

    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => {
      if (k === 'image' && !v) return;
      fd.append(k, v);
    });
    if (restaurantId) fd.append('restaurantId', restaurantId);

    try {
      if (isEdit) {
        await API.put(`/dishes/${currentId}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showToast('Updated');
      } else {
        await API.post('/dishes', fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showToast('Created');
      }
      setOpenDlg(false);
      fetchMenu();
    } catch {
      showToast('Save failed', 'error');
    }
  };

  const toggleAvailability = async (dish) => {
    try {
      await API.put(`/dishes/${dish.id}`, {
        availability: !dish.availability
      });
      fetchMenu();
    } catch {
      showToast('Status change failed', 'error');
    }
  };

  
  const filtered = dishes.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));
  const slice = filtered.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

 
  return (
    <Box p={3}>
      
      <Box mb={3} display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
        <Typography variant="h5" fontWeight={600}>Menu<span style={{ fontWeight:300 }}> Management</span></Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField size="small" label="Search items" onChange={(e)=>setSearch(e.target.value)} />
          <Button variant="contained" sx={{ backgroundColor:'#facc15', color:'#000', textTransform:'none', '&:hover':{backgroundColor:'#eab308'} }} onClick={openAddDialog}>
            + Add New Item
          </Button>
        </Box>
      </Box>

     
      {loading ? (
        <Box display="flex" height={300} alignItems="center" justifyContent="center"><CircularProgress/></Box>
      ) : (
        <Paper>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {['Img','Name','Category','Price','Availability','Actions'].map(h=>(<TableCell key={h}><b>{h}</b></TableCell>))}
                </TableRow>
              </TableHead>
              <TableBody>
                {slice.map((d) => (
                  <TableRow key={d.id} hover>
                    <TableCell>
                      {d.image ? (
                        <Avatar src={d.image} sx={{ width:40, height:40 }} />
                      ) : (
                        <Avatar sx={{ width:40, height:40 }}>{d.name.charAt(0)}</Avatar>
                      )}
                    </TableCell>
                    <TableCell><b>{d.name}</b></TableCell>
                    <TableCell>{d.category}</TableCell>
                    <TableCell>₹{d.price}</TableCell>
                    <TableCell>
                      <Chip label={d.availability ? 'Available':'Unavailable'} color={d.availability?'success':'error'} size="small" sx={{ mr:1 }} />
                      <Switch size="small" checked={d.availability} onChange={()=>toggleAvailability(d)} />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={0.5}>
                        <Tooltip title="View"><IconButton size="small" color="info" onClick={()=>handleView(d.id)}><VisibilityIcon fontSize="small"/></IconButton></Tooltip>
                        <Tooltip title="Edit"><IconButton size="small" color="primary" onClick={()=>openEditDialog(d)}><EditIcon fontSize="small"/></IconButton></Tooltip>
                        <Tooltip title="Delete"><IconButton size="small" color="error" onClick={()=>handleDelete(d.id)}><DeleteIcon fontSize="small"/></IconButton></Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {slice.length===0 && (
                  <TableRow><TableCell colSpan={6} align="center">No menu items found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination component="div" count={filtered.length} page={page} onPageChange={(_,p)=>setPage(p)} rowsPerPage={PER_PAGE} rowsPerPageOptions={[]} />
        </Paper>
      )}

   
      <Modal open={openView} onClose={()=>setOpenView(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2} fontWeight={600}>Dish Details</Typography>
          {details ? (
            <Table size="small"><TableBody>{Object.entries({
              Name: details.name,
              Category: details.category,
              Price: `₹${details.price}`,
              Availability: details.availability? 'Available':'Unavailable'
            }).map(([k,v])=> (
              <TableRow key={k}><TableCell sx={{fontWeight:600}}>{k}</TableCell><TableCell>{v}</TableCell></TableRow>
            ))}</TableBody></Table>
          ) : <CircularProgress/>}
          <Box textAlign="right" mt={2}><Button variant="contained" onClick={()=>setOpenView(false)}>Close</Button></Box>
        </Box>
      </Modal>

      {/* ADD / EDIT DIALOG */}
      <Dialog open={openDlg} onClose={()=>setOpenDlg(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{isEdit ? 'Edit Dish' : 'Add Dish'}</DialogTitle>
        <DialogContent sx={{ mt:1, display:'flex', flexDirection:'column', gap:2 }}>
          <TextField label="Name" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} />
          <TextField label="Category" value={formData.category} onChange={(e)=>setFormData({...formData, category:e.target.value})} />
          <TextField label="Price" value={formData.price} onChange={(e)=>setFormData({...formData, price:e.target.value})} />
          <Box><Switch checked={formData.availability} onChange={(e)=>setFormData({...formData, availability:e.target.checked})}/> Availability</Box>
          <Button component="label">Upload Image
            <input hidden accept="image/*" type="file" onChange={(e)=>setFormData({...formData, image:e.target.files?.[0]})} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpenDlg(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>{isEdit ? 'Update':'Save'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

const modalStyle = {
  position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
  bgcolor:'background.paper', boxShadow:24, p:3, borderRadius:2, width:420,
  maxHeight:'85vh', overflowY:'auto'
};
