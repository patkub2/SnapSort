import React from "react";
import Image from "next/image";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 16rem;
  height: 100vh;
  background-color: #f2f5f8;
  border-right: solid 0.15rem #e2e9ef;
`;

const Logo = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  margin: 0.8rem 0 0.8rem 0.8rem;
  font-weight: bold;
`;

const LogoImage = styled(Image)`
  margin-right: 0.5rem;
`;

const LogoText = styled.p`
  color: #01003c;
  font-size: 1.5rem;
`;

const AddAlbum = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  width: 90%;

  height: 1.7rem;
  border-radius: 0.5rem;
  padding: 0 0.7rem;

  &:hover {
    background-color: #fff;
    cursor: pointer;
  }
`;

const Icon = styled(Image)`
  margin-right: 0.5rem;
`;

const AlbumText = styled.p`
  color: #000f43;
  font-size: 1rem;
  margin: 0.35rem 0;
`;

const Albums = styled.div`
  li {
    list-style-type: none;
  }

  ul {
    padding-left: 0.7rem;
  }
`;

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

const Footer = styled.div`
  margin-top: auto;
  border-top: solid 2px #00114d;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const FooterOption = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;
  padding-left: 0.7rem;
  margin-left: 0.7rem;
  border-radius: 0.5rem;
  width: 90%;

  &:hover {
    background-color: #fff;
    cursor: pointer;
  }
`;

interface Album {
  albumName: string;
  id: number;
  parentId: number | null;
}

interface AlbumListProps {
  albums: Album[];
}

const Navigation = () => {
  const TEST_ARRAY = [
    { albumName: "Familly Photos", id: 1, parentId: null },
    { albumName: "Sabine", id: 2, parentId: 1 },
    { albumName: "Paul", id: 3, parentId: 1 },
    { albumName: "Japan Trip", id: 5, parentId: null },
    { albumName: "Fuji", id: 6, parentId: 5 },
    { albumName: "Hometown", id: 7, parentId: null },
    { albumName: "50 Birthday", id: 8, parentId: null },
  ];

  const AlbumList: React.FC<AlbumListProps> = ({ albums }) => {
    const renderAlbum = (album: Album) => {
      const childAlbums = albums.filter((a) => a.parentId === album.id);

      if (childAlbums.length === 0) {
        return (
          <li key={album.id}>
            <FlexRowBox>
              <Icon src="circle.svg" alt="Circle icon" width={15} height={15} />
              <AlbumText>{album.albumName}</AlbumText>
              <IconsHolder>
                <Image
                  src="edit.svg"
                  alt="Edit icon"
                  width={17}
                  height={17}
                  onClick={() => console.log("Edit")}
                />
                <Image
                  src="bin.svg"
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
            <Icon src="circle.svg" alt="Circle icon" width={15} height={15} />
            <AlbumText>{album.albumName}</AlbumText>
            <IconsHolder>
              <Image
                src="edit.svg"
                alt="Edit icon"
                width={17}
                height={17}
                onClick={() => console.log("Edit")}
              />
              <Image
                src="bin.svg"
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
    const rootAlbums = albums?.filter((album) => album.parentId === null);
    return <ul>{rootAlbums?.map((album) => renderAlbum(album))}</ul>;
  };
  return (
    <Box>
      <Logo>
        <LogoImage
          src="logo.svg"
          alt="Logo of the page"
          width={35}
          height={35}
          priority
        />
        <LogoText>SnapSort</LogoText>
      </Logo>
      <AddAlbum>
        <Icon src="cross.svg" alt="Cross icon" width={10} height={10}></Icon>
        <AlbumText>New album</AlbumText>
      </AddAlbum>
      <Albums>
        <AlbumList albums={TEST_ARRAY} />
      </Albums>
      <Footer>
        <FooterOption>
          <Icon src="settings.svg" alt="Settings icon" width={15} height={15} />
          <AlbumText>Settings</AlbumText>
        </FooterOption>
        <FooterOption>
          <Icon src="moon.svg" alt="Dark mode icon" width={15} height={15} />
          <AlbumText>Dark Mode</AlbumText>
        </FooterOption>
        <FooterOption>
          <Icon src="share.svg" alt="Dark mode icon" width={15} height={15} />
          <AlbumText>Share</AlbumText>
        </FooterOption>
        <FooterOption>
          <Icon src="logout.svg" alt="Dark mode icon" width={15} height={15} />
          <AlbumText>Logout</AlbumText>
        </FooterOption>
      </Footer>
    </Box>
  );
};

export default Navigation;
