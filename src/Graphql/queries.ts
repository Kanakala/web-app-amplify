export const listPosts = `
  query listPosts($limit: Int, $nextToken: String) {
    listPosts(limit: $limit, nextToken: $nextToken) {
        items {
            id
            userId
            title
            body
            createdAt
            updatedAt
        }
        nextToken
    }
}
`;
