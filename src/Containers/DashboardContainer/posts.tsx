import * as React from 'react';
import { API } from 'aws-amplify'
import { Table } from 'antd';
import moment from 'moment';
import { listPosts } from '../../Graphql/queries'
import { RouteComponentProps, withRouter } from 'react-router';
import SyncContainer from './sync';
import LoadMoreContainer from './loadMore';

const formatDate = (date: string) => moment(date).format('LL hh:mm A');

const PostsContainer: React.SFC<RouteComponentProps> = props => {
  const [posts, setPosts] = React.useState([]);
  const [nextToken, setNextToken] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetchPosts()
  }, [])
  async function fetchPosts() {
    const postData: any = await API.graphql({
      query: listPosts,
      variables: {
        limit: 10
      }
    });
    const { items, nextToken: tempToken } = postData.data.listPosts;
    setPosts(items);
    setNextToken(tempToken);
    setLoading(false);
  }
  return (<div>
    <SyncContainer setPosts={setPosts} setLoading={setLoading} loading={loading} setNextToken={setNextToken}/>
    <Table
        dataSource={posts}
        rowKey="id"
        loading={loading}
        pagination={false}
        columns={[
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Description',
                dataIndex: 'body',
                key: 'body',
            },
            {
                title: 'Added Date',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: formatDate
            },
            {
                title: 'Last Synced At',
                dataIndex: 'updatedAt',
                key: 'updatedAt',
                render: formatDate
            }
        ]}
    />
    <LoadMoreContainer
        loading={loading}
        setLoading={setLoading}
        setPosts={setPosts}
        posts={posts}
        nextToken={nextToken}
        setNextToken={setNextToken}
    />
  </div>)
};

export default withRouter(PostsContainer);
