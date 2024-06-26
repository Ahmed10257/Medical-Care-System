import { useState, useEffect } from "react";
import { Carousel, CarouselResponsiveOption } from "primereact/carousel";
import { Products } from "../../data/offersV2";

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
      numVisible: 4,
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
      <div className="border rounded-lg m-4 flex flex-col  bg-white">
        <div className="mb-4 w-full h-64">
          <img
            src={`${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-start px-3">
          <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
          <h6 className="text-xl text-gray-700 font-bold mb-3">
            ${product.price}
          </h6>
          <p>{product.quantity} Offers</p>
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <Carousel
        value={products}
        numScroll={1}
        numVisible={4}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
        className="p-4"
      />
    </div>
  );
}
