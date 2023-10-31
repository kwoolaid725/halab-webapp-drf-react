import PostLoadingComponent from '../Post/PostLoading'
import Products from './Products'
import React, {
  useEffect,
  useState
} from 'react'
import axiosInstance from '../../axios'

function ProductLists() {
  const PostLoading = PostLoadingComponent(Products);
    const [appState, setAppState] = useState({
      loading: false,
      products: null,
    });

    // Fetch posts from the API
  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get('/products/');
      const allProducts = res.data;
      setAppState({ loading: false, products: allProducts });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <h1>Products</h1>
      <PostLoading isLoading={appState.loading} products={appState.products} />
    </div>
  );
}

export default ProductLists;