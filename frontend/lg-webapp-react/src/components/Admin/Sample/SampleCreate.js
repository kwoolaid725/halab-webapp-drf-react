import React, {
  useState,
  useEffect,
} from 'react'
import axiosInstance from '../../../axios'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import classes from './SampleCreate.module.css'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

import AddLinkTwoToneIcon from '@mui/icons-material/AddLinkTwoTone';


export default function SampleCreate () {

  const navigate = useNavigate()
  const initialFormData = Object.freeze({
    product: '',
    inv_no: '',
    product_stage: '',
    remarks: '',
    serial_no: '',
    owner: 1,
  })

  const [sampleData, updateFormData] = useState(initialFormData)
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])

  //useEffect to get all categories
  useEffect(() => {
    // Make API call here after category selection
    axios.get(`http://localhost:8000/api/categories/`).then(response => {
      setCategories(response.data)

      // console.log(categories);
    }).catch(error => {
      console.error('There was an error!', error)
    })
  }, [])

  //useEffect to get all brands
  useEffect(() => {
    // Make API call here after category selection
    axios.get(`http://localhost:8000/api/brands/`).then(response => {
      setBrands(response.data)

    }).catch(error => {
      console.error('There was an error!', error)
    })
  }, [])

  const handleSelectionChange = (event, type) => {
    let selectedValue = event.target.value
    let category = selectedCategory
    let brand = selectedBrand

    if (type === 'category') {
      setSelectedCategory(selectedValue)
      category = selectedValue
    } else if (type === 'brand') {
      setSelectedBrand(selectedValue)
      brand = selectedValue
    }

    // Make API call here after selection
    axios.get(
        `http://localhost:8000/api/products/?category=${category}&brand=${brand}`).
      then(response => {
        setProducts(response.data)
      }).
      catch(error => {
        console.error('There was an error!', error)
      })
  }

  const handleChange = (e) => {

    {
      updateFormData({
        ...sampleData,
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim(),
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('inv_no', sampleData.inv_no)
    formData.append('product', sampleData.product)
    formData.append('product_stage', sampleData.product_stage)
    formData.append('serial_no', sampleData.serial_no)
    formData.append('remarks', sampleData.remarks)
    formData.append('owner', 1)

    axiosInstance.post(`admin/samples/create/`, formData)
    navigate('/admin/samples')
    window.location.reload()
  }

  const PRODUCT_STAGE_CATEGORY = [
    {
      value: 'MP',
      label: 'MP',
    },
    {
      value: 'DV',
      label: 'DV',
    },
    // Add more categories as needed
  ]

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>

         <div className={classes.iconContainer}>
          <AddLinkTwoToneIcon className={classes.icon} />
        </div>

        <Typography component="h1" variant="h5">
          Add New Sample
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel id="category-label">Category</InputLabel>
                <Select value={sampleData.category}
                        onChange={(event) => handleSelectionChange(event,
                          'category')}>
                  {categories.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel id="brand-label">Brand</InputLabel>
                <Select value={sampleData.brand}
                        onChange={(event) => handleSelectionChange(event,
                          'brand')}>
                  {brands.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel id="product-label">Product</InputLabel>
                <Select
                  labelId="product-label"
                  id="product"
                  name="product"
                  value={sampleData.product}
                  onChange={handleChange}
                  label="Product"
                >
                  {products.map((option) => (
                    <MenuItem key={option.id} value={option.model_name}>
                      {option.model_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel id="product-stage-label">Product Stage</InputLabel>
                <Select
                  variant="outlined"
                  required
                  fullWidth
                  id="product_stage"
                  label="Product Stage"
                  name="product_stage"
                  autoComplete="product_stage"
                  value={sampleData.product_stage}
                  onChange={handleChange}
                >
                  {PRODUCT_STAGE_CATEGORY.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="inv_no"
                label="Inventory Number"
                name="inv_no"
                autoComplete="inv_no"
                onChange={handleChange}
              >
              </TextField>
            </Grid>


            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="serial_no"
                label="Serial Number"
                name="serial_no"
                autoComplete="serial_no"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="remarks"
                label="Remarks"
                name="remarks"
                autoComplete="remarks"
                onChange={handleChange}
                multiline
                rows={3}

              />
            </Grid>


          </Grid>
          <div style={{ marginBottom: '20px' }}></div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Create Sample
          </Button>

        </form>
      </div>
    </Container>
  )
}