// import fetch from 'cross-fetch'

import Header from '../components/Header'

import css from './index.scss'

const Index = props => (
  <main>
    <section className={css.index}>TODO: {props.value}</section>
  </main>
)

Index.getInitialProps = async () => {
  // TODO not hardcode 🤦‍♂️
  // const response = await fetch('https://tslsts.karl.run/api/test')
  // const result = await response.json()

  return { value: 'test' }
}

export default Index
