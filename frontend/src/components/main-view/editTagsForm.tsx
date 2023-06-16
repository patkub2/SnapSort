import React from "react";
import { useSession } from "next-auth/react";
import { Modal, Button, Form, message, Select } from "antd";

import { displayedTags } from "@/interfaces/tag";
import {
  changePhotoTagsById,
  getAllTags,
  getThumbnailsById,
} from "@/store/requests";
import { ThumbnailType } from "@/interfaces/image";

interface Props {
  modalIsActive: boolean;
  photoId: number | undefined;
  photoTags: string[];
  selectedAlbumId: number | undefined;
  displayedTags: displayedTags[];
  updateTags: (tags: displayedTags[]) => void;
  updateThumbnails: (thumbnails: ThumbnailType[]) => void;
  onCancel: () => void;
}

const EditTagsForm: React.FC<Props> = ({
  modalIsActive,
  photoId,
  onCancel,
  photoTags,
  updateThumbnails,
  displayedTags,
  selectedAlbumId,
  updateTags,
}) => {
  const { data: session } = useSession();

  const mappedTagOptions = displayedTags.map((tag) => ({
    key: tag.id,
    value: tag.name,
  }));

  const onSubmitHandler = async (values: any) => {
    try {
      await changePhotoTagsById(photoId, session?.user.token, values.album);
      await getThumbnailsById(selectedAlbumId, session?.user.token).then(
        (res) => updateThumbnails(res.data)
      );
      await getAllTags(session?.user.token).then((res) => updateTags(res.data));
      message.success("Tags were edited");
      onCancel();
    } catch (error: any) {
      message.error(error.response.data.message ?? "Something went wrong");
    }
  };

  return (
    <Modal
      centered
      title="Edit photo tags"
      open={modalIsActive}
      onCancel={onCancel}
      footer={null}
      width={400}
      style={{ textAlign: "center" }}
    >
      <Form onFinish={onSubmitHandler}>
        <Form.Item name="album" initialValue={photoTags}>
          <Select
            mode="tags"
            placeholder="Album name"
            options={mappedTagOptions}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: `100%` }}>
          Ok
        </Button>
      </Form>
    </Modal>
  );
};

export default EditTagsForm;
