import React from "react";
import { Modal, Upload, Button, Form, Select } from "antd";
import styled from "styled-components";

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
  allAlbums: string[];
  allTags: string[];
}

const UploadForm: React.FC<Props> = ({
  modalIsActive,
  onCancel,
  allAlbums,
  allTags,
}) => {
  const albumOptions = allAlbums?.map((album) => ({ value: album }));
  const tagOptions = allTags?.map((tag) => ({ value: tag }));

  const onSubmitHandler = (values: any) => {
    console.log(values);
  };

  return (
    <Modal
      centered
      title="Upload your images"
      open={modalIsActive}
      onCancel={onCancel}
      okButtonProps={{ style: { display: "none" } }}
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
            name={"pictures"}
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