
import GenerateImage from "@/features/generate/generate-image/GenerateImagePresenter";
import { Route, Routes } from "react-router-dom";

const GeneratePage = () => {
  return (
    <div className="bg-generate-page flex overflow-hidden">
      {/* Content */}
      <div className="h-screen flex-1">
        <Routes>
          <Route path="/" element={<GenerateImage />} />
        </Routes>
      </div>
    </div>
  );
};

export default GeneratePage;
