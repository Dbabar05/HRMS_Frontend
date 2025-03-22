import axios from 'axios';
import React from 'react'


export default function AddProduct() {


    const handleSubmit  =(e)=> {
        e.preventDefault();

        axios.post(``, data)
    }

  return (
    <>
        <div className="container mt-5">

            <form action="" className='row' onSubmit={handleSubmit}>
                <h2>Enter the Product Details</h2>

                <div className="col-md-4 my-4">
                    <label className="form-label">
                        <h6>Product Name</h6>
                    </label>
                    <input type="text" className="form-control" placeholder="Product Name" name="pname"/>
                </div>
                <div className="col-md-4 my-4">
                    <label className="form-label">
                        <h6>Product Cost</h6>
                    </label>
                    <input type="number" className="form-control" placeholder="Product Cost" name="pcost"/>
                </div>
                <div className="col-md-4 my-4">
                    <label className="form-label">
                        <h6>Product Quantity</h6>
                    </label>
                    <input type="number" className="form-control" placeholder="Product Quantity" name="pqty"/>
                </div>
                <div className="col-md-4 my-4">
                    <label className="form-label">
                        <h6>Product Category</h6>
                    </label>
                    <input type="text" className="form-control" placeholder="Product Category" name="Product Category"/>
                </div>
                <div className="col-md-4 my-4">
                    <label className="form-label">
                        <h6>Product Image</h6>
                    </label>
                    <input type="file" className="form-control" placeholder="Product Image" name="pimage"/>
                </div>
               
                
                <div className="col-12">
                    <button type="submit" className={`btn btn-dark ms-2 mt-3`}   >Submit</button>
                </div>
            </form>
        </div>

    </>
  )
}
