import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuth } from "../../../src/helpers";

type Props = {
  children: React.ReactNode;
};

const Private: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuth()) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{isAuth() ? children : null}</>;
};

export default Private;
