import { BounceLoader } from "react-spinners";
import { CSSProperties } from "react";

type ComponentProps = {
  color: string;
  loading: boolean;
};

const LoadingSpinner = ({ color, loading }: ComponentProps) => {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "blue",
  };

  return (
    <BounceLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={50}
    />
  );
};

export default LoadingSpinner;
