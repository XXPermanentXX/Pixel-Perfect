import ChooseProductView from "./chooseProductView";

const mockProducts = [
  {
    name: "Product 1",
    thumbnail: "https://via.placeholder.com/200",
  },
  {
    name: "Product 2",
    thumbnail: "https://via.placeholder.com/200",
  },
  {
    name: "Product 3",
    thumbnail: "https://via.placeholder.com/200",
  },
];

const handleSelectProduct = (product: { name: string; thumbnail: string }) => {
  console.log("Selected product:", product);
};

const ChooseProduct = () => {
  return <ChooseProductView products={mockProducts} selectProduct={handleSelectProduct} />;
}

export default ChooseProduct;
