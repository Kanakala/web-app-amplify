export const syncPosts = `
  mutation syncPosts {
    syncPosts {
        id
        userId
        title
        body
        createdAt
        updatedAt
    }
}
`;
