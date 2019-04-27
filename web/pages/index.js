import fetch from 'cross-fetch'

import Header from '../components/Header'

const Index = props => (
  <main>
    <Header />
    <section>TODO: {props.value}</section>
  </main>
)

Index.getInitialProps = async () => {
  // TODO not hardcode 🤦‍♂️
  const response = await fetch('https://tslsts.karl.run/api/test')
  const result = await response.json()

  return { value: result.message }
}

export default Index
