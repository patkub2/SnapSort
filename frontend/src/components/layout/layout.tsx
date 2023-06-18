import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import styled from "styled-components";

import Navigation from "../nav/navigation";
import MainView from "../main-view/main-view";

import {
  getAllAlbums,
  getAllTags,
  getIsNewUser,
  getThumbnailsById,
} from "@/store/requests";
import { displayedAlbums } from "@/interfaces/album";
import { displayedTags } from "@/interfaces/tag";
import { message } from "antd";
import { ThumbnailType } from "@/interfaces/image";
import Onboarding from "../onboarding/onboarding";

const Box = styled.div`
  display: flex;
`;

const Layout = () => {
  const { data: session } = useSession();
  const [selectedAlbumThumbnails, setSelectedAlbumThumbnails] = useState<
    ThumbnailType[]
  >([]);
  const [displayedAlbums, setDisplayedAlbums] = useState<displayedAlbums[]>([]);
  const [displayedTags, setDisplayedTags] = useState<displayedTags[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (session) {
        try {
          getAllAlbums(session.user.token).then((res) =>
            setDisplayedAlbums(res.data)
          );
          getAllTags(session.user.token).then((res) =>
            setDisplayedTags(res.data)
          );
          getIsNewUser(session.user.token).then((res) => {
            setIsNewUser(res.data);
          });
        } catch (error: any) {
          message.error(error.response.data.message ?? "Something went wrong");
        }
      }
    };
    fetchData();
  }, []);

  const updateAlbums = (albums: displayedAlbums[]) => {
    setDisplayedAlbums(albums);
  };

  const updateTags = (tags: displayedTags[]) => {
    setDisplayedTags(tags);
  };

  const updateThumbnails = (thumbnails: ThumbnailType[]) => {
    setSelectedAlbumThumbnails(thumbnails);
  };

  const getAlbumId = async (id: number) => {
    setSelectedAlbumId(id);
    try {
      setIsLoading(true);
      getThumbnailsById(id, session?.user.token).then((res) => {
        setSelectedAlbumThumbnails(res.data);
        setIsLoading(false);
      });
    } catch (error: any) {
      message.error("Something went wrong.");
    }
  };

  return (
    <Box>
      {isNewUser && <Onboarding />}
      <Navigation
        getAlbumId={getAlbumId}
        updateAlbums={updateAlbums}
        displayedAlbums={displayedAlbums}
        updateTags={updateTags}
        displayedTags={displayedTags}
        updateThumbnails={updateThumbnails}
      />
      <MainView
        selectedAlbum={selectedAlbumThumbnails}
        displayedTags={displayedTags}
        updateThumbnails={updateThumbnails}
        selectedAlbumId={selectedAlbumId}
        isLoading={isLoading}
        updateTags={updateTags}
      />
    </Box>
  );
};

export default Layout;
