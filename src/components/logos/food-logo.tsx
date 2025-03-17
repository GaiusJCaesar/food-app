import Image from "next/image";
import Logo from "./meal.svg";
const MyLogo = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeConfig = {
    sm: 32,
    md: 64,
    lg: 124,
  };
  return <Image src={Logo} priority height={sizeConfig[size]} alt="Logo" />;
};

export default MyLogo;
