import React, { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";

import Pin from "./pin";

import { ImageType } from "@/interfaces/image";

const PinContainer = styled.div`
  margin-top: 1rem;
  padding: 1.5rem;

  display: grid;
  grid-template-columns: repeat(auto-fill, 15.625rem);
  grid-auto-rows: 0.625rem;
  justify-content: center;
`;

interface Props {
  images: ImageType[];
}
const sizes = ["small", "medium", "big"];

const Gallery: React.FC<Props> = ({ images }) => {
  const [mappedImages, setMappedImages] = useState<JSX.Element[]>([]);

  useEffect(() => {
    let mapped: any;
    if (images.length > 0) {
      mapped = images?.map((image) => {
        const random = Math.floor(Math.random() * sizes.length);
        return (
          <Pin size={sizes[random]} key={image.id}>
            <Image
              src={image.thumbnailData.data}
              alt={image.description}
              fill
            />
          </Pin>
        );
      });
    } else {
      mapped = <p>Select the album to view images.</p>;
    }

    setMappedImages(mapped);
  }, [images]);

  return <PinContainer>{mappedImages}</PinContainer>;
};

export default Gallery;
