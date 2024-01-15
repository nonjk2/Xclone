const mockPostImages: PostImage[] = [
  {
    link: "post-image-1.jpg",
    imageId: 1,
  },
  {
    link: "post-image-2.jpg",
    imageId: 2,
  },
  {
    link: "post-image-3.jpg",
    imageId: 3,
  },
];
const user1: User = {
  id: "user1",
  nickname: "JohnDoe",
  image: "profile-image-1.jpg",
  Followers: [{ id: "user2" }, { id: "user3" }],
  _count: {
    Followers: 2,
    Followings: 0,
  },
};

const user2: User = {
  id: "user2",
  nickname: "JaneSmith",
  image: "profile-image-2.jpg",
  Followers: [{ id: "user1" }],
  _count: {
    Followers: 1,
    Followings: 0,
  },
};

const user3: User = {
  id: "user3",
  nickname: "AliceJohnson",
  image: "profile-image-3.jpg",
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
    Images: [mockPostImages[0]],
    Hearts: [{ id: "user2" }],
    Reposts: [],
    Comments: [],
    _count: {
      Hearts: 1,
      Reposts: 0,
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
      Hearts: 1,
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
