import Image from "next/image";
import styled from "styled-components";
import { AlbumText, Icon } from "../nav/navigation";

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
`;

interface Album {
  name: string;
  id: number;
  parent: number | null;
}

interface AlbumListProps {
  albums: Album[];
  getAlbumId: (id: number) => void;
}

const AlbumList: React.FC<AlbumListProps> = ({ albums, getAlbumId }) => {
  const renderAlbum = (album: Album) => {
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
              <Image
                src="icons/bin.svg"
                alt="Trash can icon"
                width={17}
                height={17}
                onClick={() => console.log("Delete")}
              />
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
            <Image
              src="icons/bin.svg"
              alt="Trash can icon"
              width={17}
              height={17}
              onClick={() => console.log("Delete")}
            />
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
