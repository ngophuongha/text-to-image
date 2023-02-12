import Carousel, { ScrollMode } from "nuka-carousel";
import { useState } from "react";
import { secondaryColor } from "../../constants/color";
import classNames from "classnames";
import "./styles.css";
import { ISlideItem, SlideItem } from "./SlideItem";

interface IJumbo {
  slideItemData: ISlideItem[];
  onGetStarted: () => void;
}
export const Jumbo = ({ onGetStarted, slideItemData }: IJumbo) => {
  return (
    <section className="flex justify-between  flex-col md:flex-row py-4 md:py-28">
      <div className=" flex flex-col justify-between align-start w-full md:w-6/12 align-center px-8 md:px-0  md:px-12 md:mr-12">
        <img src="download2.png" width={window.screen.width > 768 ? 100 : 70} />
        {/* chip */}
        <div className="flex flex-col pt-8 md:pt-0 items-center md:items-start">
          <div className="flex flex-row pb-6">
            <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-white-600 ring-1 ring-lime-50/10 hover:ring-white-900/20 mr-4">
              AI Art Generator
            </div>
            <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-white-600 ring-1 ring-lime-50/10 hover:ring-white-900/20">
              Stable Diffusion
            </div>
          </div>

          <h1 className="text-4xl font-medium tracking-tight text-white-900 sm:text-6xl text-center">
            ArtieSense
          </h1>
          <h2 className="mt-6 text-lg leading-8 text-white-600 text-center md:text-start">
            Turn your imagination into creative artworks with the help of AI.{" "}
            <b className="underline underline-offset-1">
              No registration required.
            </b>{" "}
            <br />
            Try it now!
          </h2>
        </div>

        <button
          className={classNames(
            "relative rounded-none py-3 px-3 text-sm leading-6 text-gray-600 ring-1 ring-white-900/20 bg-gray-50 hover:ring-white-900/20 mt-8 hover:bg-gray-80",
            "started-btn"
          )}
          onClick={onGetStarted}
        >
          GET STARTED
        </button>
      </div>
      <Carousel
        slidesToShow={window.screen.width > 768 ? 1.3 : 1}
        className="mx-auto md:mx-0 my-8 md:my-0 w-6/12"
        // autoplay
        autoplayInterval={2000}
        defaultControlsConfig={{
          nextButtonStyle: {
            display: "none",
          },
          prevButtonStyle: { display: "none" },
          pagingDotsStyle: {
            marginRight: "5px",
            fill: secondaryColor,
          },
          containerClassName: "mx-auto md:mx-0  my-8 md:my-0 w-6/12",
        }}
        wrapAround
      >
        {slideItemData.map((item, index) => (
          <SlideItem {...item} key={`slideshow-${index}`} />
        ))}
      </Carousel>
    </section>
  );
};
