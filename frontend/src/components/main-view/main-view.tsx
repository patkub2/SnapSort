import React, { useState } from "react";
import { AutoComplete } from "antd";
import styled from "styled-components";

import Gallery from "./main-view-gallery";

import { ThumbnailType } from "@/interfaces/image";
import { displayedTags } from "@/interfaces/tag";

const MainBox = styled.div`
  width: 80%;
`;
const Box1 = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.8rem 1.6rem;
`;

interface Props {
  selectedAlbum: ThumbnailType[];
  displayedTags: displayedTags[];
}

const MainView: React.FC<Props> = ({ selectedAlbum, displayedTags }) => {
  const [tagSearchOptions, setTagSearchOptions] = useState<{ value: string }[]>(
    []
  );

  const mappedTagSearchOptions = displayedTags.map((tag) => ({
    value: tag.name,
  }));

  const onChangeTagHandler = (inputValue: string) => {
    const filtered = inputValue
      ? mappedTagSearchOptions.filter((tag) => tag.value.includes(inputValue))
      : mappedTagSearchOptions;
    setTagSearchOptions(filtered);
  };
  const onSelectTagHandler = (searchValue: string) => {
    console.log(searchValue);
  };

  return (
    <MainBox>
      <Box1>
        <AutoComplete
          options={tagSearchOptions}
          onChange={onChangeTagHandler}
          onSelect={onSelectTagHandler}
          style={{ width: `90%` }}
          allowClear
        />
      </Box1>
      <Gallery images={selectedAlbum} />
    </MainBox>
  );
};

export default MainView;
