import PostLoadingComponent from '../PostLoading'
import Products from './Products'
import React, {
  useEffect,
  useState
} from 'react'

function ProductLists() {
  const PostLoading = PostLoadingComponent(Products);
    const [appState, setAppState] = useState({
      loading: false,
      products: null,
    });

    useEffect(() => {
      setAppState({ loading: true });
      const apiUrl = `http://127.0.0.1:8000/api/products/`;
      fetch(apiUrl)
        .then((data) => data.json())
        .then((products) => {
          setAppState({ loading: false, products: products });
        });
    }, [setAppState]);
    return (
		<div className="App">
			<h1>Latest Products</h1>
			<PostLoading isLoading={appState.loading} products={appState.products} />
		</div>
	);
}

export default ProductLists;