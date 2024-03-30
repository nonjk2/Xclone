import { http, HttpResponse, StrictResponse } from "msw";
import { faker } from "@faker-js/faker";
import {
  mockFollowPosts,
  mockPosts,
  mockSearchPosts,
} from "@/__test__/MockPostData";

function generateDate() {
  const lastWeek = new Date(Date.now());
  lastWeek.setDate(lastWeek.getDate() - 7);
  return faker.date.between({
    from: lastWeek,
    to: Date.now(),
  });
}
const User: User[] = [
  {
    id: "87e9fba7-3733-400b-bb88-866e0fe24541",
    nickname: "Alice",
    image: "image1.png",
    Followers: [
      { id: "020615f3-87f9-4422-9f92-217b32f25f47" },
      { id: "70f007f5-b16e-4cbc-a00b-3edca6c154a8" },
    ],
    _count: {
      Followers: 2,
      Followings: 4,
    },
  },
  {
    id: "5cdfe8e6-3f4d-4e0f-9e02-63ca2b7aacfc",
    nickname: "Bob",
    image: "image2.png",
    Followers: [
      { id: "c39df13b-cb20-4f26-ac1c-e21d17809ab1" },
      { id: "4326c6b7-03ec-46bf-ad41-7d30e93f3964" },
      { id: "8f51d630-be5a-4209-98d1-63b19c11658d" },
    ],
    _count: {
      Followers: 3,
      Followings: 2,
    },
  },
  {
    id: "d8e18447-0018-4d4f-98f4-ea7603e568a1",
    nickname: "Charlie",
    image: null,
    Followers: [
      { id: "ec1b71fa-e149-4eb4-9ade-49b286a41a2f" },
      { id: "f10d7068-175b-4ed9-b83e-6aca474d9c3f" },
      { id: "b3f92e9c-eb52-40a6-b82e-8ead93e06a11" },
      { id: "acd937a3-6780-453e-9397-04f66b510b46" },
    ],
    _count: {
      Followers: 4,
      Followings: 3,
    },
  },
  {
    id: "76269949-ca38-4b12-9b60-f12ec0f29e4e",
    nickname: "Dana",
    image: "image4.png",
    Followers: [
      { id: "5ca96f81-d75f-4f9c-8498-d86787ffd059" },
      { id: "5ff37bb9-9c58-4a0a-a048-136b2b001f7b" },
    ],
    _count: {
      Followers: 2,
      Followings: 1,
    },
  },
  {
    id: "05b6c9b2-b758-4df2-b232-2e9a246e9f37",
    nickname: "Evan",
    image: null,
    Followers: [{ id: "c7c62e0c-3543-4908-8591-9436b35389bb" }],
    _count: {
      Followers: 1,
      Followings: 0,
    },
  },
];

// [
//   { id: "elonmusk", nickname: "Elon Musk", image: "/yRsRRjGO.jpg" },
//   { id: "zerohch0", nickname: "제로초", image: "/5Udwvqim.jpg" },
//   { id: "leoturtle", nickname: "레오", image: faker.image.avatar() },
// ];
const Posts = [];

export const handlers = [
  http.post("/api/login", () => {
    console.log("로그인");
    return HttpResponse.json(User[1], {
      headers: {
        "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
      },
    });
  }),
  http.post("/api/logout", () => {
    console.log("로그아웃");
    return new HttpResponse(null, {
      headers: {
        "Set-Cookie": "connect.sid=;HttpOnly;Path=/;Max-Age=0",
      },
    });
  }),
  http.post("/api/users", async ({ request }) => {
    console.log("회원가입");
    // return HttpResponse.text(JSON.stringify('user_exists'), {
    //   status: 403,
    // })
    return HttpResponse.text(JSON.stringify("ok"), {
      headers: {
        "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/;Max-Age=0",
      },
    });
  }),
  http.get("/api/postRecommends", ({ request }) => {
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get("cursor") as string) || 0;
    return HttpResponse.json(mockPosts);
  }),
  http.get("/api/followingPosts", ({ request }) => {
    return HttpResponse.json(mockFollowPosts);
  }),
  http.get("/api/search/:tag", ({ request, params }) => {
    const { tag } = params;
    return HttpResponse.json(mockSearchPosts(tag));
  }),
  http.get("/api/users/:userId/posts", ({ request, params }) => {
    const { userId } = params;
    return HttpResponse.json([
      {
        postId: 1,
        User: User[0],
        content: `${1} ${userId}의 게시글`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: 2,
        User: User[0],
        content: `${2} ${userId}의 게시글`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: 3,
        User: User[0],
        content: `${3} ${userId}의 게시글`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: 4,
        User: User[0],
        content: `${4} ${userId}의 게시글`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: 5,
        User: User[0],
        content: `${5} ${userId}의 게시글`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
    ]);
  }),
  http.get("/api/users/:userId", ({ request, params }): StrictResponse<any> => {
    const { userId } = params;
    const found = User.find((v) => v.id === userId);
    if (found) {
      return HttpResponse.json(found);
    }
    return HttpResponse.json(
      { message: "no_such_user" },
      {
        status: 404,
      }
    );
  }),
  http.get("/api/posts/:postId", ({ request, params }): StrictResponse<any> => {
    const { postId } = params;
    if (parseInt(postId as string) > 10) {
      return HttpResponse.json(
        { message: "no_such_post" },
        {
          status: 404,
        }
      );
    }
    return HttpResponse.json({
      postId,
      User: User[0],
      content: `${1} 게시글 아이디 ${postId}의 내용`,
      Images: [
        { imageId: 1, link: faker.image.urlLoremFlickr() },
        { imageId: 2, link: faker.image.urlLoremFlickr() },
        { imageId: 3, link: faker.image.urlLoremFlickr() },
      ],
      createdAt: generateDate(),
    });
  }),
  http.get("/api/posts/:postId/comments", ({ request, params }) => {
    const { postId } = params;
    return HttpResponse.json([
      {
        postId: 1,
        User: User[0],
        content: `${1} 게시글 ${postId}의 답글`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: 2,
        User: User[0],
        content: `${2} 게시글 ${postId}의 답글`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: 3,
        User: User[0],
        content: `${3} 게시글 ${postId}의 답글`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: 4,
        User: User[0],
        content: `${4} 게시글 ${postId}의 답글`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
      {
        postId: 5,
        User: User[0],
        content: `${5} 게시글 ${postId}의 답글`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: generateDate(),
      },
    ]);
  }),
  http.get("/api/followRecommends", ({ request }) => {
    return HttpResponse.json(User);
  }),
  http.get("/api/trends", ({ request }) => {
    return HttpResponse.json([
      { tagId: 1, title: "제로초", count: 1264 },
      { tagId: 2, title: "원초", count: 1264 },
      { tagId: 3, title: "투초", count: 1264 },
      { tagId: 4, title: "쓰리초", count: 1264 },
      { tagId: 5, title: "포초", count: 1264 },
      { tagId: 6, title: "파이브초", count: 1264 },
      { tagId: 7, title: "식스초", count: 1264 },
      { tagId: 8, title: "세븐초", count: 1264 },
      { tagId: 9, title: "나인초", count: 1264 },
    ]);
  }),
];
