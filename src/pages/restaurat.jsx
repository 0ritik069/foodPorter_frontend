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
import VisibilityIcon  from '@mui/icons-material/Visibility';
import EditIcon  from '@mui/icons-material/Edit';
import  Delete  from '@mui/icons-material/Delete';

const API = axios.create({ baseURL: `htt:/192.168.1.80:5000/api`});
API.interceptors.request.use((config)=>{
  const token = localStorage.getItem('token');
  if(token) config.headers.Authorization=
});

const PER_PAGE=8;
const emptyForm={
  name:"",
  category:"",
  price:"",
  availabilty:true,
};

export default function RestaurantMenu((restaurantId)){


    const[loading,setLoading]= useState(false);
    const[page,setPage]=useState(0);
    const[openView,setOpenView]=useState(false);
    const[details,setDetails] = useState(null);
    const[openDlg,setOpenDlg]=useState(false);

    const [dishes,setDishes] = useState([]);
    const [search,setSearch] = useState('');
    const [formData,setFormData]= useState(emptyForm);

    const [currentId,setCurrentId] = useState(null);
    const[isEdit,setIsEdit] = useState(false);

    const showToast = (title,icon= 'success')=>{
      Swal.fire({ title,toast:true,timer:2000,position:'top',icon});

      const fetchMenu = async (signal)=>{
        setLoading(false);
        try{
          const url= restaurantId
          ? `/dishes/restaurant/${restaurantId}`
          :'/dishes';
          const {data} = await API.get(url, { signal });
          console.log(data.data);
          setDishes(data.data || data);

        }
        catch(err){
          if(!axios.isCancel(err))
            showToast('Failed to load dishes','error');
        }finally{
          setLoading(false);
        }
      };

      useEffect(()=>{
        const c= new AbortController();
        fetchMenu(c.signal);
        return () =>c.abort();
      },[restaurantId]);

      const handleView = async (id) =>{
        try{
          const { data } = await API.get(`/dishes/${id}`);
          const dish = data.data || data;
          setDetails({
            name:dish.name,
            category:dish.category_name || dish.category,
            price:dish.price,
            availability:dish.is_available ===1
          });
          setOpenView(true);
        }
        catch{
          showToast('Unable to fetch item','error');
        }
      };

      const openAddDialog = () =>{
        setIsEdit(false);
        setCurrentId(null);
        setFormData(emptyForm);
        setOpenDlg(true);
      };

      const openEditDialog = (dish) =>{
        setIsEdit(true);
        setCurrentId(dish.id);
        setFormData({ ...emptyForm, ...dish, image: null});
      }

      const handleDelete = async (id) =>{
        const c = await Swal.fire({
          title:'Delete dish?',
          text:'This action is irreversible!',
          icon: 'warning',
          showCancelButton:true,
          confirmButtonColor: '#d33'
        });
        if(!c.isConfirmed) return;
        try{
          await API.delete(`/dishes/${id}`);
          showToast('Deleted');
          fetchMenu();
        }
        catch{
          showToast('Deleted Failed','error');
        }
      };

      const handleSave = async()=>{
        const {name ,category,price}=formData;
        if(!name || !category || !price)
          return showToast("All fields required", "warning");

        const fd = new FormData();
        Object.entries(formData).forEach(([k,v])=>{
          if(k=== 'image' && !v) return;
          fd.append(k, v);
        });

      }




    }

}
