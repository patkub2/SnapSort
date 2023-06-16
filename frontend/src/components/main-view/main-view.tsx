import React, { useState } from "react";
import { Select } from "antd";
import styled from "styled-components";

import Gallery from "./main-view-gallery";

import { ThumbnailType } from "@/interfaces/image";
import { displayedTags } from "@/interfaces/tag";

const MainBox = styled.div`
  width: 80%;
  margin: 0 auto;
`;
const Box1 = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 1.6rem;
`;

interface Props {
  selectedAlbum: ThumbnailType[];
  displayedTags: displayedTags[];
  selectedAlbumId: number | undefined;
  isLoading: boolean;
  updateTags: (tags: displayedTags[]) => void;
  updateThumbnails: (thumbnails: ThumbnailType[]) => void;
}

const MainView: React.FC<Props> = ({
  selectedAlbum,
  displayedTags,
  updateThumbnails,
  selectedAlbumId,
  isLoading,
  updateTags,
}) => {
  const mappedTagSearchOptions = displayedTags.map((tag) => ({
    value: tag.name,
  }));
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const onSelectByTagHandler = (selectedOption: string) => {
    setSelectedTags((prevState) => [...prevState, selectedOption]);
  };

  const onDeselectByTagsHandler = (deselectedOption: string) => {
    if (selectedTags.includes(deselectedOption)) {
      const filtered = selectedTags.filter(
        (option) => option !== deselectedOption
      );
      setSelectedTags(filtered);
    }
  };

  const applyFiltersTags = (val: ThumbnailType | undefined) => {
    if (selectedTags.length === 0) {
      return val;
    } else if (
      val?.tags.some((tag) =>
        selectedTags.map((tag) => tag.toLowerCase()).includes(tag.toLowerCase())
      )
    ) {
      return val;
    }
  };

  return (
    <MainBox>
      <Box1 id="searchBar">
        <Select
          mode="multiple"
          options={mappedTagSearchOptions}
          onSelect={onSelectByTagHandler}
          onDeselect={onDeselectByTagsHandler}
          style={{ width: `90%` }}
          allowClear
          onClear={() => setSelectedTags([])}
        />
      </Box1>
      <Gallery
        images={selectedAlbum?.filter(applyFiltersTags)}
        updateThumbnails={updateThumbnails}
        selectedAlbumId={selectedAlbumId}
        isLoading={isLoading}
        displayedTags={displayedTags}
        updateTags={updateTags}
      />
    </MainBox>
  );
};

export default MainView;
