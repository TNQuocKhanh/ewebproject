import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getListProducts } from "../../apis";

const TopProducts = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Máy tính HP Up",
      specifications: null,
      description: null,
      createdTime: "2023-03-03T13:36:26.357+00:00",
      updatedTime: "2023-03-25T13:25:21.720+00:00",
      enabled: true,
      inStock: false,
      cost: 80,
      price: 100000,
      discountPercent: 5,
      mainImage:
        "https://upload.wikimedia.org/wikipedia/commons/0/0c/CoinEx_logo_-_horizontal_version_%28default_color%29_%284%29.png",
      category: {
        id: 1,
        name: "Laptop",
        enabled: true,
      },
      supplier: null,
      productImages: [
        {
          id: 1,
          extraImage:
            "https://res.cloudinary.com/disyupqea/image/upload/v1679580508/products/1/extra/14pm-xanh.jpg",
          publicId: "products/1/extra/14pm-xanh",
        },
      ],
      publicId: "products/1/14pm-xanh",
      reviewCount: 0,
      averageRating: 0,
      customerCanReview: false,
      reviewedByCustomer: false,
      discountPrice: 95000,
    },
    {
      id: 2,
      name: "Máy tính HP Up",
      specifications: null,
      description: null,
      createdTime: "2023-03-03T13:36:26.357+00:00",
      updatedTime: "2023-03-25T13:25:21.720+00:00",
      enabled: true,
      inStock: false,
      cost: 80,
      price: 100000,
      discountPercent: 5,
      mainImage:
        "https://megahomevietnam.com/public/assets/resources/image/Default.png",
      category: {
        id: 1,
        name: "Laptop",
        enabled: true,
      },
      supplier: null,
      productImages: [
        {
          id: 1,
          extraImage:
            "https://res.cloudinary.com/disyupqea/image/upload/v1679580508/products/1/extra/14pm-xanh.jpg",
          publicId: "products/1/extra/14pm-xanh",
        },
      ],
      publicId: "products/1/14pm-xanh",
      reviewCount: 0,
      averageRating: 0,
      customerCanReview: false,
      reviewedByCustomer: false,
      discountPrice: 95000,
    },
  ]);

  const getAllProducts = async () => {
    const res = await getListProducts();
    if (res) {
      setData(res);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div className="wrapper products_wrapper">
        {data.slice(0.1).map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};

export default TopProducts;
