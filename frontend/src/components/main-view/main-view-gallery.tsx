import React, { useState, useEffect } from "react";
import Image from "next/image";
import Pin from "./pin";
import styled from "styled-components";

const PinContainer = styled.div`
  margin-top: 1rem;
  padding: 1.5rem;

  display: grid;
  grid-template-columns: repeat(auto-fill, 15.625rem);
  grid-auto-rows: 0.625rem;
  justify-content: center;
`;

interface Props {
  images: {
    id: number;
    url: string;
    description: string;
  }[];
}
const sizes = ["small", "medium", "big"];

const Gallery: React.FC<Props> = ({ images }) => {
  const [mappedImages, setMappedImages] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const maped = images.map((image) => {
      const random = Math.floor(Math.random() * sizes.length);
      return (
        <Pin size={sizes[random]} key={image.id}>
          <Image src={image.url} alt={image.description} fill />
        </Pin>
      );
    });
    setMappedImages(maped);
  }, [images]);

  return <PinContainer>{mappedImages}</PinContainer>;
};

export default Gallery;
