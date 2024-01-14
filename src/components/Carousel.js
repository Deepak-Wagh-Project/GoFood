import React, { useState } from 'react'

function Carousel({handleSearch}) {
  const [text,setText]=useState('');
  return (
    <div className='carousel' style={{ objectFit: "contain"}}>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
    <div className="carousel-inner" id="carousel" style={{ objectFit: "contain !important"}}>
        <div className='carousel-caption' style={{"zIndex":"10"}}>
        <div className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" 
      value={text}
       onChange={(e)=>setText(e.target.value)}aria-label="Search"/>
      <button className="btn btn-outline-success"
       onClick={()=>{handleSearch(text)}}
       >Search</button>
    </div>
        </div>
      <div className="carousel-item active">
        <img src="https://source.unsplash.com/random/300×300?pizza" className="d-block w-100"style={{ objectFit: "contain"}} alt="..."/>
      </div>
      <div className="carousel-item">
        <img src="https://source.unsplash.com/random/300×300?barbeque" className="d-block w-100" style={{ objectFit: "contain"}}alt="..."/>
      </div>
      <div className="carousel-item">
        <img src="https://source.unsplash.com/random/300×300?pastry" className="d-block w-100" style={{objectFit: "contain"}} alt="..."/>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
  </div>
  )
}

export default Carousel