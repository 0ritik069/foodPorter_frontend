// ... All imports stay the same

const AXIOS = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });
const PER_PAGE = 10;

const emptyForm = {
  firstName: '',
  email: '',
  password: '',
  phone: '',
  countryCode: '',
  address: ''
};

export default function ManageCustomer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [openDlg, setOpenDlg] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [openView, setOpenView] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(null);

  const fetchCustomers = async (signal) => {
    try {
      setLoading(true);
      const { data } = await AXIOS.get('/customers', { signal });
      setCustomers(data.data || []);
    } catch (err) {
      if (axios.isCancel(err)) return;
      Swal.fire('Error', 'Failed to fetch customers', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchCustomers(controller.signal);
    return () => controller.abort();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!isEdit && !formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleView = async (id) => {
    try {
      const { data } = await AXIOS.get(`/customers/${id}`);
      setCustomerDetails(data.data);
      setOpenView(true);
    } catch (err) {
      Swal.fire('Error', 'Unable to fetch details', 'error');
    }
  };

  const openAddDialog = () => {
    setIsEdit(false);
    setCurrentId(null);
    setFormData(emptyForm);
    setErrors({});
    setOpenDlg(true);
  };

  const openEditDialog = (cust) => {
    setIsEdit(true);
    setCurrentId(cust.id);
    setFormData({ ...emptyForm, ...cust, password: '' });
    setErrors({});
    setOpenDlg(true);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete?',
      text: 'Customer will be removed!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete'
    });
    if (!confirm.isConfirmed) return;

    try {
      await AXIOS.delete(`/customers/${id}`);
      Swal.fire('Deleted', 'Customer deleted', 'success');
      fetchCustomers();
    } catch (err) {
      Swal.fire('Error', 'Delete failed', 'error');
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      if (isEdit) {
        await AXIOS.put(`/customers/${currentId}`, formData);
        Swal.fire('Saved', 'Customer updated', 'success');
      } else {
        await AXIOS.post('/customers', formData);
        Swal.fire('Created', 'Customer added', 'success');
      }
      setOpenDlg(false);
      fetchCustomers();
    } catch (err) {
      Swal.fire('Error', 'Save failed', 'error');
    }
  };

  const handleFieldChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const filtered = customers.filter((c) =>
    c.firstName?.toLowerCase().includes(search.toLowerCase())
  );
  const slice = filtered.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <Box p={3}>
      {/* Header */}
      <Box mb={3} display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
        <Typography variant="h5" fontWeight={600}>Manage Customers</Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField size="small" label="Search name" value={search} onChange={(e) => setSearch(e.target.value)} />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#facc15",
              color: "#000",
              textTransform: "none",
              "&:hover": { backgroundColor: "#eab308" },
            }}
            onClick={openAddDialog}
          >
            + Add Customer
          </Button>
        </Box>
      </Box>

      {/* Table */}
      {loading ? (
        <Box display="flex" height={300} alignItems="center" justifyContent="center"><CircularProgress /></Box>
      ) : (
        <Paper elevation={3}>
          <TableContainer sx={{ maxHeight: 740 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Sr</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slice.map((c, idx) => (
                  <TableRow key={c.id} hover>
                    <TableCell>{idx + 1 + page * PER_PAGE}</TableCell>
                    <TableCell>{c.firstName}</TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>{`${c.countryCode || ''} ${c.phone}`}</TableCell>
                    <TableCell>{c.address}</TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <IconButton size="small" sx={{ color: '#2563eb' }} onClick={() => handleView(c.id)}><VisibilityIcon fontSize="small" /></IconButton>
                        <IconButton size="small" sx={{ color: '#f59e0b' }} onClick={() => openEditDialog(c)}><EditIcon fontSize="small" /></IconButton>
                        <IconButton size="small" sx={{ color: 'red' }} onClick={() => handleDelete(c.id)}><DeleteIcon fontSize="small" /></IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination component="div" count={filtered.length} page={page} onPageChange={(_, p) => setPage(p)} rowsPerPage={PER_PAGE} rowsPerPageOptions={[]} />
        </Paper>
      )}

      {/* View Modal */}
      <Modal open={openView} onClose={() => setOpenView(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2} fontWeight={600}>Customer Details</Typography>
          {customerDetails ? (
            <Table size="small">
              <TableBody>
                {Object.entries({
                  Name: customerDetails.firstName,
                  Email: customerDetails.email,
                  Phone: `${customerDetails.countryCode || ''} ${customerDetails.phone}`,
                  Address: customerDetails.address || '-',
                }).map(([k, v]) => (
                  <TableRow key={k}>
                    <TableCell sx={{ fontWeight: 600 }}>{k}</TableCell>
                    <TableCell>{v}</TableCell>
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

      {/* Add/Edit Dialog */}
      <Dialog open={openDlg} onClose={() => setOpenDlg(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{isEdit ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
        <DialogContent sx={{ pt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Full Name"
            value={formData.firstName}
            onChange={(e) => handleFieldChange('firstName', e.target.value)}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            label="Email"
            value={formData.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          {!isEdit && (
            <TextField
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => handleFieldChange('password', e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
          )}
          <Box display="flex" gap={1}>
            <TextField
              label="Country Code"
              sx={{ width: '35%' }}
              value={formData.countryCode}
              onChange={(e) => handleFieldChange('countryCode', e.target.value)}
            />
            <TextField
              label="Phone"
              sx={{ flex: 1 }}
              value={formData.phone}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Box>
          <TextField
            label="Address"
            multiline
            rows={2}
            value={formData.address}
            onChange={(e) => handleFieldChange('address', e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDlg(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>{isEdit ? 'Update' : 'Save'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
  width: 420,
  maxHeight: '85vh',
  overflowY: 'auto'
};
