import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { faCopy, faHandPointDown } from "@fortawesome/free-regular-svg-icons";
import styles from "./slide.module.scss";
import { Popup } from "reactjs-popup";
import classNames from "classnames";
import { secondaryColor } from "../../constants/color";

export interface ISlideItem {
  src: string;
  alt?: string;
  prompt: string;
  onClick: () => void;
}
export const SlideItem = ({ onClick, prompt, src, alt }: ISlideItem) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const containerRef = useRef<HTMLImageElement>(null);
  return (
    <div
      className="relative"
      ref={containerRef}
      onMouseEnter={() => {
        setShowOverlay(true);
      }}
      onMouseLeave={(e) => {
        console.log("container: ", (e.target as HTMLElement).tagName);
        e.nativeEvent.stopPropagation();

        setShowOverlay(false);
      }}
    >
      <img src={src} className="md:ml-0" alt={alt} />
      {showOverlay && (
        <div
          className="absolute top-0 h-full w-full flex flex-col justify-end items-end"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            maxWidth: "512px",
          }}
        >
          <div
            className="mb-0 w-full flex flex-row justify-between items-center p-2"
            style={{
              maxWidth: "512px",
            }}
          >
            <span className={styles["prompt"]}>
              <b>Prompt: </b>
              {prompt}
            </span>
            <Popup
              trigger={(open) => (
                <button className={classNames("pl-4")}>
                  <FontAwesomeIcon icon={faCopy} size={"lg"} />
                </button>
              )}
              position="top right"
              closeOnDocumentClick
              arrowStyle={{
                backgroundColor: "transparent",
                color: "rgb(13, 50, 77, 0.8)",
              }}
              contentStyle={{
                backgroundColor: "rgb(13, 50, 77, 0.8)",
                padding: "12px 16px",
                maxWidth: "300px",
                textAlign: "center",
              }}
            >
              <span>
                Copied to clipboard.{" "}
                <b
                  onClick={onClick}
                  className="underline underline-offset-1 cursor-pointer"
                >
                  Generate art with this prompt now!
                  <FontAwesomeIcon
                    icon={faHandPointDown}
                    size="1x"
                    color={secondaryColor}
                    style={{ marginLeft: "2px" }}
                  />
                </b>
              </span>
            </Popup>
          </div>
        </div>
      )}
    </div>
  );
};
