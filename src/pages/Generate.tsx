
import ChooseProduct from "@/features/generate/choose-product/chooseProductPresenter";
import GenerateImage from "@/features/generate/generate-image/GenerateImagePresenter";
import Sidebar from "@/ui/Sidebar";
import { Route, Routes } from "react-router-dom";

const GeneratePage = () => {
  return (
    <div className="bg-generate-page flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar></Sidebar>
      {/* Content */}
      <div className="h-screen flex-1">
        <Routes>
          <Route path="model" element={<ChooseProduct />} />
          <Route path="model/:selectedProductName" element={<GenerateImage />} />
        </Routes>
      </div>
    </div>
  );
};

export default GeneratePage;
