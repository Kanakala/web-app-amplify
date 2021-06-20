
import * as React from 'react';
import { API } from 'aws-amplify'
import { Button } from 'antd';
import { listPosts } from '../../Graphql/queries'
import { RouteComponentProps, withRouter } from 'react-router';
import { Post } from '../../Interfaces/post';

interface IProps extends RouteComponentProps{
  loading: boolean;
  setLoading?: any;
  posts?: Post[];
  setPosts?: any;
  nextToken?: any;
  setNextToken?: any;
}

const LoadMoreContainer: React.SFC<RouteComponentProps> = (props: any) => {
  async function syncData() {
    props.setLoading(true);
    const postData: any = await API.graphql({
      query: listPosts,
      variables: {
        nextToken: props.nextToken,
        limit: 10
      }
    });
    const { items, nextToken: tempToken } = postData.data.listPosts;
    props.setNextToken(tempToken);
    props.setPosts([...props.posts, ...items]);
    props.setLoading(false);
  }
  return (
    props.nextToken &&
    <Button
        icon="sync"
        type="primary"
        onClick={syncData}
        loading={props.loading}
        style={{
            left: '45%',
            top: '12px'
        }}
    >
        Load More
    </Button>)
};

export default withRouter<IProps, any>(LoadMoreContainer);
