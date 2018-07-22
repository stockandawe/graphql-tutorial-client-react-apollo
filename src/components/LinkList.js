import React, { Component } from 'react'
import Link from './Link'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// 1
const FEED_QUERY = gql`
  # 2
  query FeedQuery {
    allLinks {
      id
      description
      url
      votes {
        id
      }
      votes_count
    }
  }
`

class LinkList extends Component {
  render() {
    // 1
    if (this.props.feedQuery && this.props.feedQuery.loading) {
      return <div>Loading</div>
    }

    // 2
    if (this.props.feedQuery && this.props.feedQuery.error) {
      return <div>Error</div>
    }

    // 3
    const linksToRender = this.props.feedQuery.allLinks

    return (
      <div>{linksToRender.map(link => <Link key={link.id} link={link} />)}</div>
    )
  }
}

// export default LinkList
//
export default graphql(FEED_QUERY, { name: 'feedQuery' }) (LinkList)
