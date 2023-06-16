import React from "react";
import { useSession } from "next-auth/react";
import { Modal, Upload, Button, Form, Select, message } from "antd";
import styled from "styled-components";

import {
  getAllTags,
  getThumbnailsById,
  uploadMultipleImages,
} from "@/store/requests";
import { displayedTags } from "@/interfaces/tag";
import { ThumbnailType } from "@/interfaces/image";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(Container)`
  flex-direction: column;
  padding: 1rem 10rem;
`;

interface Props {
  modalIsActive: boolean;
  allAlbums: { name: string; id: number }[];
  allTags: string[];
  updateThumbnails: (thumbnails: ThumbnailType[]) => void;
  onCancel: () => void;
  updateTags: (tag: displayedTags[]) => void;
}

const UploadForm: React.FC<Props> = ({
  modalIsActive,
  onCancel,
  allAlbums,
  updateTags,
  allTags,
  updateThumbnails,
}) => {
  const { data: session } = useSession();
  const albumOptions = allAlbums?.map((album) => ({
    value: album.id,
    label: album.name,
  }));
  const tagOptions = allTags?.map((tag) => ({ value: tag }));

  const onSubmitHandler = async (values: any) => {
    const joinedTags = values.tags
      ? JSON.stringify(values.tags.join(",")).slice(1, -1)
      : "";

    const formData = new FormData();
    formData.append("albumId", values.album.toString());
    formData.append("tags", joinedTags);
    values?.files?.forEach((file: any) => {
      formData.append(`files`, file.originFileObj);
    });
    try {
      await uploadMultipleImages(formData, session?.user.token);
      await getAllTags(session?.user.token).then((res) => updateTags(res.data));
      message.success("Images uploaded successfully");
      await getThumbnailsById(values.album, session?.user.token).then((res) =>
        updateThumbnails(res.data)
      );
      onCancel();
    } catch (error: any) {
      message.error(
        error.response.data.message ?? "Failed to upload the images"
      );
    }
  };

  return (
    <Modal
      centered
      title="Upload your images"
      open={modalIsActive}
      onCancel={onCancel}
      footer={null}
    >
      <Container>
        <Form onFinish={onSubmitHandler}>
          <Form.Item
            name="album"
            rules={[{ required: true, message: "Please select the album" }]}
          >
            <Select options={albumOptions} placeholder="Select the album" />
          </Form.Item>
          <Form.Item name="tags">
            <Select
              mode="tags"
              options={tagOptions}
              allowClear
              placeholder="Select tags"
            />
          </Form.Item>
          <Form.Item
            name="files"
            valuePropName="fileList"
            getValueFromEvent={(event) => event?.fileList}
            rules={[
              { required: true, message: "Please select at least one image" },
            ]}
          >
            <Upload.Dragger
              multiple
              listType="picture"
              accept=".jpeg,.jpg,.png"
            >
              <Box>
                Drag files here or
                <Button>Select files</Button>
              </Box>
            </Upload.Dragger>
          </Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: `100%` }}>
            Submit
          </Button>
        </Form>
      </Container>
    </Modal>
  );
};

export default UploadForm;
