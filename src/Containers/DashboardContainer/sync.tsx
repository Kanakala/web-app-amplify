
import * as React from 'react';
import { API } from 'aws-amplify'
import { Button } from 'antd';
import { syncPosts } from '../../Graphql/mutations';
import { listPosts } from '../../Graphql/queries';
import { RouteComponentProps, withRouter } from 'react-router';

interface IProps extends RouteComponentProps{
   setPosts?: any;
   loading: boolean;
   setLoading?: any;
   setNextToken?: any;
}

const SyncContainer: React.SFC<RouteComponentProps> = (props: any) => {
  async function syncData() {
    props.setLoading(true);
    await API.graphql({
      query: syncPosts
    });
    const postData: any = await API.graphql({
      query: listPosts,
      variables: {
        limit: 10
      }
    });
    const { items, nextToken } = postData.data.listPosts;
    props.setPosts(items);
    props.setNextToken(nextToken);
    props.setLoading(false);
  }
  return (
    <Button
        icon="sync"
        type="primary"
        onClick={syncData}
        style={{
            float: 'right',
            top: '-28px'
        }}
        loading={props.loading}
    >
        Sync
    </Button>)
};

export default withRouter<IProps, any>(SyncContainer);
