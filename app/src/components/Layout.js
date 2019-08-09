import React from 'react';
import styled from 'styled-components';
import { Layout as AntdLayout } from 'antd';

const { Header } = AntdLayout;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .ant-layout {
    min-height: 100%;
  }

  hr {
    border-top: 1px solid ${({ theme }) => theme['@primary']};
  }

  .layout-header {
    padding: 0 16px !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #343a40;
    width: 100%;

    .logo {
      height: 50px;
    }
  }
`;

const Title = styled.h1`
  margin: 0;
  margin-left: 20px;
  text-align: center;
  display: inline-block;
  width: 100%;
  position: relative;
  color: white;
`;

const Layout = () => {
  return (
    <Container>
      <Header className="layout-header">
        <Title>ToDo List</Title>
      </Header>
    </Container>
  );
};

export default Layout;

