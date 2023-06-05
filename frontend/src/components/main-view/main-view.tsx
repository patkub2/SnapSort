import React, { useState } from "react";
import styled from "styled-components";
import Gallery from "./main-view-gallery";
import { AutoComplete } from "antd";

import TEST_TAGS from "../../helpers/test-tags-data.json";
import TEST_IMAGES from "../../helpers/test-images-data.json";

const MainBox = styled.div`
  width: 80%;
`;
const Box1 = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.8rem 1.6rem;
`;

const MainView = () => {
  const [tagSearchOptions, setTagSearchOptions] = useState<{ value: string }[]>(
    []
  );

  const mappedTagSearchOptions = TEST_TAGS.map((tag) => ({
    value: tag.tagName,
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
      <Gallery images={TEST_IMAGES} />
    </MainBox>
  );
};

export default MainView;
