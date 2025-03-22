import React, { useEffect, useState } from 'react';
import Category from './Category';
import axios from 'axios';
import lap from '../Images/laptop.png'

const baseURL = 'http://localhost:8080/api/laptop';

export default function ProductItem() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(baseURL);
        const data = response.data.map((product) => ({
          pid: product.pid,
          pname: product.pname,
          pcost: product.pcost,
          pqty: product.pqty,
          pimage: product.pimage
        }));
        setProduct(data);
      } 
      catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products.');
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <>
      <Category />
      <div className="container mt-5">
        <div className="row">
          {product.length > 0 ? (
            product.map((product) => (
              <div key={product.pid} className="col-md-4 mb-4">
                <div className="card" style={{ width: "18rem" }}>
                  <img src={lap} className="card-img-top p-4" alt={product.pname}/>
                  <div className="card-body">
                    <h5 className="card-title">{product.pname}</h5>
                    <p className="card-title">{`Price: $${product.pcost}`}</p>
                    <p className="card-text">{product.description || 'No description available.'}</p>
                    <a href={`/laptop/${product.pid}`} className="btn btn-primary">View Details</a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>Loading........</h1>
          )}
        </div>
      </div>
    </>
  );
}
