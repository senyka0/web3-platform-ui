import { useState } from "react";
import { api } from "../services/api";

export const useEncoding = () => {
  const [isEncoding, setIsEncoding] = useState(false);
  const [isEncodingDone, setIsEncodingDone] = useState(false);

  const handleEncode = async () => {
    try {
      setIsEncoding(true);
      setIsEncodingDone(false);
      await api.encodeAccounts();
      setIsEncodingDone(true);
      console.log(isEncodingDone);
    } catch (error) {
      console.error("Error encoding accounts:", error);
      setIsEncodingDone(false);
    } finally {
      setIsEncoding(false);
    }
  };

  return {
    isEncoding,
    isEncodingDone,
    handleEncode,
  };
};
