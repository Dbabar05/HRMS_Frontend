import axios from 'axios';
import { API_BASE_URL,  API_URLs } from './Constants';
 


// Function to get products by category using Axios

export const getProductsByCategory = async (category)=>{
    // console.log("Category:", category);
    // console.log("API_BASE_URL:", API_BASE_URL);
    // console.log("API_URL.GET_PRODUCT:", API_URLs.GET_PRODUCTS);
  
    let url = API_BASE_URL + API_URLs.GET_PRODUCTS + `?name=${category}`;
  
    // console.log("Constructed URL:", url); // This should print the full URL

    
    try {
 
        const response = await axios .get(url);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }

}


export const getProductsById = async(id, token) =>{


    let url = API_BASE_URL + API_URLs.GET_PRODUCT_BYID + `/${id}`
    // console.log(token);


    try {

        const response = await axios .get(url,
            {headers:{
                Authorization:`Bearer ${token}`,
            }}
        );
        return response.data;
        
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }

}


export const getAllCategory = async() =>{
 
    
    let url = API_BASE_URL + API_URLs.GET_CATEGORIES

    try {
        const response = await axios .get(url);
        return response.data;
        
    } catch (error) {
        console.error('Error:', error);
        throw error;
        
    }


}


export const loginUser = async (body) => {
    const url = `${API_BASE_URL}${API_URLs.LOGIN}`;
   
    try {
     
        const response = await axios.post(url, body)
        return response.data;

    } catch (error) {
      console.error('Error:', error.response || error.message);
      throw error;
    }
  };

  export const registerUser = async (body) =>{

    const url = `${API_BASE_URL}${API_URLs.REGISTER}`

    console.log(url);
    try {
        const response = await axios.post(url, body)
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
  }

  export const verifyCode = async (body) =>{

    const url = `${API_BASE_URL}${API_URLs.VERIFY}`;
    console.log(body)
    console.log(url);
    try {

        const response = await axios.post(url, body)
        return response.data;
        
    } catch (error) {
        console.error('Error:', error.response || error.message);
        throw error;
    }
  }




