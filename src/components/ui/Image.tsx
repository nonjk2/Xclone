/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
interface PhotoImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const PhotoImage: React.FC<PhotoImageProps> = (props) => {
  return <img {...props} onClick={(e) => e.stopPropagation()} />;
};

export default PhotoImage;
