import React from "react";
import { useSession } from "next-auth/react";
import { Modal, Upload, Button, Form, Select } from "antd";
import styled from "styled-components";

import { uploadMultipleImages } from "@/store/requests";

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
  onCancel: () => void;
  allAlbums: { name: string; id: number }[];
  allTags: string[];
}

const UploadForm: React.FC<Props> = ({
  modalIsActive,
  onCancel,
  allAlbums,
  allTags,
}) => {
  const { data: session } = useSession();
  const albumOptions = allAlbums?.map((album) => ({
    value: album.id,
    label: album.name,
  }));
  const tagOptions = allTags?.map((tag) => ({ value: tag }));

  const onSubmitHandler = async (values: any) => {
    console.log(values);
    const joinedTags = values.tags.join(",");
    console.log(joinedTags);

    const formData = new FormData();
    formData.append("albumId", values.album.toString());
    formData.append("tags", JSON.stringify(joinedTags).slice(1, -1));
    values?.files?.forEach((file: any) => {
      formData.append(`files`, file.originFileObj);
    });

    try {
      const response = await uploadMultipleImages(
        formData,
        session?.user.token
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
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
          <Form.Item name="album">
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
