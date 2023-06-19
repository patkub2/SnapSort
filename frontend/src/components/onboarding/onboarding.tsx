import { setIsNewUser } from "@/store/requests";
import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import Joyride, { STATUS, Step } from "react-joyride";
import styled from "styled-components";

const H3 = styled.h3`
  margin: 0;
`;

const H2 = styled.h2`
  margin: 0;
`;

const Onboarding = () => {
  const [{ run, steps }, setState] = useState({
    run: true,
    steps: [
      {
        content: <H2>Let's begin our journey!</H2>,
        locale: {
          skip: <h3>skip</h3>,
          last: <p>Ok</p>,
        },
        placement: "center",
        target: "body",
      },
      {
        content: (
          <H3>Click here to add a new album where you can store images</H3>
        ),
        placement: "right",
        target: "#addAlbum",
        title: "Adding a new album",
        locale: {
          skip: <h3>skip</h3>,
        },
      },
      {
        content: <H3>Click here to display the images from album</H3>,
        placement: "right",
        target: "#allAlbums",
        title: "Selecting an album",
        locale: {
          skip: <h3>skip</h3>,
        },
      },
      {
        content: <H3>Click here to upload images</H3>,
        placement: "top",
        target: "#uploadImages",
        title: "Uploading images",
        locale: {
          skip: <h3>skip</h3>,
        },
      },
      {
        content: <H3>Click here to logout from your account</H3>,
        placement: "top",
        target: "#logout",
        title: "Logging out",
        locale: {
          skip: <h3>skip</h3>,
        },
      },
      {
        content: <H3>Use the searchbar to search for images</H3>,
        placement: "right",
        target: "#searchBar",
        title: "Searching by tags",
        locale: {
          skip: <h3>skip</h3>,
        },
      },
      {
        content: (
          <H3>
            After you select the album, all the images will be displayed here
          </H3>
        ),
        placement: "bottom",
        target: "#imagesContainer",
        title: "Displaying your images",
        locale: {
          skip: <h3>skip</h3>,
        },
      },
      {
        content: <H2>That's all!</H2>,
        placement: "center",
        target: "body",
        locale: {
          last: "Okay",
        },
      },
    ] as Step[],
  });

  const { data: session } = useSession();

  const handleJoyrideCallback = (data: any) => {
    const { status } = data;
    if (status === STATUS.FINISHED) {
      try {
        setIsNewUser(false, session?.user.token);
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    }
  };
  return (
    <Fragment>
      <div>
        <Joyride
          continuous
          callback={handleJoyrideCallback}
          run={run}
          steps={steps}
          scrollToFirstStep
        />
      </div>
    </Fragment>
  );
};

export default Onboarding;
