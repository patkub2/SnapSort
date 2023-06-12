import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import styled from "styled-components";
import axios from "axios";

import Navigation from "../nav/navigation";
import MainView from "../main-view/main-view";

import { getAllAlbums, getAllTags } from "@/store/requests";
import { displayedAlbums } from "@/interfaces/album";
import { displayedTags } from "@/interfaces/tag";

const Box = styled.div`
  display: flex;
`;

interface Image {
  id: number;
  photoData: {
    id: number;
    data: string;
  };
  thumbnailData: {
    id: number;
    data: string;
  };
  description: string;
}

const Layout = () => {
  const { data: session } = useSession();
  const [selectedAlbum, setSelectedAlbum] = useState<Image[]>([]);
  const [displayedAlbums, setDisplayedAlbums] = useState<displayedAlbums[]>([]);
  const [displayedTags, setDisplayedTags] = useState<displayedTags[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (session) {
        getAllAlbums(session.user.token)
          .then((res) => setDisplayedAlbums(res.data))
          .catch((error) => console.log(error));

        getAllTags(session.user.token)
          .then((res) => setDisplayedTags(res.data))
          .catch((error) => console.log(error));
      }
    };
    fetchData();
  }, []);

  const updateAlbums = (albums: displayedAlbums[]) => {
    setDisplayedAlbums(albums);
  };
  const getAlbumId = async (id: number) => {
    console.log(id);
    axios
      .get(`http://localhost:8080/photos/album/${id}/thumbnails`, {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <Box>
      <Navigation
        getAlbumId={getAlbumId}
        updateAlbums={updateAlbums}
        displayedAlbums={displayedAlbums}
        displayedTags={displayedTags}
      />
      <MainView selectedAlbum={selectedAlbum} />
    </Box>
  );
};

export default Layout;
