import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'

import '../style/global.scss'
import Header from '../components/Header'

import css from './_app.scss'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Head>
          <title>Teslastatistikk</title>
        </Head>
        <Header />
        <div className={css.contentWrapper}>
          <Component {...pageProps} />
        </div>
      </Container>
    )
  }
}

export default MyApp
