import React from "react";
import { Modal, Button, Form, Input } from "antd";
import axios from "axios";
import { useSession } from "next-auth/react";
import { displayedAlbums } from "../nav/navigation";
import { getAllAlbums } from "@/store/requests";

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
    console.log(values);
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
      await getAllAlbums(session?.user.token)
        .then((res) => updateAlbums(res.data))
        .catch((error) => console.log(error));
      onCancel();
    } catch (error) {
      console.log(error);
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
