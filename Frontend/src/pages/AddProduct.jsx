import React, { useState } from "react";
import { addProduct } from "../services/productService";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    productCategory: "",
    price: "",
    productRating: "",
    isFreeDelivery: "",
    productImage: "",
  });

  const handleChange = (e) => {
    // const { name, value = e.target.name
    setProduct({ ...product, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Access Denied! Please login first.");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await addProduct(product, config);
      toast.success(res.data.msg);

      setProduct({
        productName: "",
        productDescription: "",
        productCategory: "",
        price: "",
        productRating: "",
        isFreeDelivery: "",
        productImage: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Cannot add the product");
    }
  };

  return (
    <section className="pb-5 bg-light img">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="p-4 shadow mt-5">
              <Card.Body>
                <h3 className="text-center text-success mb-4">
                  Add Products Here
                </h3>
              </Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder="Product name"
                  required
                  name="productName"
                  value={product.productName}
                  onChange={handleChange}
                />
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder="Product image URL"
                  required
                  name="productImage"
                  value={product.productImage}
                  onChange={handleChange}
                />
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder="Description"
                  required
                  name="productDescription"
                  value={product.productDescription}
                  onChange={handleChange}
                />
                <Form.Select
                  className="mb-2"
                  name="productCategory"
                  onChange={handleChange}
                  value={product.productCategory}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Food">Food</option>
                  <option value="Books">Books</option>
                  <option value="Furniture">Furniture</option>
                </Form.Select>
                <Form.Control
                  className="mb-2"
                  type="number"
                  placeholder="Product Price"
                  required
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                />
                <Form.Control
                  className="mb-2"
                  type="number"
                  placeholder="Product Rating (1 to 5)"
                  min={1}
                  max={5}
                  required
                  name="productRating"
                  value={product.productRating}
                  onChange={handleChange}
                />
                <div className="d-flex align-items-center mb-3">
                  <p className="mb-0 me-3">Is Free Delivery:</p>
                  <Form.Check
                    type="radio"
                    label="Yes"
                    name="isFreeDelivery"
                    value="yes"
                    checked={product.isFreeDelivery === "yes"}
                    onChange={handleChange}
                    className="me-2"
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="isFreeDelivery"
                    value="no"
                    checked={product.isFreeDelivery === "no"}
                    onChange={handleChange}
                    className="me-2"
                  />
                </div>
                <Button
                  type="submit"
                  className="btn-success"
                  style={{ width: "100%" }}
                >
                  Submit
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProduct;
