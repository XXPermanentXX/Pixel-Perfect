import React from "react";
import { Button, Link } from "@nextui-org/react";

const RequestDemoConfirmedView:React.FC = () => {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center space-y-12 text-center">
      <div className="space-y-5">
        <h2 className=" font-semibold">🎉 Submitted!</h2>
        <p className="max-w-lg text-center">
          We received your demo request, and our team will get in <br />
          touch with you shortly through email.
        </p>
      </div>
      <div className="flex justify-center space-x-10">
        <Button as={Link} href="/" size="lg" radius="full" variant="solid" color="primary" className="w-48">
          OK
        </Button>
      </div>
    </div>
  );
};

export default RequestDemoConfirmedView;
