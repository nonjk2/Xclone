"use client";
import useImage from "@/lib/hooks/useImageLoading";
import PhotoImage, { PhotoImageProps } from "./Image";

const ImageWithSuspense: React.FC<PhotoImageProps> = (props) => {
  const loadedSrc = useImage(props.src || "");
  return <PhotoImage {...props} src={loadedSrc} />;
};

export default ImageWithSuspense;
