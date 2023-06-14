import { Fragment, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styled from "styled-components";
import { message, Popconfirm } from "antd";

import AddSubAlbumForm from "./addSubAlbumForm";
import EditAlbumNameForm from "./editAlbumNameForm";

import { deleteAlbumById, getAllAlbums } from "@/store/requests";
import { AlbumText, Icon } from "../nav/navigation";
import { displayedAlbums } from "@/interfaces/album";

const FlexRowBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  width: 95%;
  height: auto;
  border-radius: 0.5rem;

  &:hover {
    background-color: #fff;
    cursor: pointer;
  }
`;

const FlexRowBox2 = styled(FlexRowBox)`
  margin-left: 0.7rem;
  width: 89%;
`;

const IconsHolder = styled.div`
  display: none;
  align-items: center;
  margin-left: auto;
  gap: 0.3rem;

  img:hover {
    border: solid 1px transparent;
  }

  ${FlexRowBox}:hover & {
    display: flex;
  }
`;

const AlbumHolder = styled.div`
  display: flex;
  align-items: center;
  width: 80%;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface Props {
  albums: displayedAlbums[];
  getAlbumId: (id: number) => void;
  updateAlbums: (albums: displayedAlbums[]) => void;
}

const AlbumList: React.FC<Props> = ({ albums, getAlbumId, updateAlbums }) => {
  const [isAlbumModalActive, setIsAlbumModalActive] = useState<boolean>(false);
  const [isEditAlbumModalActive, setIsEditAlbumModalActive] =
    useState<boolean>(false);

  const [clickedAlbumId, setClickedAlbumId] = useState<number | undefined>();
  const [clickedParentId, setClickedParentId] = useState<number>();
  const { data: session } = useSession();
  const renderAlbum = (album: displayedAlbums) => {
    const deleteHandler = async (e: any) => {
      try {
        await deleteAlbumById(album.id, session?.user.token);
        await getAllAlbums(session?.user.token).then((res) =>
          updateAlbums(res.data)
        );
        message.success("The album was deleted.");
      } catch (error: any) {
        message.error(error.response.data.message ?? "Something went wrong");
      }
    };

    const editAlbumName = (id: number) => {
      setClickedAlbumId(id);
      setIsEditAlbumModalActive(true);
    };

    const childAlbums = albums.filter((a) => a?.parent?.id === album.id);

    const addAlbumHandler = (parentId: number) => {
      setIsAlbumModalActive(true);
      setClickedParentId(parentId);
    };

    if (childAlbums.length === 0) {
      return (
        <li key={album.id}>
          <FlexRowBox>
            <AlbumHolder onClick={() => getAlbumId(album.id)}>
              <Icon
                src="icons/circle.svg"
                alt="Circle icon"
                width={15}
                height={15}
              />
              <AlbumText>{album.name}</AlbumText>
            </AlbumHolder>
            <IconsHolder>
              <Image
                src="icons/edit.svg"
                alt="Edit icon"
                width={17}
                height={17}
                onClick={() => editAlbumName(album.id)}
              />
              <Popconfirm
                title="Delete the album"
                description="Are you sure you want to delete this album?"
                onConfirm={deleteHandler}
                okText="Yes"
                cancelText="No"
              >
                <Image
                  src="icons/bin.svg"
                  alt="Trash can icon"
                  width={17}
                  height={17}
                />
              </Popconfirm>
            </IconsHolder>
          </FlexRowBox>
          {!album.id ||
            (!album.parent?.id && (
              <FlexRowBox2 onClick={() => addAlbumHandler(album.id)}>
                <Icon
                  src="icons/cross.svg"
                  alt="Cross icon"
                  width={10}
                  height={10}
                ></Icon>
                <AlbumText>New album</AlbumText>
              </FlexRowBox2>
            ))}
        </li>
      );
    }

    return (
      <li key={album.id}>
        <FlexRowBox>
          <AlbumHolder onClick={() => getAlbumId(album.id)}>
            <Icon
              src="icons/circle.svg"
              alt="Circle icon"
              width={15}
              height={15}
            />
            <AlbumText>{album.name}</AlbumText>
          </AlbumHolder>
          <IconsHolder>
            <Image
              src="icons/edit.svg"
              alt="Edit icon"
              width={17}
              height={17}
              onClick={() => editAlbumName(album.id)}
            />
            <Popconfirm
              title="Delete the album"
              description="Are you sure you want to delete this album?"
              onConfirm={deleteHandler}
              okText="Yes"
              cancelText="No"
            >
              <Image
                src="icons/bin.svg"
                alt="Trash can icon"
                width={17}
                height={17}
              />
            </Popconfirm>
          </IconsHolder>
        </FlexRowBox>
        <ul>
          {childAlbums.map((childAlbum) => renderAlbum(childAlbum))}

          <FlexRowBox onClick={() => addAlbumHandler(album.id)}>
            <Icon
              src="icons/cross.svg"
              alt="Cross icon"
              width={10}
              height={10}
            ></Icon>
            <AlbumText>New album</AlbumText>
          </FlexRowBox>
        </ul>
      </li>
    );
  };
  const rootAlbums = albums?.filter((album) => album.parent === null);
  return (
    <Fragment>
      <ul>{rootAlbums?.map((album) => renderAlbum(album))}</ul>
      {isAlbumModalActive && (
        <AddSubAlbumForm
          modalIsActive={isAlbumModalActive}
          parentId={clickedParentId}
          onCancel={() => setIsAlbumModalActive(false)}
          updateAlbums={updateAlbums}
        />
      )}
      {isEditAlbumModalActive && (
        <EditAlbumNameForm
          modalIsActive={isEditAlbumModalActive}
          albumId={clickedAlbumId}
          onCancel={() => setIsEditAlbumModalActive(false)}
          updateAlbums={updateAlbums}
        />
      )}
    </Fragment>
  );
};

export default AlbumList;
