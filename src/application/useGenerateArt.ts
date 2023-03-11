import { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const API_URL = "https://api.artiesense.com/webapp-artgen/generate";
const images = [
  "330629554_600170821915413_5871640829892885795_n.png",
  "330629554_600170821915413_5871640829892885795_n.png",
  "330629554_600170821915413_5871640829892885795_n.png",
  "330629554_600170821915413_5871640829892885795_n.png",
];
const TOPIC_URL =
  "ws://Iotmiddleware-env.eba-8exjdq29.ap-southeast-2.elasticbeanstalk.com/websocket/devices?device_id=";
export const useGenerateArt = (initialValue: string) => {
  const [val, setVal] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string[]>([]);
  useEffect(() => {
    setVal(initialValue);
  }, [initialValue]);

  const [socketUrl, setSocketUrl] = useState("");
  const [msgHistory, setMsgHistory] = useState<string[]>([]);

  const { lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      console.log("lastMessage", lastMessage);
      setMsgHistory((prev) => {
        setIsLoading(false);
        if (!prev.includes(lastMessage.data))
          return prev.concat(lastMessage.data);
        return prev;
      });
    }
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const submitVal = async () => {
    // Add your logic to submit to your backend server here.
    setIsLoading(true);

    // @ts-ignore
    window.grecaptcha.ready((_) => {
      // @ts-ignore
      window.grecaptcha
        .execute("6LeVTWskAAAAADcBQy_gIoLWi_nbW12i91922z5F", {
          action: "homepage",
        })
        .then((token: string) => {
          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: val,
              captchaToken: token,
              imageNum: 4,
            }),
          };
          return fetch(`${API_URL}`, requestOptions)
            .then((values) => values.json())
            .then((val) => {
              setSocketUrl(`${TOPIC_URL}${val?.requestId}`);
            });
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

  return {
    submitVal,
    connectionStatus,
    msgHistory,
    isLoading,
    result,
    setVal,
    val,
    setMsgHistory,
  };
};
