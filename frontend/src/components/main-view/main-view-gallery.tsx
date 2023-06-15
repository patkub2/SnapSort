import React, { useEffect, useState, forwardRef, Fragment } from "react";
import Image from "next/image";
import styled from "styled-components";
import { Image as AntImage, message, Popconfirm, Popover, Tooltip } from "antd";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { ThumbnailType } from "@/interfaces/image";
import { getPhotoById } from "@/store/requests";
import { useSession } from "next-auth/react";

const Container = styled.div`
  margin: 1rem 2rem;
  height: 100%;
`;

const Box = styled.div`
  overflow: hidden;
  border-radius: 6px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
`;

const PopupBox = styled.div`
  display: flex;
  gap: 1rem;
`;

const PopupIcon = styled(Image)`
  &:hover {
    cursor: pointer;
  }
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

  const deleteImageHandler = (albumId: number) => {
    console.log(albumId);
  };

  const editTagsHandler = (imageTags: string[]) => {
    console.log(imageTags);
  };

  const content = (albumId: number, imageTags: string[]) => (
    <PopupBox>
      <Popconfirm
        title="Delete the image"
        description="Are you sure to delete this image?"
        onConfirm={() => deleteImageHandler(albumId)}
      >
        <Fragment>
          <Tooltip title="Delete image">
            <PopupIcon
              src={"/icons/bin.svg"}
              alt="Delete image icon"
              width={20}
              height={20}
            />
          </Tooltip>
        </Fragment>
      </Popconfirm>
      <Tooltip title="Edit tags">
        <Fragment>
          <PopupIcon
            onClick={() => editTagsHandler(imageTags)}
            src={"/icons/edit.svg"}
            alt="Tag edit icon"
            width={20}
            height={20}
          />
        </Fragment>
      </Tooltip>
    </PopupBox>
  );

  const mappedThumbnails = images.map((image, index) => {
    return (
      <Popover
        content={content(image.photoId, image.tags)}
        placement="top"
        key={index}
        arrow={false}
      >
        <Fragment>
          <Box>
            <AntImage
              style={{ borderRadius: "5px" }}
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
          </Box>
        </Fragment>
      </Popover>
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
        <AntImage.PreviewGroup
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
              <AntImage
                key={image.id}
                style={{ display: "none" }}
                src={`data:image/jpeg;base64,${image.data}`}
              />
            );
          })}
        </AntImage.PreviewGroup>
      )}
    </Container>
  );
};

export default Gallery;
