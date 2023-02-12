import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import {
  faPaintbrush,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { primaryColor, secondaryColor } from "../../constants/color";
import styles from "./styles.module.scss";

interface IGenerateArt {
  initialValue?: string;
}
const API_URL = "http://localhost:8080/webapp-artgen/generate";
export const GenerateArt = ({ initialValue = "" }: IGenerateArt) => {
  const [val, setVal] = useState(initialValue);

  useEffect(() => {
    setVal(initialValue);
  }, [initialValue]);

  const submitVal = async () => {
    // Add your logic to submit to your backend server here.
    // @ts-ignore
    window.grecaptcha.ready((_) => {
      // @ts-ignore
      window.grecaptcha
        .execute("6LeVTWskAAAAADcBQy_gIoLWi_nbW12i91922z5F", {
          action: "homepage",
        })
        .then((token: string) => {
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              prompt: val,
              captchaToken: token,
              imageNum: 4
            })
          };
          return fetch(
            `${API_URL}`, requestOptions
          ).then((values) => values.json());
        });
    });
  };

  useEffect(() => {
    // Add reCaptcha
    const script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?render=6LeVTWskAAAAADcBQy_gIoLWi_nbW12i91922z5F";
    document.body.appendChild(script);
  }, []);

  return (
    <section
      id="gen-art"
      className="bg-white h-screen flex flex-col items-center justify-center px-6 md:px-0"
      style={{
        // backgroundImage: "linear-gradient(#283452, #976894, #d5bdc3, #f8f4f3)",
        color: primaryColor,
      }}
    >
      <h1 className="text-3xl font-medium tracking-tight text-center">
        Let's describe what you want to see{" "}
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
              onClick={() => setVal("")}
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
      </form>
    </section>
  );
};
