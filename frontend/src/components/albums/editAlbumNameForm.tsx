import React from "react";
import { useSession } from "next-auth/react";
import { Modal, Button, Form, Input, message } from "antd";
import axios from "axios";

import { getAllAlbums } from "@/store/requests";
import { displayedAlbums } from "@/interfaces/album";

interface Props {
  modalIsActive: boolean;
  albumId: number | undefined;
  onCancel: () => void;
  updateAlbums: (albums: displayedAlbums[]) => void;
}

const EditAlbumNameForm: React.FC<Props> = ({
  modalIsActive,
  albumId,
  onCancel,
  updateAlbums,
}) => {
  const { data: session } = useSession();
  const onSubmitHandler = async (values: any) => {
    try {
      await axios.put(
        `http://localhost:8080/api/albums/${albumId}/rename`,
        { name: values.album },
        {
          headers: {
            Authorization: `Bearer ${session?.user?.token}`,
          },
        }
      );
      await getAllAlbums(session?.user.token).then((res) =>
        updateAlbums(res.data)
      );
      message.success("Album name was edited");
      onCancel();
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  };

  return (
    <Modal
      centered
      title="Edit album name"
      open={modalIsActive}
      onCancel={onCancel}
      footer={null}
      width={400}
      style={{ textAlign: "center" }}
    >
      <Form onFinish={onSubmitHandler}>
        <Form.Item name="album">
          <Input placeholder="Album name" />
        </Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: `100%` }}>
          Ok
        </Button>
      </Form>
    </Modal>
  );
};

export default EditAlbumNameForm;
