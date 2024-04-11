import { useState, useCallback, useRef } from "react";

const useImageSelect = () => {
  const [previewImage, setPreviewImage] = useState<Array<String | null>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (!e.target.files) return;
      Array.from(e.target.files).forEach((file, idx) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage((prev) => {
            const prevImage = [...prev];
            prevImage[idx] = reader.result as string;
            return prevImage;
          });
        };
        reader.readAsDataURL(file);
      });
    },
    []
  );
  const onImageRemove = (index: number) => {
    setPreviewImage((prev) => {
      const prevImage = [...prev];
      prev[index] = null;
      return prevImage;
    });
  };

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);
  const resetImages = useCallback(() => {
    setPreviewImage([]);
  }, []);
  return {
    inputRef,
    onUploadImage,
    onUploadImageButtonClick,
    previewImage,
    onImageRemove,
    resetImages,
  };
};

export default useImageSelect;
