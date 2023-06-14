import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Image, message } from "antd";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { ThumbnailType } from "@/interfaces/image";
import { getPhotoById } from "@/store/requests";
import { useSession } from "next-auth/react";

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
  const [previewImages, setPreviewImages] = useState<
    {
      id: number;
      data: string;
    }[]
  >([]);
  const { data: session } = useSession();

  useEffect(() => {}, [previewImages]);

  const previewImageHandler = async (id: number) => {
    try {
      const data = await getPhotoById(id, session?.user.token);
      if (data) {
        return data.data;
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message ?? "Something went wrong");
    }
  };

  const mappedThumbnails = images.map((image, index) => {
    return (
      <CustomImage
        key={index}
        src={`data:image/jpeg;base64,${image.thumbnailData}`}
        preview={{ visible: false }}
        onClick={async () => {
          const data = await previewImageHandler(image.photoId);
          if (data) {
            setPreviewImages([
              { id: data.photoData.id, data: data.photoData.data },
            ]);
          }
        }}
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
      {previewImages.length > 0 && (
        <Image.PreviewGroup
          preview={{
            visible: !!previewImages.length,
            onVisibleChange: (value) => {
              if (!value) {
                setPreviewImages([]);
              }
            },
          }}
        >
          {previewImages?.map((image) => {
            return (
              <Image
                style={{ display: "none" }}
                src={`data:image/jpeg;base64,${image.data}`}
              />
            );
          })}
        </Image.PreviewGroup>
      )}
    </Container>
  );
};

export default Gallery;
