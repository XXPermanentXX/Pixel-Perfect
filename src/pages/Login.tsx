import LoginComponent from "@/features/auth/LogicPresenter";
import NavigationBar from "@/ui/NavigationBar";

const Login = () => {
    return (
      <div className="bg-form-page h-screen">
        {/* TOP */}
        <NavigationBar />
        <div className="-mt-20 flex h-screen flex-col justify-center">
          <LoginComponent />
        </div>
      </div>
    );
  };
  
  export default Login;