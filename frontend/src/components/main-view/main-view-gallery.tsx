import React from "react";
import styled from "styled-components";
import { Image } from "antd";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { ThumbnailType } from "@/interfaces/image";

const Container = styled.div`
  margin: 1rem 2rem;
  height: 100%;
`;

const CustomImage = styled(Image)`
  border-radius: 5px;
`;

interface Props {
  images: ThumbnailType[];
}

const Gallery: React.FC<Props> = ({ images }) => {
  const mappedThumbnails = images.map((image, index) => {
    return (
      <CustomImage
        key={index}
        src={`data:image/jpeg;base64,${image.thumbnailData}`}
      />
    );
  });

  return (
    <Container>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 600: 2, 850: 3, 1230: 4, 1600: 5 }}
      >
        <Masonry gutter="1rem">{mappedThumbnails}</Masonry>
      </ResponsiveMasonry>
    </Container>
  );
};

export default Gallery;
