import React from "react";
import Image from "next/image";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 14rem;
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
  border: none;
  background-color: #fff;
  width: 90%;
  height: 1.7rem;
  border-radius: 0.5rem;
  padding-left: 0.7rem;
`;

const Icon = styled(Image)`
  margin-right: 0.5rem;
  cursor: pointer;
`;

const AlbumText = styled.p`
  color: #000f43;
  font-size: 1rem;
  cursor: pointer;
`;

const Albums = styled.div``;

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
`;

const Navigation = () => {
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
        {/* DISPLAY AND MAP ALL ALBUMS */}
        <ul>
          <li>Some album</li>
        </ul>
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
