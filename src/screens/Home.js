import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'

function Home() {
  const [foodItems, setFoodItems] = useState([])
  const [foodCategory, setFoodCategory] = useState([])
  const [searchTerm,setSearchTerm]=useState("");
  const[cartView,setCartView]= useState(false);

  const handleSearch=(val)=>{
        setSearchTerm(val);
  }
  const loadData=async()=>{
    const response = await fetch('http://localhost:8080/api/display-data',{
      method:"POST",
      headers:{
         "Content-Type":"application/json"
      }})
      const data = await response.json();
      console.log(data)
      console.log(data.data.foodData)
      console.log(data.data.foodCategoryData)
      setFoodItems([...data.data.foodData])
      setFoodCategory([...data.data.foodCategoryData])
  }

  useEffect(()=>{
    loadData();
  },[])
  return (<div>
    <div><Navbar/></div>
    <div><Carousel handleSearch={handleSearch}/></div>
    <div>
       {
        foodCategory? foodCategory.map((category)=><div className='row mb-3'>
         <div className='fs-2 font-weight-bold' key={category._id}>{category.CategoryName}</div>
          {foodItems? foodItems.filter((item)=>{
            return item.CategoryName===category.CategoryName&&
              item.name.toLowerCase().includes(searchTerm.toLowerCase());
           }).map((filteredItem)=>{
            return<div className='col-12 col-md-6 col-lg-3' key={filteredItem._id}><Card data={filteredItem}/></div> 
           }): <div>No Data is present</div>}
        </div>):<div>No Data is present</div>
       }
     </div>
    <div><Footer/></div>
    </div>

  )
}

export default Home