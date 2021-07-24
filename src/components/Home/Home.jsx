import React, { useEffect, useState } from "react";
import performApiCall from "./../../service/service";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled.div`
  margin: 30px 30px;
  column-count: auto;
  column-width: 8rem;
  column-gap: 1rem;
`;
const CardItemWrapper = styled.div`
  break-inside: avoid;
  margin-bottom: 1rem;
  &:hover {
    transform: scale(1.05);
    transition: transform 0.5s ease-in-out;
    overflow: hiddin;
  }
`;
const CardItem = styled.div`
  display: flex;
  overflow: hidden;
  background: hsl(0, 0%, 100%);
  box-shadow: 0 0 8px rgb(0 0 0 / 25%);
  border-radius: 5px;
  flex-direction: column;
  align-items: center;
`;
const CardCover = styled.img`
  height: 100%;
  width: -webkit-fill-available;
`;
const CardContent = styled.div`
  flex: 1;
  margin: auto 10px;
  word-break: break-word;
  overflow: hidden;S
  text-overflow: ellipsis;
`;
const Search = styled.input`
  border: none;
  outline: none;
  box-shadow: 0 0 8px rgb(0 0 0 / 25%);
  border-radius: 5px;
  padding: 14px;
  width: -webkit-fill-available;
  margin: 30px;
`;
const Loading = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
function Home() {
  const [resData, setResData] = useState("");
  const [filteredData, setfilteredData] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const data = await performApiCall();
      // console.log(data);
      setResData(data.data.children);
      setfilteredData(data.data.children);
    }
    fetchData();
  }, []);

  function search(val) {
    if (val !== "") {
      const result = resData.filter((x) => {
        if (x.data.title.toLowerCase().includes(val.toLowerCase())) {
          return x;
        }
      });
      setfilteredData(result);
    } else {
      setfilteredData(resData);
    }
  }
  function debounceSearch(event) {
    let val = event.target.value;
    console.log(val);
    const later = () => {
      clearTimeout(debounceTimeout);
      search(val);
    };
    clearTimeout(debounceTimeout);
    setDebounceTimeout(setTimeout(later, 300));
  }

  return (
    <>
      <Search
        type="search"
        onChange={(e) => debounceSearch(e)}
        placeholder="search for a title..."
      />
      <Card>
        {filteredData ? (
          filteredData.map((x) => {
            return (
              <Link
                to={{
                  pathname: `/${x.data.id}`,
                  state: {
                    imageData: x.data,
                  },
                }}
                key={x.data.id}
                style={{ textDecoration: "none" }}
              >
                <CardItemWrapper>
                  <CardItem>
                    <CardCover src={x.data.thumbnail} alt={x.data.post_hint} />
                    <CardContent>
                      <h5>{x.data.title}</h5>
                    </CardContent>
                  </CardItem>
                </CardItemWrapper>
              </Link>
            );
          })
        ) : (
          <Loading>Loading...</Loading>
        )}
      </Card>
    </>
  );
}

export default Home;
