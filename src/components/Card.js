import React, { useEffect, useRef, useState } from "react";
import { useDispatch,useCart } from "./ContexReducer";

function Card({ data }) {
  const { name, img, description, options,_id } = data;
  const foodSizes = Object.keys(options[0]);
  const [quantityOfItem, setQuantityOfItem] = useState(1);
  const [sizeOfItem, setSizeOfItem] = useState("");
  const priceRef=useRef();
  const dispatch=useDispatch();
  const cartData=useCart();

 

  
  const handleAddToCart= async()=>{
    let food = []
    for (const item of cartData) {
      if (item.id === _id) {
        food = item;

        break;
      }
    }
    if (food != []) {
      if (food.size === sizeOfItem) {
        await dispatch({ type: "UPDATE", id: _id, totalPrice:totalPrice, quantity:quantityOfItem})
       
      }
      else if (food.size !== sizeOfItem) {
        await dispatch({type:'ADD',id:_id,name:name,quantity:quantityOfItem,size:sizeOfItem,totalPrice:totalPrice,image:img})
      
      }
      return;
      
    }

      await dispatch({type:'ADD',id:_id,name:name,quantity:quantityOfItem,size:sizeOfItem,totalPrice:totalPrice,image:img})
       console.log(cartData)
       return;
      }
  useEffect(() => {
    setSizeOfItem(priceRef.current.value)
  },[]);

  let totalPrice=quantityOfItem*parseInt(options[0][sizeOfItem]);
  return (
    <div
      className="card container  d-flex"
      style={{ width: "18rem"  }}
    >
      <img src={img} className="w-100" alt="image" style={{ maxHeight: "200px" }} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <div className="container w-100 d-flex justify-content-between">
          <select
            className="m-2 h-100  bg-success rounded"
            onChange={(e) => setQuantityOfItem(e.target.value)}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className="m-2 h-100  bg-success rounded"
            onChange={(e) => setSizeOfItem(e.target.value)}
            ref={priceRef}
          >
            {foodSizes.map((size) => {
              return (
                <option name="size" value={size} key={size}>
                  {size}
                </option>
              );
            })}
          </select>
          <div className="d-inline ">
          ₹{totalPrice}/-
          </div>
        </div>
        {localStorage.getItem("authToken")
        &&
        <div className="btn bg-success text-white"
        onClick={handleAddToCart}
        >Add To Cart</div>
        }
      
      </div>
    </div>
  );
}

export default Card;
