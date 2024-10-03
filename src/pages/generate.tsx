import ChooseProduct from "@/features/generate/choose-product/chooseProductPresenter";
import { Route, Routes } from "react-router-dom";

const GeneratePage = () => {
  return (
    <div className="bg-generate-page flex overflow-hidden">
      {/* Content */}
      <div className="h-screen flex-1">
        <Routes>
          <Route path="model" element={<ChooseProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default GeneratePage;
