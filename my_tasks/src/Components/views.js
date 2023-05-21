import React,{useState,useEffect} from "react";
import classes from "./views.module.css";
import { Link,useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Button from "react-bootstrap/esm/Button";

function ProductView(){
  const [product,setproduct] = useState({})
  const {id} = useParams();
  useEffect(() => {
    axios.get(`http://localhost:3005/api/get/${id}`).then((res) => {
      setproduct({ ...res.data[0] });
    });
  }, [id]);
  return(
    <div className={classes.main} style={{marginTop: "150px"}}>
      <h1>Views</h1>
      <div>
        <p>Product Details</p>
      </div>
      <div className={classes.details}>
        <span>Name :- </span>
        <span>{product.product_name}</span>
      </div>
      <div>
      <span>Price :- </span>
      <span>{product.product_price}</span>
      </div>
      <div>
      <span>Description :- </span>
      <span>{product.product_description}</span>
      </div>
      <div>
      <span>Category :- </span>
      <span>{product.product_category}</span>
      </div>
      <Link to={'/'}>
      <Button>
        Go Back
      </Button>
      </Link>

    </div>
  )
}



export default ProductView;