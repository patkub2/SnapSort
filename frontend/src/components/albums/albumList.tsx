import Image from "next/image";
import styled from "styled-components";
import { message, Popconfirm } from "antd";
import { AlbumText, Icon } from "../nav/navigation";
import { deleteAlbumById, getAllAlbums } from "@/store/requests";
import { useSession } from "next-auth/react";
import { displayedAlbums } from "../nav/navigation";

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

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface Album {
  name: string;
  id: number;
  parent: number | null;
}

interface AlbumListProps {
  albums: Album[];
  getAlbumId: (id: number) => void;
  updateAlbums: (albums: displayedAlbums[]) => void;
}

const AlbumList: React.FC<AlbumListProps> = ({
  albums,
  getAlbumId,
  updateAlbums,
}) => {
  const { data: session } = useSession();
  const renderAlbum = (album: Album) => {
    const deleteHandler = async (e: any) => {
      console.log(e);
      try {
        await deleteAlbumById(album.id, session?.user.token);
        await getAllAlbums(session?.user.token)
          .then((res) => updateAlbums(res.data))
          .catch((error) => console.log(error));
        message.success("The album was deleted.");
      } catch (error) {
        message.error("Something went wrong.");
      }
    };
    const childAlbums = albums.filter((a) => a.parent === album.id);

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
                onClick={() => console.log("Edit")}
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
              onClick={() => console.log("Edit")}
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
        <ul>{childAlbums.map((childAlbum) => renderAlbum(childAlbum))}</ul>
      </li>
    );
  };
  const rootAlbums = albums?.filter((album) => album.parent === null);
  return <ul>{rootAlbums?.map((album) => renderAlbum(album))}</ul>;
};

export default AlbumList;
