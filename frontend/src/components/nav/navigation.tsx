import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { signOut } from "next-auth/react";
import UploadForm from "./uploadForm";
import AlbumList from "../albums/albumList";
import AddAlbumForm from "../albums/addAlbumForm";
import { displayedAlbums } from "@/interfaces/album";
import { displayedTags } from "@/interfaces/tag";
import { ThumbnailType } from "@/interfaces/image";

const Box = styled.div`
  height: 100vh;
  @media (min-width: 1201px) {
    width: 15rem;
  }

  @media (min-width: 1025px) and (max-width: 1200px) {
    width: 14rem;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 13rem;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 12rem;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    width: 11rem;
  }

  @media (max-width: 575px) {
    width: 10rem;
  }
`;

const InnerBox = styled.div`
  position: fixed;
  background-color: #f2f5f8;
  border-right: solid 0.15rem #e2e9ef;
  top: 0;
  width: inherit;
  display: flex;
  flex-direction: column;
  height: 100vh;
  row-gap: 1rem;
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

export const AddAlbum = styled.div`
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

export const Icon = styled(Image)`
  margin-right: 0.5rem;
`;

export const AlbumText = styled.p`
  color: #000f43;
  font-size: 1rem;
  margin: 0.35rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Albums = styled.div`
  min-height: 10rem;
  overflow-y: auto;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar {
    width: 8px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }

  li {
    list-style-type: none;
  }

  ul {
    padding-left: 0.7rem;
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

interface Props {
  displayedAlbums: displayedAlbums[];
  displayedTags: displayedTags[];
  updateThumbnails: (thumbnails: ThumbnailType[]) => void;
  updateTags: (tag: displayedTags[]) => void;
  getAlbumId: (id: number) => void;
  updateAlbums: (albums: displayedAlbums[]) => void;
}

const Navigation: React.FC<Props> = ({
  getAlbumId,
  updateAlbums,
  displayedAlbums,
  updateTags,
  displayedTags,
  updateThumbnails,
}) => {
  const [isUploadModalActive, setIsUploadModalActive] =
    useState<boolean>(false);
  const [isAlbumModalActive, setIsAlbumModalActive] = useState<boolean>(false);

  const addAlbumHandler = () => {
    setIsAlbumModalActive(true);
  };

  const uploadHandler = () => {
    setIsUploadModalActive(true);
  };

  const logoutHandler = () => {
    signOut();
  };

  return (
    <Box>
      <InnerBox>
        <Logo>
          <LogoImage
            src="icons/logo.svg"
            alt="Logo of the page"
            width={35}
            height={35}
            priority
          />
          <LogoText>SnapSort</LogoText>
        </Logo>
        <AddAlbum onClick={addAlbumHandler} id={"addAlbum"}>
          <Icon
            src="icons/cross.svg"
            alt="Cross icon"
            width={10}
            height={10}
          ></Icon>
          <AlbumText>New album</AlbumText>
        </AddAlbum>
        {isAlbumModalActive && (
          <AddAlbumForm
            modalIsActive={isAlbumModalActive}
            onCancel={() => setIsAlbumModalActive(false)}
            updateAlbums={updateAlbums}
          />
        )}
        <Albums id="allAlbums">
          {displayedAlbums.length > 0 ? (
            <AlbumList
              albums={displayedAlbums}
              getAlbumId={getAlbumId}
              updateAlbums={updateAlbums}
            />
          ) : (
            <AlbumText style={{ textAlign: "center" }}>
              No albums found
            </AlbumText>
          )}
        </Albums>
        <Footer>
          <FooterOption>
            <Icon
              src="icons/settings.svg"
              alt="Settings icon"
              width={15}
              height={15}
            />
            <AlbumText>Settings</AlbumText>
          </FooterOption>
          <FooterOption>
            <Icon
              src="icons/share.svg"
              alt="Dark mode icon"
              width={15}
              height={15}
            />
            <AlbumText>Share</AlbumText>
          </FooterOption>
          <FooterOption>
            <Icon
              src="icons/user.svg"
              alt="User profile icon"
              width={15}
              height={15}
            />
            <AlbumText>Profile</AlbumText>
          </FooterOption>
          <FooterOption onClick={uploadHandler} id={"uploadImages"}>
            <Icon
              src="icons/upload.svg"
              alt="Upload images icon"
              width={15}
              height={15}
            />
            <AlbumText>Upload</AlbumText>
          </FooterOption>
          <FooterOption onClick={logoutHandler} id={"logout"}>
            <Icon
              src="icons/logout.svg"
              alt="Dark mode icon"
              width={15}
              height={15}
            />
            <AlbumText>Logout</AlbumText>
          </FooterOption>
        </Footer>
      </InnerBox>
      {isUploadModalActive && (
        <UploadForm
          modalIsActive={isUploadModalActive}
          onCancel={() => setIsUploadModalActive(false)}
          allAlbums={displayedAlbums.map((album) => ({
            name: album.name,
            id: album.id,
          }))}
          updateTags={updateTags}
          allTags={displayedTags.map((tag) => tag.name)}
          updateThumbnails={updateThumbnails}
        />
      )}
    </Box>
  );
};

export default Navigation;
