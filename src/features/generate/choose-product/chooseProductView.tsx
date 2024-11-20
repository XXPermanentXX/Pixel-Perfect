import { Card, Image } from "@nextui-org/react";
import React from "react";
import { Product } from "./chooseProductPresenter";


interface ChooseProductViewProps {
  products: Product[];
  selectProduct: (product: Product) => void;
}

const ChooseProductView: React.FC<ChooseProductViewProps> = ({ products, selectProduct }) => {
  return (
    <div className="ml-20">
      <h2 className="mb-8 mt-24 text-6xl text-white">Choose a pre-trained product</h2>
      <div className="mr-20 flex flex-wrap gap-[15px]">
        {products.map((product, index) => (
          <Card key={index} isPressable onPress={() => selectProduct(product)} isHoverable className="h-[200px] w-[200px] justify-center bg-transparent shadow-none">
            <Image isZoomed src={product.thumbnail} alt={product.name} className="h-full w-full object-cover" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChooseProductView;
