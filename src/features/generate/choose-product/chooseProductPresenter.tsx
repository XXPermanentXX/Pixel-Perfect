import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import ChooseProductView from "./chooseProductView";
import { getProductData,  setPromptRequest } from "@/models/generateSlice";
import { setSidebarExpanded } from "@/models/AppSlice"
import { AppDispatch, RootState } from "@/provider";
import { updateUserData } from "@/models/user/authSlice";
import { INITIAL_PROMPT } from "@/models/staticDataModel";

export interface Product {
  name: string;
  thumbnail: string;
  lora_model_name: string;
  trigger_word: string;
}

const ChooseProduct: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const adminKey = useSelector((state: any) => state.auth.adminKey);
  const productList = useSelector((state: any) => state.generate.productsData);
  const productStatus = useSelector((state: any) => state.generate.productStatus);
  const [isReady, setIsReady] = useState(false);
  const promptRequest = useSelector((state:RootState) => state.auth.user?.promptRequest || INITIAL_PROMPT)
  const user = useSelector((state:RootState) => state.auth.user)

  useEffect(() => {
    if (productList.length > 0) {
        if (user && promptRequest) {
            setIsReady(true);
            if(promptRequest.model) {
              const product = productList.find((product: { lora_model_name: string; }) => product.lora_model_name === promptRequest.model);
              navigate(`/generate/model/${product.name}`);
            }
        }
    } else {
      dispatch(getProductData());
    }
  }, [dispatch, adminKey, productList, user?.userId]);

  const handleSelectProduct = (product: Product) => {
    dispatch(setSidebarExpanded(false));
    const _promptRequest = {
      ...promptRequest,
      model: product.lora_model_name,
      triggerWord: product.trigger_word,
    }
    dispatch(
      setPromptRequest(_promptRequest),
    );
    dispatch(updateUserData(
    {
      promptRequest:_promptRequest
}
  ));
    navigate(`/generate/model/${product.name}`);
  };

  const ProductDataResultsRender = () => {
    if (productStatus === "succeeded" && isReady) {
      return (
        <ChooseProductView
          products={productList}
          selectProduct={handleSelectProduct}
        />
      );
    }
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" label="Loading..." color="white" />
      </div>
    );
  };

  return ProductDataResultsRender();
};

export default ChooseProduct;
