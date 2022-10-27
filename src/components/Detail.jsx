import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const Detail = () => {
  const { type, id } = useLocation().state;
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(true);
  const POST_DETAIL = `https://recruit-api.yonple.com/recruit/712984/${type}-posts/${id}`;
  const navigate = useNavigate();

  const getDetail = useCallback(async () => {
    try {
      const { data } = await axios.get(POST_DETAIL);
      setDetail(data);
    } catch (error) {
      console.log(error);
    }
  }, [POST_DETAIL]);

  const View = () => {
    if (!detail) return;
    const { title, content } = detail;

    return (
      <Item>
        <h1>{title}</h1>
        <p>{content}</p>
      </Item>
    );
  };

  useEffect(() => {
    getDetail();
  }, [loading]);

  return (
    <Container>
      <article>{View()}</article>
      <footer style={{ marginTop: "12px" }}>
        <Button onClick={() => navigate(-1)}>뒤로가기</Button>
      </footer>
    </Container>
  );
};

export default Detail;

const Container = styled.section`
  min-width: 500px;
  max-width: 1000px;
  padding: 35px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Item = styled.section`
  padding: 35px;
  border: 1px solid #dbdbdb;

  h1 {
    font-size: 32px;
  }

  p {
    margin-top: 35px;
    font-size: 14px;
    text-align: left;
  }
`;

const Button = styled.button`
  padding: 11px 28px;
  border-radius: 5px;
  background-color: rgb(59, 130, 246);
  font-size: 14px;
  color: white;
  cursor: pointer;
`;
