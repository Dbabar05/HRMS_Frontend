import React, {useState, useEffect} from 'react'
import './listing.css'
import { Link } from 'react-router-dom'
import Sidebar from '../../Sidebar/Sidebar'
import Product from '../../Product/Product'
import { Button } from '@mui/material'
import GridView from '@mui/icons-material/GridViewOutlined';
import SortIcon from '@mui/icons-material/Sort';
import { useSearchParams } from 'react-router-dom';
import { getProductsByCategory } from '../../APIService/apiservice'; 



export default function Lisitng() {

    const [isOpenDropDown, setisOpenDropDown] = useState(false);
    const [isOpenDropDown2, setisOpenDropDown2] = useState(false);

    const [selectedIndex, setselectedIndex] = useState(1)
    const [selectedItem, setselectedItem] = useState(50)

    const closeSet = (index, qty)=>{
      setisOpenDropDown(false);
      setselectedIndex(index);
      setselectedItem(qty);
    }

    const [selectedIndex2, setselectedIndex2] = useState(1)
    const [selectedItem2, setselectedItem2] = useState("Featured")
    
    const closeSet2 = (index, name)=>{
      setisOpenDropDown2(false);
      setselectedIndex2(index);
      setselectedItem2(name);
    }

    const [searchParams] = useSearchParams();
    const category = searchParams.get('name');
    // console.log(categogry); // ▶ URLSearchParams {}

     const [products, setProducts]  = useState([]);
         const [error, setError] = useState(null);
       
         useEffect(()=>{
       
           const fetchProduct = async()=>{
       
             try {
               const data = await getProductsByCategory(category);
              //  console.log(data);
               setProducts(data);
             } catch (error) {
               setError('Failed to fetch products');
           
               const dummyData = [
                {
                  productId: 1,
                  name: "Dummy Product 1",
                  description: "This is a dummy product description 1.",
                  price: 100,
                  stock: 10,
                  brand: "Dummy Brand",
                  imageUrl: "https://via.placeholder.com/200",
                },
                {
                  productId: 2,
                  name: "Dummy Product 2",
                  description: "This is a dummy product description 2.",
                  price: 200,
                  stock: 20,
                  brand: "Dummy Brand",
                  imageUrl: "https://via.placeholder.com/200",
                },
              ]
              
              setProducts(dummyData);
           
              }
       
           }

           fetchProduct();
         }, [category])


         const [activeCategory, setActiveCategory] = useState();

         useEffect(() => {
          if (products.length > 0) {
            setActiveCategory(category);
          }
        }, [products]);
         
        



  return (
    <>
      <section className="listing-page">
          <div className="container-fluid">
              <div className="breadcrumb flex-column">
                  <h2>{activeCategory}</h2>
                  <ul className='list list-inline'>
                      <li className="list-inline-item">
                        <Link to={'/'}>Home</Link>
                      </li>
                      <li className="list-inline-item">
                        <Link to={''}>{activeCategory}</Link>
                      </li>
                      {/* <li className="list-inline-item">
                        <Link to={''}>Laptops</Link>
                      </li> */}
                  </ul>
              </div>

              <div className="listing-data">
                  <div className="row">
                    <div className="col-md-3 sidebarwrapper">
                      <Sidebar category={category} />
                    </div>

                    <div className="col-md-9 homeProduct p-0  ">
                      <div className="topStrip d-flex align-items-center me-4">
                        <h5>We found <span >{products.length}</span> items for you!</h5>
                        <div className="ms-auto d-flex align-items-center">

                            <div className="tab_">
                                <Button className='btn_' onClick={()=>{setisOpenDropDown(!isOpenDropDown)}}><GridView className='icon_ me-2'/>Show : {selectedItem}</Button>
                                {isOpenDropDown !==false &&  
                                  <ul className='dropmenu'>
                                    <li><Button onClick={()=>{closeSet(1,"50")}}>50</Button></li>
                                    <li><Button onClick={()=>{closeSet(2,"100")}}>100</Button></li>
                                    <li><Button onClick={()=>{closeSet(3,"150")}}>150</Button></li>
                                    <li><Button onClick={()=>{closeSet(4,"200")}}>200</Button></li>
                                    <li><Button onClick={()=>{closeSet(5,"All")}}>All</Button></li>
                                  </ul>
                                }
                            </div>
                            <div className="tab_ ms-3">
                                <Button className='btn_'onClick={()=>{setisOpenDropDown2(!isOpenDropDown2)}} ><SortIcon className='icon_ me-2'/>Sort By :{selectedItem2.length>7 ? selectedItem2.substr(0,7)+'...' : selectedItem2}</Button>
                                {isOpenDropDown2 !==false &&  
                                  <ul className='dropmenu'>
                                    <li><Button onClick={()=>{closeSet2(1,"Featured")}}>Featured</Button></li>
                                    <li><Button onClick={()=>{closeSet2(2,"Low to High")}}>Price : Low to High</Button></li>
                                    <li><Button onClick={()=>{closeSet2(3,"High to Low")}}>Price : High to Low </Button></li>
                                    <li><Button onClick={()=>{closeSet2(4," Rating")}}>Rating</Button></li>
                                  </ul>
                                }
                            </div>
                        </div>
                      </div>

                      <div className="productRow">
                        {products.map((product, index) => (  
                            <div key={index} className="item">
                              <Product product={product} />  
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
              </div>
          </div>
      </section>
    </>
  )
}
