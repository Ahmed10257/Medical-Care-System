import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Carousel, CarouselResponsiveOption } from "primereact/carousel";
import { Tag } from "primereact/tag";
import { Products } from "../../data";

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}

export default function Offers() {
  const [products, setProducts] = useState<Product[]>(Products);
  const responsiveOptions: CarouselResponsiveOption[] = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const getSeverity = (product: Product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";
      case "LOWSTOCK":
        return "warning";
      case "OUTOFSTOCK":
        return "danger";
      default:
        return null;
    }
  };

  const ProductService = {
    getProductsSmall() {
      return Promise.resolve(Products.slice(0, 9));
    },
  };

  useEffect(() => {
    ProductService.getProductsSmall().then((data) =>
      setProducts(data.slice(0, 9))
    );
  }, []);

  const productTemplate = (product: Product) => {
    return (
      <div className="border rounded-lg shadow-lg m-4 p-4 flex flex-col items-center">
        <div className="mb-4">
          <img
            src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
            alt={product.name}
            className="w-32 h-32 object-cover rounded-full shadow-md"
          />
        </div>
        <div className="text-center">
          <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
          <h6 className="text-xl text-gray-700 font-bold mb-3">
            ${product.price}
          </h6>
          <Tag
            value={product.inventoryStatus}
            severity={getSeverity(product)}
            className="mb-3"
          ></Tag>
          <div className="mt-5 flex space-x-4">
            <Button icon="pi pi-search" className="p-button p-button-rounded" />
            <Button
              icon="pi pi-star-fill"
              className="p-button-success p-button-rounded"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <Carousel
        value={products}
        numScroll={1}
        numVisible={3}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
        className="p-4"
      />
    </div>
  );
}
