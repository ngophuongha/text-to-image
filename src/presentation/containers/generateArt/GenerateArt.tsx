import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import {
  faDownload,
  faPaintbrush,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { primaryColor, secondaryColor } from "../../constants/color";
import styles from "./styles.module.scss";
import { useGenerateArt } from "../../../application/useGenerateArt";
interface IGenerateArt {
  initialValue?: string;
}

export const GenerateArt = ({ initialValue = "" }: IGenerateArt) => {
  const {
    connectionStatus,
    isLoading,
    msgHistory,
    result,
    submitVal,
    setVal,
    val,
    setMsgHistory,
  } = useGenerateArt(initialValue);

  return (
    <section
      id="gen-art"
      className="bg-white flex flex-col items-center justify-center px-6 md:px-0"
      style={{
        color: primaryColor,
        minHeight: "100vh",
      }}
    >
      <h1 className="text-3xl font-medium tracking-tight text-center">
        {isLoading
          ? "Hold on, just a little bit more to see fabulous things"
          : result.length === 0
          ? "Let's describe what you want to see "
          : "Here's what we thought you'd love to see"}
        <FontAwesomeIcon icon={faPalette} color={secondaryColor} />
        <FontAwesomeIcon
          icon={faPaintbrush}
          color={primaryColor}
          style={{ marginLeft: "3px" }}
        />
      </h1>
      <form>
        <div className="flex flex-col md:flex-row mt-8 items-end w-screen px-8 md:px-0 justify-center">
          <div className="relative flex flex-col md:flex-row w-full md:w-fit justify-center">
            <div className="flex flex-col md:flex-row">
              {/* <label>Describe what you want to see</label> */}
              <input
                type="text"
                className={classNames(
                  "form-control block w-full pl-4 pr-8 py-3 text-base font-normal text-gray-700 bg-transparent bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:outline-none",
                  styles["input"]
                )}
                id="exampleFormControlInput1"
                placeholder="Example: cartoon cat embracing a dog"
                style={{
                  border: `1px solid ${primaryColor}`,
                }}
                value={val}
                onChange={(e) => {
                  setVal(e.target.value);
                }}
              />
            </div>

            <button
              onClick={() => {
                setVal("");
                setMsgHistory([]);
              }}
              className="absolute right-4"
              style={{
                height: "50px",
              }}
              type="button"
            >
              <FontAwesomeIcon icon={faCircleXmark} size="1x" />
            </button>
          </div>
          <button
            className={
              "relative rounded-none py-3 px-3 text-sm leading-6 text-slate-50 hover:bg-white-80 hover:font-medium ml-3 w-full md:w-fit mt-6 md:mt-0"
            }
            type="button"
            style={{ backgroundColor: primaryColor, height: "50px" }}
            onClick={(e) => {
              e.preventDefault();
              submitVal();
            }}
          >
            GENERATE NOW
          </button>
        </div>
        <div
          id="imageSettings"
          className="flex flex-col md:flex-row mt-8 items-start w-screen px-8 md:px-0 justify-center gap-2"
        >
          <span>
            <b>Model used:</b> Stable Diffusion
          </span>
          <span>
            <b>Image ratio:</b> 1:1
          </span>
          <span>
            <b>Quantity:</b> 4 images
          </span>
          <span>
            <b>Resolution:</b> 512 x 512
          </span>
        </div>
        <div
          className={
            "flex flex-col md:flex-row flex-wrap justify-center mt-8 items-center"
          }
        >
          {msgHistory &&
            msgHistory.map((it) => (
              <div
                className="relative"
                style={{
                  width: "40%",
                  marginRight: "12px",
                  marginBottom: "12px",
                }}
              >
                <img
                  src={it}
                  // width={"30%"}
                  style={{}}
                />
                <a href={it} download className="absolute bottom-4 right-4">
                  <FontAwesomeIcon icon={faDownload} color={"#fff"} />
                </a>
              </div>
            ))}
        </div>
      </form>
    </section>
  );
};
