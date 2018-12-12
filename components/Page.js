import React, {Component} from 'react';
import styled, {ThemeProvider, createGlobalStyle} from 'styled-components';
import Header from './Header';
import Meta from './Meta';

// Theme object
const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
};

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

// global css
const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px; // root font size
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem; // 15px
    line-height: 2;
    font-family: 'Lato', sans-serif;
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.black};
  }
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta/>
          <Header/>
          <GlobalStyle/>
          <Inner>
            {this.props.children}
          </Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
