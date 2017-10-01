import { types, getSnapshot } from "mobx-state-tree";
import { inspect } from "util";
import gqlToMobx from "gql-to-mobx";

const CommentType = `
    type Comment {
        id: Int!
        body: String
        post: PostType
    }
`;

const UserType = `
    type User {
        id: Int!
        email: String
    }
`;

const PostType = `
    type Post {
        id: Int!
        title: String
        published: Boolean
        author: User
        comments: [Comments]
    }
`;

const Comment = gqlToMobx(CommentType, {
    subtypes: {
        post: types.late(() => Post)
    }
});

const Post = gqlToMobx(PostType, {
  subtypes: {
    author: types.maybe(gqlToMobx(UserType)),
    comments: types.optional(types.array(Comment), [])
  }
}).actions(self => ({
    afterCreate() {
        console.log("created");
    }
}));

const PostStore = types
  .model("PostStore", {
    user: types.maybe(gqlToMobx(UserType)),
    posts: types.optional(types.array(Post), [])
  })
  .actions(self => ({
    signIn(user) {
      self.user = user;
    },
    afterCreate() {
      self.signIn({ id: 1, email: "martin@example.com" });
      self.posts.push(
        Post.create({
          id: 1,
          title: "MobX State Tree",
          published: true,
          author: { id: 1, email: "martin@example.com" }
        })
      );
      self.posts.push(
        Post.create({ id: 2, title: "And GraphQL", published: true })
      );
      self.posts.push(
        Post.create({ id: 3, title: "Is Awesome!", published: true })
      );

    }
  }))
  .create();
console.log(inspect(getSnapshot(PostStore), null, 10));
