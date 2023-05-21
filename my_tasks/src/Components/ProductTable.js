import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormLabel from "react-bootstrap/esm/FormLabel";
import FormControl from "react-bootstrap/esm/FormControl";
import classes from "./Product.module.css";
import FormGroup from "react-bootstrap/esm/FormGroup";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";


const initial = {
  product_name: "",
  product_price: "",
  product_description: "",
  product_category: "",
};

function ProductPage() {
  const [state, setstate] = useState(initial);
  const { product_name, product_price, product_description, product_category } = state;
  const [category,setCategory] = useState("");
  const { id } = useParams();
  const [data, setdata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3005/api/get/${id}`).then((res) => {
      setstate({ ...res.data[0] });
    });
  }, [id]);
  const loadData = async () => {
    const response = await axios.get("http://localhost:3005/api/get");
    setdata(response.data);
  };
    useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery]);
  const formSubitHandler = (e) => {
    e.preventDefault();
    if (
      !product_name ||
      !product_price ||
      !product_description ||
      !product_category
    ) {
      alert("Plesase fill");
    } else if(!id) {
      axios
        .post("http://localhost:3005/api/post", {
          product_name,
          product_price,
          product_description,
          product_category,
        })
        .then(() => {
          setstate({
            product_name: "",
            product_price: "",
            product_description: "",
            product_category: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .put(`http://localhost:3005/api/update/${id}`, {
          id,
          product_name,
          product_price,
          product_description,
          product_category,
        })
        .then(() => {
          setstate({
            product_name: "",
            product_price: "",
            product_description: "",
            product_category: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setstate({ ...state, [name]: value });
  };
  const editHandler = (product) => {
    setstate(product);
  };
  const deleteHandler = (id) => {
    axios.delete(`http://localhost:3005/api/remove/${id}`);
    setTimeout(() => loadData(), 500);
  };

  useEffect(() => {
    loadData();
  }, [formSubitHandler]);
  return (
    <div>
      {/* <h1>You are on front page</h1> */}
      <Form className={classes.main} onSubmit={formSubitHandler}>
      <FormLabel className={classes.label}>Search</FormLabel>
        <FormControl
            type="text"
            placeholder="Search"
            className={classes.input}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        <FormGroup className={classes.FormGroup}>
          <FormLabel className={classes.label}>Product Name</FormLabel>
          <FormControl
            className={classes.input}
            placeholder="Enter Name"
            type="text"
            name="product_name"
            id="product_name"
            value={product_name || ""}
            onChange={handleInputChange}
          ></FormControl>
        </FormGroup>
        <FormGroup className={classes.FormGroup}>
          <FormLabel className={classes.label}>Product Price</FormLabel>
          <FormControl
            className={classes.input}
            type="text"
            name="product_price"
            id="product_price"
            value={product_price || ""}
            onChange={handleInputChange}
          ></FormControl>
        </FormGroup>
        <FormGroup className={classes.FormGroup}>
          <FormLabel className={classes.label}>Product Description</FormLabel>
          <FormControl
            className={classes.input}
            type="text"
            name="product_description"
            id="product_description"
            value={product_description || ""}
            onChange={handleInputChange}
          ></FormControl>
        </FormGroup>
        <FormGroup className={classes.FormGroup}>
          <FormLabel className={classes.label}>Product Category</FormLabel>
          <FormControl
            className={classes.input}
            type="text"
            name="product_category"
            id="product_category"
            value={product_category || ""}
            onChange={handleInputChange}
          ></FormControl>
        </FormGroup>
        <Button
          className={classes.button}
          value={id ? "update" : "Save"}
          type="submit"
          // onChange={handleInputChange}
          // onClick={formSubitHandler}
        >
          {id ? "Update" : "Add Product"}
        </Button>
  
      </Form>
      <div>
        <table className={classes["styled-table"]}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Product_name</th>
              <th>Price</th>
              <th>Description</th>
              <th>category</th>
              <th>Delete</th>
              <th>Edit</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.product_name}</td>
                  <td>{item.product_price}</td>
                  <td>{item.product_description}</td>
                  <td>{item.product_category}</td>
                  <td>
                    <Button
                      className={classes.btn}
                      onClick={() => deleteHandler(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                  <td>
                    <Button
                      className={classes.btn}
                      onClick={() =>
                        setstate({
                          ...item,
                          product_name: item.product_name,
                          product_price: item.product_price,
                          product_description: item.product_description,
                          product_category: item.product_category,
                        })
                      }
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Link to={`/view/${item.id}`}>
                      <Button className={classes.btn}>View</Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductPage;

// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import FormLabel from "react-bootstrap/esm/FormLabel";
// import FormControl from "react-bootstrap/esm/FormControl";
// import classes from "./Product.module.css";
// import axios from "axios";
// import { Link, useParams } from "react-router-dom";

// const initial = {
//   product_name: "",
//   product_price: "",
//   product_description: "",
//   product_category: "",
// };

// function ProductPage() {
//   const [state, setState] = useState(initial);
//   const { product_name, product_price, product_description, product_category } = state;
//   const { id } = useParams();
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     axios.get(`http://localhost:3005/api/get/${id}`).then((res) => {
//       setState({ ...res.data[0] });
//     });
//   }, [id]);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     const response = await axios.get("http://localhost:3005/api/get");
//     setData(response.data);
//   };

//   useEffect(() => {
//     setFilteredData(
//       data.filter((item) =>
//         item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );
//   }, [data, searchQuery]);

//   const formSubmitHandler = (e) => {
//     e.preventDefault();
//     if (
//       !product_name ||
//       !product_price ||
//       !product_description ||
//       !product_category
//     ) {
//       alert("Please fill all fields");
//     } else if (!id) {
//       axios
//         .post("http://localhost:3005/api/post", {
//           product_name,
//           product_price,
//           product_description,
//           product_category,
//         })
//         .then(() => {
//           setState(initial);
//           loadData();
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       axios
//         .put(`http://localhost:3005/api/update/${id}`, {
//           id,
//           product_name,
//           product_price,
//           product_description,
//           product_category,
//         })
//         .then(() => {
//           setState(initial);
//           loadData();
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setState({ ...state, [name]: value });
//   };

//   const deleteHandler = (id) => {
//     axios
//       .delete(`http://localhost:3005/api/remove/${id}`)
//       .then(() => loadData())
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <div>
//       <Form className={classes.main} onSubmit={formSubmitHandler}>
//         <Form.Group className={classes.FormGroup}>
//           <FormLabel className={classes.label}>Product Name</FormLabel>
//           <FormControl
//             className={classes.input}
//             placeholder="Enter Name"
//             type="text"
//             name="product_name"
//             id="product_name"
//             value={product_name || ""}
//             onChange={handleInputChange}
//           />
//         </Form.Group>
//         <Form.Group className={classes.FormGroup}>
//           <FormLabel className={classes.label}>Product Price</FormLabel>
//           <FormControl
//             className={classes.input}
//             type="text"
//             name="product_price"
//             id="product_price"
//             value={product_price || ""}
//             onChange={handleInputChange}
//           />
//         </Form.Group>
//         <Form.Group className={classes.FormGroup}>
//           <FormLabel className={classes.label}>Product Description</FormLabel>
//           <FormControl
//             className={classes.input}
//             type="text"
//             name="product_description"
//             id="product_description"
//             value={product_description || ""}
//             onChange={handleInputChange}
//           />
//         </Form.Group>
//         <Form.Group className={classes.FormGroup}>
//           <FormLabel className={classes.label}>Product Category</FormLabel>
//           <FormControl
//             className={classes.input}
//             type="text"
//             name="product_category"
//             id="product_category"
//             value={product_category || ""}
//             onChange={handleInputChange}
//           />
//         </Form.Group>
//         <Button className={classes.button} type="submit">
//           {id ? "Update" : "Add Product"}
//         </Button>
//       </Form>
//       <div>
//         <Form className={classes.searchForm}>
//           <FormControl
//             className={classes.searchInput}
//             type="text"
//             placeholder="Search products..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </Form>
//         <table className={classes["styled-table"]}>
//           <thead>
//             <tr>
//               <th>S.No</th>
//               <th>Product Name</th>
//               <th>Price</th>
//               <th>Description</th>
//               <th>Category</th>
//               <th>Delete</th>
//               <th>Edit</th>
//               <th>View</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((item, index) => {
//               return (
//                 <tr key={item.id}>
//                   <th scope="row">{index + 1}</th>
//                   <td>{item.product_name}</td>
//                   <td>{item.product_price}</td>
//                   <td>{item.product_description}</td>
//                   <td>{item.product_category}</td>
//                   <td>
//                     <Button
//                       className={classes.btn}
//                       onClick={() => deleteHandler(item.id)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                   <td>
//                     <Button
//                       className={classes.btn}
//                       onClick={() =>
//                         setState({
//                           ...item,
//                           product_name: item.product_name,
//                           product_price: item.product_price,
//                           product_description: item.product_description,
//                           product_category: item.product_category,
//                         })
//                       }
//                     >
//                       Edit
//                     </Button>
//                   </td>
//                   <td>
//                     <Link to={`/view/${item.id}`}>
//                       <Button className={classes.btn}>View</Button>
//                     </Link>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ProductPage;

