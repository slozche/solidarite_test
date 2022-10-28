import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

const PostList = (props) => {
  const { type } = props;
  const [postListA, setPostListA] = useState([]);
  const [postListB, setPostListB] = useState([]);
  const pageA = useRef(0);
  const pageB = useRef(0);
  const [ref, inView] = useInView();
  const navigate = useNavigate();

  console.log(inView);

  const getList = useCallback(async () => {
    const page = type === "a" ? pageA.current : pageB.current;
    const LIST_URL = `https://recruit-api.yonple.com/recruit/712984/${type}-posts?page=${page}`;

    try {
      const { data } = await axios.get(LIST_URL);
      if (type === "a") {
        setPostListA((prev) => [...prev, ...data]);
        if (data.length) {
          pageA.current += 1;
        }
      } else {
        setPostListB((prev) => [...prev, ...data]);
        if (data.length) {
          pageB.current += 1;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [type]);

  useEffect(() => {
    if (`postList${type.toUpperCase()}.length` === 0) {
      console.log("첫 포스트 로딩");
      getList();
      return;
    }
  }, [type, getList]);

  useEffect(() => {
    if (`postList${type.toUpperCase()}.length` !== 0 && inView) {
      console.log("첫 로딩 이후 무한 스크롤");
      getList();
    }
  }, [inView, getList, type]);

  return (
    <>
      <Container>
        {type === "a"
          ? postListA.map((post) => {
              const { id, title, content, type } = post;
              return (
                <Item
                  key={`${type}${id}`}
                  className="item"
                  onClick={() => {
                    navigate(`/detail/${id}`, { state: { type, id } });
                  }}
                >
                  <h3 className="title">
                    <span>{`${id}.`}</span>
                    <p>{title}</p>
                  </h3>
                  <p className="content">{content}</p>
                </Item>
              );
            })
          : postListB.map((post) => {
              const { id, title, content, type } = post;
              return (
                <Item
                  key={`${type}${id}`}
                  className="item"
                  onClick={() => {
                    navigate(`/detail/${id}`, { state: { type, id } });
                  }}
                >
                  <h3 className="title">
                    <span>{`${id}.`}</span>
                    <p>{title}</p>
                  </h3>
                  <p className="content">{content}</p>
                </Item>
              );
            })}
      </Container>
      <div ref={ref} style={{ position: "absolute" }} />
    </>
  );
};

export default PostList;

const Container = styled.ul`
  padding: 18px;
  border: 1px solid #dbdbdb;
`;

const Item = styled.li`
  padding: 18px;
  cursor: pointer;

  .title {
    display: flex;
    font-size: 16px;
    font-weight: 600;
    text-align: left;
  }
  .title > span {
    color: rgb(59, 130, 246);
  }
  .title > p {
    margin-left: 4px;
  }

  .content {
    margin-top: 8px;
    font-size: 14px;
    text-align: left;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
`;
