import React, { useState, Fragment } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styled from "styled-components";
import {
  Image as AntImage,
  message,
  Popconfirm,
  Popover,
  Spin,
  Tooltip,
} from "antd";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import EditTagsForm from "./editTagsForm";
import { ThumbnailType } from "@/interfaces/image";
import {
  deletePhotoById,
  getPhotoById,
  getThumbnailsById,
} from "@/store/requests";
import { displayedTags } from "@/interfaces/tag";

const Container = styled.div`
  margin: 1rem 2rem;
  height: fit-content;
  min-height: 20rem;
  padding-bottom: 2rem;
`;

const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const Box = styled.div`
  width: fit-content;
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
  selectedAlbumId: number | undefined;
  isLoading: boolean;
  displayedTags: displayedTags[];
  updateTags: (tags: displayedTags[]) => void;
  updateThumbnails: (thumbnails: ThumbnailType[]) => void;
}

const Gallery: React.FC<Props> = ({
  images,
  updateThumbnails,
  isLoading,
  selectedAlbumId,
  displayedTags,
  updateTags,
}) => {
  const [isEditVisible, setIsEditVisible] = useState<boolean>(false);
  const [clickedPhotoTags, setClickedPhotoTags] = useState<string[]>([]);
  const [clickedPhotoId, setClickedPhotoId] = useState<number | undefined>();
  const [previewImages, setPreviewImages] = useState<
    {
      id: number;
      data: string;
    }[]
  >([]);
  const { data: session } = useSession();

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

  const deleteImageHandler = async (photoId: number) => {
    try {
      await deletePhotoById(photoId, session?.user.token);
      message.success("Photo was deleted");
      await getThumbnailsById(selectedAlbumId, session?.user.token).then(
        (res) => updateThumbnails(res.data)
      );
    } catch (error: any) {
      message.error(error.response.data.message ?? "Something went wrong");
    }
  };

  const editTagsHandler = (imageTags: string[], photoId: number) => {
    setClickedPhotoTags(imageTags);
    setClickedPhotoId(photoId);
    setIsEditVisible(true);
  };

  const content = (photoId: number, imageTags: string[]) => (
    <PopupBox>
      <Popconfirm
        title="Delete the image"
        description="Are you sure to delete this image?"
        onConfirm={() => deleteImageHandler(photoId)}
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
            onClick={() => editTagsHandler(imageTags, photoId)}
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
    <Fragment>
      {!isLoading && (
        <Container id="imagesContainer">
          <ResponsiveMasonry
            columnsCountBreakPoints={{
              350: 1,
              600: 2,
              850: 3,
              1230: 4,
              1600: 5,
            }}
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
      )}
      {isLoading && (
        <CenterBox>
          <Spin />
        </CenterBox>
      )}
      {isEditVisible && (
        <EditTagsForm
          selectedAlbumId={selectedAlbumId}
          photoTags={clickedPhotoTags}
          photoId={clickedPhotoId}
          updateThumbnails={updateThumbnails}
          modalIsActive={isEditVisible}
          displayedTags={displayedTags}
          updateTags={updateTags}
          onCancel={() => setIsEditVisible(false)}
        />
      )}
    </Fragment>
  );
};

export default Gallery;
