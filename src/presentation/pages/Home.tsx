import { useState } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { Jumbo } from "../components/jumbo/Jumbo";
import { darkPurple, primaryColor, secondaryColor } from "../constants/color";
import { slideItemData } from "../constants/prompts";
import { GenerateArt } from "../containers/generateArt/GenerateArt";

export const Home = () => {
  const [initialPrompt, setInitialPrompt] = useState("");
  const scrollToGenerateSection = () => {
    const genArtSection = document.querySelector("#gen-art");
    if (genArtSection) genArtSection.scrollIntoView({ behavior: "smooth" });
  };
  const genArtFromSamplePrompt = (prompt: string) => {
    setInitialPrompt(prompt);
    scrollToGenerateSection();
  };
  return (
    <div
      className="flex-column "
      style={{
        background: `linear-gradient(${primaryColor}, ${darkPurple})`,
      }}
    >
      <Header />
      <Jumbo
        slideItemData={slideItemData.map((datum) => ({
          ...datum,
          onClick: () => {
            genArtFromSamplePrompt(datum.prompt);
          },
        }))}
        onGetStarted={scrollToGenerateSection}
      />
      <GenerateArt initialValue={initialPrompt} />
      <Footer />
    </div>
  );
};
