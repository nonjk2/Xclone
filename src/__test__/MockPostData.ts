import { faker } from "@faker-js/faker";

const mockPostImages: PostImage[] = Array.from({ length: 10 }, (_, index) => ({
  link: faker.image.urlLoremFlickr(),
  imageId: index + 1,
}));

// [
//   {
//     link: faker.image.urlLoremFlickr(),
//     imageId: 1,
//   },
//   {
//     link: faker.image.urlLoremFlickr(),
//     imageId: 2,
//   },
//   {
//     link: faker.image.urlLoremFlickr(),
//     imageId: 3,
//   },
//   {
//     link: faker.image.urlLoremFlickr(),
//     imageId: 4,
//   },
//   {
//     link: faker.image.urlLoremFlickr(),
//     imageId: 5,
//   },
// ];
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
    Images: [mockPostImages[3], mockPostImages[4]],
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
    Images: [mockPostImages[5]],
    Hearts: [],
    Reposts: [],
    Comments: [],
    _count: {
      Hearts: 0,
      Reposts: 0,
      Comments: 0,
    },
  },
  {
    postId: 4,
    User: user3,
    content: "Feeling good today!",
    createdAt: new Date(),
    Images: [
      mockPostImages[6],
      mockPostImages[7],
      mockPostImages[8],
      mockPostImages[9],
    ],
    Hearts: [],
    Reposts: [],
    Comments: [],
    _count: {
      Hearts: 22,
      Reposts: 11,
      Comments: 0,
    },
  },
];

export { mockPostImages, mockPosts, user1, user2, user3 };
