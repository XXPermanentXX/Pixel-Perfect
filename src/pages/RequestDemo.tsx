import NavigationBar from "@/ui/NavigationBar";
import RequestDemo from "@/features/request-demo/RequestDemoPresenter";

const RequestDemoPage = () => {
    return (
      <div className="bg-form-page h-screen">
        <NavigationBar />
        <div className="flex h-screen flex-col justify-center">
          <RequestDemo />
        </div>
      </div>
    );
  };
  
  export default RequestDemoPage;