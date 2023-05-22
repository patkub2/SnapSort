import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

const MainBox = styled.div`
  width: 100%;
`;
const Box1 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 1.6rem;
`;

const SearchBarBox = styled.div`
  width: 70%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SearchBarContainer = styled.div`
  padding: 0.3rem 0.3rem;
  height: 100%;
  display: flex;
  background-color: #f2f5f8;
  border-radius: 1%;
`;

const SearchBar = styled.input`
  padding: 0 0.3rem;
  width: 100%;
  font-size: 1rem;
  background-color: inherit;
  border: none;
  outline: none;
`;

const Dropdown = styled.div`
  position: absolute;
  min-height: 2rem;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0.2rem 1rem;
  z-index: 1;
  top: 2rem;
  border: 1px solid #f2f5f8;
  border-radius: 1%;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
`;

const DropdownRow = styled.div`
  padding: 0.1rem 0;
  border-bottom: 1px solid #f2f5f8;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    cursor: pointer;
  }
`;

const UploadButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #000f43;
  width: 20%;
  border-radius: 20rem;
  padding: 0 4rem;

  p {
    margin: 0;
  }

  &:hover {
    cursor: pointer;
  }
`;
const ProfileButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5%;
`;
const ProfileIcon = styled(Image)`
  height: 100%;
  width: 2rem;

  &:hover {
    cursor: pointer;
  }
`;
const Box2 = styled.div`
  background-color: #ab2;
`;

const TEST_TAGS = [
  { tagName: "Apple" },
  { tagName: "Ananas" },
  { tagName: "Album" },
  { tagName: "Aramek" },
  { tagName: "Anetka" },
  { tagName: "Amoniak" },
  { tagName: "Akamur" },
  { tagName: "Arek" },
  { tagName: "Amelka" },
];

const MainView = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      performSearch(searchValue);
    }
  };

  const performSearch = (searchTerm: string) => {
    setSearchValue(searchTerm);
    setIsSearching(false);

    console.log("Searching for:", searchTerm);
  };

  return (
    <MainBox>
      <Box1>
        <SearchBarBox>
          <SearchBarContainer>
            <Image src="search.svg" alt="Search icon" width={20} height={20} />
            <SearchBar
              type="search"
              value={searchValue}
              placeholder="Search by tags"
              onChange={(e) => {
                return [setSearchValue(e.target.value), setIsSearching(true)];
              }}
              onKeyDown={handleKeyDown}
            />
          </SearchBarContainer>
          {searchValue && isSearching && (
            <Dropdown>
              {TEST_TAGS.filter((item) => {
                const searchTerm = searchValue.toLowerCase();
                const tagName = item.tagName.toLowerCase();
                if (tagName === searchTerm) {
                  setIsSearching(false);
                }

                return (
                  searchTerm &&
                  tagName.includes(searchTerm) &&
                  tagName != searchTerm
                );
              })
                .slice(0, 10)
                .map((item) => (
                  <DropdownRow
                    onClick={() => performSearch(item.tagName)}
                    key={item.tagName}
                  >
                    {item.tagName}
                  </DropdownRow>
                ))}
            </Dropdown>
          )}
        </SearchBarBox>
        <UploadButton>
          <p>Upload</p>
        </UploadButton>
        <ProfileButton>
          <ProfileIcon
            src="user.svg"
            alt="User profile icon"
            width={20}
            height={20}
          />
        </ProfileButton>
      </Box1>
      <Box2></Box2>
    </MainBox>
  );
};

export default MainView;
