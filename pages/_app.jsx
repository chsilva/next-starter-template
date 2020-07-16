import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

import Header from 'components/header'
import Footer from 'components/footer'

import theme from 'settings/theme'

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      },
    }
  }

  render() {
    Router.events.on('routeChangeStart', () => NProgress.start())
    Router.events.on('routeChangeComplete', () => NProgress.done())
    Router.events.on('routeChangeError', () => NProgress.done())

    const { Component, pageProps } = this.props

    const GlobalStyle = createGlobalStyle`
        * {
          margin: 0;
          padding: 0;
          border: none;
          list-style: none;
          outline: none;

          box-sizing: border-box;
          font-family: "Noto Sans JP", sans-serif;
          font-size: 16px;
          text-decoration: none;

          transition: all .175s;
        }

        select {
          -moz-appearance:none ;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type=number] {
          -moz-appearance: textfield;
        }

        /* Make clicks pass-through */
        #nprogress {
          pointer-events: none;
        }

        #nprogress .bar {
          background: #254d53;

          position: fixed;
          z-index: 1031;
          top: 0;
          left: 0;

          width: 100%;
          height: 5px;
        }

        /* Fancy blur effect */
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px #254d53, 0 0 5px #254d53;
          opacity: 1.0;

          -webkit-transform: rotate(3deg) translate(0px, -4px);
              -ms-transform: rotate(3deg) translate(0px, -4px);
                  transform: rotate(3deg) translate(0px, -4px);
        }

        .nprogress-custom-parent {
          overflow: hidden;
          position: relative;
        }

        .nprogress-custom-parent #nprogress .spinner,
        .nprogress-custom-parent #nprogress .bar {
          position: absolute;
        }
      `

    const Layout = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      min-height: 100vh;

      background-color: ${(props) => props.theme.colors.bg};
    `

    return (
      <ThemeProvider theme={theme}>
        <Head>
          <title>OPGG</title>
        </Head>
        <GlobalStyle />
        <Layout>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </Layout>
      </ThemeProvider>
    )
  }
}
