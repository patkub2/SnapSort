import React from "react";
import { useSession } from "next-auth/react";
import { Modal, Button, Form, Input, message } from "antd";
import axios from "axios";

import { getAllAlbums } from "@/store/requests";
import { displayedAlbums } from "@/interfaces/album";

interface Props {
  modalIsActive: boolean;
  onCancel: () => void;
  updateAlbums: (albums: displayedAlbums[]) => void;
}

const AddAlbumForm: React.FC<Props> = ({
  modalIsActive,
  onCancel,
  updateAlbums,
}) => {
  const { data: session } = useSession();
  const onSubmitHandler = async (values: any) => {
    try {
      await axios.post(
        "http://localhost:8080/api/albums/create",
        { name: values.album },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.token}`,
          },
        }
      );
      await getAllAlbums(session?.user.token).then((res) =>
        updateAlbums(res.data)
      );
      onCancel();
    } catch (error: any) {
      message.error(error.response.data.message ?? "Something went wrong");
    }
  };

  return (
    <Modal
      centered
      title="Add new album"
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
          Add album
        </Button>
      </Form>
    </Modal>
  );
};

export default AddAlbumForm;
