import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ViewWrapper = styled.div`
  margin: 30px 60px;
  box-shadow: 0 0 8px rgb(0 0 0 / 25%);
  display: inline-block;
  text-decoration: none;
`;
const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  @media only screen and (max-width: 576px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
  }
`;
const ContainerMedia = styled.img`
  max-width: 50%;
  @media only screen and (max-width: 576px) {
    min-width: 100%;
  }
`;
const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: start;
  padding: 20px;
`;
const Para = styled.p`
  margin: 0;
`;
const Category = styled.span`
  box-shadow: 0 0 8px rgb(0 0 0 / 25%);
  display: inline-block;
  margin: 15px 15px 0 0;
  text-decoration: none;
  border-radius: 5px;
  padding: 5px 30px;
`;
const BackLink = styled.div`
  box-shadow: 0 0 8px rgb(0 0 0 / 25%);
  display: inline-block;
  margin: 15px 15px 0 0;
  text-decoration: none;
  border-radius: 5px;
  padding: 5px 30px;
`;
function View() {
  const location = useLocation();
  const { imageData } = location.state;
  return (
    <>
      {imageData ? (
        <>
          <Link to={{ pathname: "/" }} style={{ margin: "30px 60px" }}>
            <BackLink>Back</BackLink>
          </Link>
          <ViewWrapper>
            <Container>
              <ContainerMedia src={imageData.url} alt={imageData.post_hint} />
              <ContainerContent>
                <Para>
                  title : <b>{imageData.title}</b>
                </Para>
                <Para>
                  author : <b>{imageData.author}</b>
                </Para>
                <Para>
                  ups : <b>{imageData.ups}</b> | downs :{" "}
                  <b>{imageData.downs}</b>
                </Para>
                <Para>
                  categories :{" "}
                  {imageData.content_categories.map((x) => (
                    <Category>{x}</Category>
                  ))}
                </Para>
              </ContainerContent>
            </Container>
          </ViewWrapper>
        </>
      ) : null}
    </>
  );
}

export default View;
