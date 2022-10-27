import React, { useState } from "react";
import PostList from "./PostList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Home = () => {
  const [type, setType] = useState("a");

  const searchFn = (search) => {
    const articles = document.getElementsByClassName("item");
    for (let i = 0; i < articles.length; i++) {
      if (
        articles[i].firstElementChild
          .getElementsByTagName("p")[0]
          .innerText.toLowerCase()
          .includes(search.toLowerCase())
      ) {
        articles[i].style.display = "block";
      } else {
        articles[i].style.display = "none";
      }
    }
  };

  return (
    <Container>
      <Header>
        <h1>솔리다리테 개발자 사전 과제</h1>
        <p>게시물을 검색해보세요</p>
      </Header>
      <SearchBar
        id="search-bar"
        onClick={() => document.getElementById("serch-input").focus()}
      >
        <i>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </i>
        <input
          id="serch-input"
          placeholder="검색어를 입력하세요"
          onFocus={() => {
            document.getElementById("search-bar").style.border =
              "1px solid blue";
          }}
          onBlur={() => {
            document.getElementById("search-bar").style.border =
              "1px solid #dbdbdb ";
          }}
          onChange={(e) => {
            searchFn(e.target.value);
          }}
        ></input>
      </SearchBar>
      <Main>
        <TypeTab>
          <button onClick={() => setType("a")}>A posts</button>
          <button onClick={() => setType("b")}>B posts</button>
        </TypeTab>
        <PostList type={type} />
      </Main>
    </Container>
  );
};

export default Home;

const Container = styled.section`
  min-width: 500px;
  max-width: 1000px;
  padding: 35px;
  margin: auto;
`;

const Header = styled.header`
  margin: 35px 0;

  h1 {
    font-size: 52px;
    font-weight: 600;
    word-break: keep-all;
  }

  p {
    margin-top: 18px;
    font-size: 21px;
    color: #000000;
  }
`;

const SearchBar = styled.figure`
  width: 340px;
  padding: 14px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  margin: auto;
  display: flex;

  &:hover {
    border: 1px solid rgb(59, 130, 246);
  }

  i {
    margin-right: 4px;
    color: #bdbdbd;
  }

  input {
    font-size: 14px;
  }
  input:focus {
    outline: none;
  }
`;

const TypeTab = styled.section`
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 8px;
  display: flex;

  button {
    padding: 10px;
    background: none;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
  button:hover,
  button:focus {
    color: rgb(59, 130, 246);
  }
`;

const Main = styled.article`
  margin-top: 35px;
`;
