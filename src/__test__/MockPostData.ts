const mockPostImages: PostImage[] = [
  {
    link: "https://cdn.pixabay.com/photo/2017/08/26/23/04/flower-2684651_1280.jpg",
    imageId: 1,
  },
  {
    link: "https://cdn.pixabay.com/photo/2018/03/12/22/15/no-person-3221109_1280.jpg",
    imageId: 2,
  },
  {
    link: "https://cdn.pixabay.com/photo/2017/09/23/23/22/tomato-2780424_1280.jpg",
    imageId: 3,
  },
];
const user1: User = {
  id: "user1",
  nickname: "JohnDoe",
  image: null,
  Followers: [{ id: "user2" }, { id: "user3" }],
  _count: {
    Followers: 2,
    Followings: 0,
  },
};

const user2: User = {
  id: "user2",
  nickname: "JaneSmith",
  image: null,
  Followers: [{ id: "user1" }],
  _count: {
    Followers: 1,
    Followings: 0,
  },
};

const user3: User = {
  id: "user3",
  nickname: "AliceJohnson",
  image: null,
  Followers: [],
  _count: {
    Followers: 0,
    Followings: 0,
  },
};

// Update Mock Post Data (Array) with Images
const mockPosts: Post[] = [
  {
    postId: 1,
    User: user1,
    content: "This is my first post!",
    createdAt: new Date(),
    Images: [mockPostImages[0], mockPostImages[1], mockPostImages[2]],
    Hearts: [{ id: "user2" }],
    Reposts: [],
    Comments: [],
    _count: {
      Hearts: 233,
      Reposts: 44,
      Comments: 0,
    },
  },
  {
    postId: 2,
    User: user2,
    content: "Just shared an amazing photo!",
    createdAt: new Date(),
    Images: [mockPostImages[1]],
    Hearts: [{ id: "user1" }],
    Reposts: [],
    Comments: [],
    _count: {
      Hearts: 2222,
      Reposts: 0,
      Comments: 0,
    },
  },
  {
    postId: 3,
    User: user3,
    content: "Feeling good today!",
    createdAt: new Date(),
    Images: [mockPostImages[2]],
    Hearts: [],
    Reposts: [],
    Comments: [],
    _count: {
      Hearts: 0,
      Reposts: 0,
      Comments: 0,
    },
  },
];

export { mockPostImages, mockPosts, user1, user2, user3 };
