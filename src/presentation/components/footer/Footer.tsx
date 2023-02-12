import { primaryColor, darkPurple } from "../../constants/color";

export const Footer = () => {
  return (
    <div
      style={{
        background: `linear-gradient(${darkPurple}, ${primaryColor})`,
      }}
      className="flex flex-col md:flex-row p-8 pt-4 justify-center items-center"
    >
      <div>
        <img src="download2.png" width={window.screen.width > 768 ? 100 : 70} />
      </div>
      <p className="text-xs mt-4 ml-0 md:ml-4">
        Free AI Art Generator made with the power of <b>Stable Diffusion</b>
      </p>
    </div>
  );
};
