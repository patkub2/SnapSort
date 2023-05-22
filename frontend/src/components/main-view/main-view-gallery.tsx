import React from "react";
import Image from "next/image";
import styled from "styled-components";

const GalleryBox = styled.div`
  margin-top: 5rem;
  width: 100%;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-row-gap: 1.5rem;
  grid-column-gap: 1.5rem;
`;
const ImageBox = styled.div`
  width: 10rem;
  height: 15rem;
  position: relative;
  border: 1px solid black;
  border-radius: 10%;
  overflow: hidden;
`;

const GalleryImage = styled(Image)`
  object-fit: cover;

  &:hover {
    cursor: pointer;
  }
`;

interface Props {
  images: {
    id: number;
    url: string;
    description: string;
  }[];
}

const Gallery: React.FC<Props> = ({ images }) => {
  return (
    <GalleryBox>
      {images.map((image) => {
        return (
          <ImageBox key={image.id}>
            <GalleryImage
              src={image.url}
              alt={image.description}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </ImageBox>
        );
      })}
    </GalleryBox>
  );
};

export default Gallery;
