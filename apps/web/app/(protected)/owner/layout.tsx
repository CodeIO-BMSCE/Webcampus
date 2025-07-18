import { Protect } from "@/modules/auth/wrappers/protect";
import React from "react";

const OwnerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Protect role="coordinator" permissions={{ attendance: ["create"] }}>
      <div>{children}</div>
    </Protect>
  );
};

export default OwnerLayout;
