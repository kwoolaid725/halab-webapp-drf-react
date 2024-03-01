import React, {
  useState,
  useEffect,
} from 'react'
import axiosInstance from '../../../axios'
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import classes from './ProductCreate.module.css'
import axios from 'axios'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

import { DateField } from '@mui/x-date-pickers'

import AddHomeTwoToneIcon from '@mui/icons-material/AddHomeTwoTone';


export default function ProductCreate () {
  function slugify (string) {
    const a =
      'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b =
      'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string.toString().
      toLowerCase().
      replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

  const navigate = useNavigate()
  const initialFormData = Object.freeze({
    category: '',
    brand_id: '',
    model_name: '',
    slug: '',
    color: '',
    release_date: '',
    owner: 1,
  })

  const [productData, updateFormData] = useState(initialFormData)
  const [productImage, setProductImage] = useState(null)
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])

  //useEffect to get all categories
  useEffect(() => {
    // Make API call here after category selection
    axios.get(`http://localhost:8000/api/categories/`).then(response => {
      setCategories(response.data)

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

  const handleChange = (e) => {
    if ([e.target.name] == 'image') {
      setProductImage({
        image: e.target.files,
      })
      console.log(e.target.files)
    }
    if ([e.target.name] == 'model_name') {
      updateFormData({
        ...productData,
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim(),
        ['slug']: slugify(e.target.value.trim()),
      })
    } else {
      updateFormData({
        ...productData,
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim(),
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('category', productData.category)
    formData.append('brand', productData.brand)
    formData.append('model_name', productData.model_name)
    formData.append('slug', productData.slug)
    formData.append('owner', 1)
    formData.append('color', productData.color)
    formData.append('release_date', productData.release_date)
    formData.append('image', productImage.image[0])
    axiosInstance.post(`admin/products/create/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    navigate('/admin/products')
    window.location.reload()
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>

        <div className={classes.iconContainer}>
          <AddHomeTwoToneIcon className={classes.icon} />
        </div>

        <Typography component="h1" variant="h5">
          Add New Product
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel id="brand-label">Category</InputLabel>
                <Select
                  variant="outlined"
                  required
                  fullWidth
                  id="category"
                  label="Category"
                  name="category"
                  autoComplete="category"
                  value={productData.category}
                  onChange={handleChange}
                >
                  {categories.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel id="brand-label">Brand</InputLabel>
                <Select
                  variant="outlined"
                  required
                  fullWidth
                  id="brand"
                  label="Brand"
                  name="brand"
                  autoComplete="brand"
                  value={productData.brand}
                  onChange={handleChange}
                >
                  {brands.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                      {option.name}
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
                id="model_name"
                label="Model Name"
                name="model_name"
                autoComplete="model_name"
                onChange={handleChange}
                multiline
                // rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="slug"
                label="slug"
                name="slug"
                autoComplete="slug"
                value={productData.slug}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="color"
                label="color"
                name="color"
                autoComplete="color"
                onChange={handleChange}
                multiline

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="release_date"
                label="Release Date"
                name="release_date"
                autoComplete="release_date"
                onChange={handleChange}
                multiline
                helperText="Please enter the date in YYYY-MM-DD format."
              />
            </Grid>
            {/*<Grid>*/}
            {/*  <input*/}
            {/*    accept="image/*"*/}
            {/*    className={classes.input}*/}
            {/*    id="product-image"*/}
            {/*    onChange={handleChange}*/}
            {/*    name="image"*/}
            {/*    type="file"*/}
            {/*  />*/}
            {/*</Grid>*/}

            <Grid item>
              <input
                accept="image/*"
                className={classes.input}
                id="product-image"
                onChange={handleChange}
                name="image"
                type="file"
                style={{ display: 'none' }} // Hide the input element
              />
              <label htmlFor="product-image">
                <Button
                  variant="contained"
                  component="span"
                  color="primary"
                  className={classes.button}
                  style={{
                    backgroundColor: '#CCCCCC',
                    color: 'black',}} // Set gray background color
                >
                  Upload Image
                </Button>
              </label>
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
            Create Product
          </Button>
        </form>
      </div>
    </Container>
  )
}