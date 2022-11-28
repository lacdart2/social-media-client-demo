
import { createPost } from "./api/posts/create.js";

const TEST_TITLE = "example title";
const TEST_BAD_TITLE = "";
const TEST_BODY = "this is an example body";
const TEST_BAD_BODY = "";
const TEST_POST = {
    title: TEST_TITLE,
    body: TEST_BODY,
}
/** 
 * a mock fetch function that posts a post successfully 
 * @returns {Promise<object>}a promise that resolves to the post item
 * @example
 * global.fetch = jest.fn(()=> postSuccess())
 */
function postSuccess() {
    return Promise.resolve({
        ok: true,
        status: 200,
        statusText: "ok",    
        title: TEST_TITLE,
        body: TEST_BODY,
        json: () => Promise.resolve(TEST_POST)
    })
}

/**
 * a mock fetch function that fetches unsuccessfully
 * @param {number} status the status code to return after posting
 * @param {string} statusText the status text to return after posting
 * @returns {Promise<object>} a promise that resolves to the test post
 * @example 
 * global.fetch = jest.fn(() => postFailure(500, "Internal Server Error"))
 */
function postFailure(status = 404, statusText = "Not Found") {
    return Promise.resolve({
        ok: false,
        status,
        statusText
    })
}
function titleMissingFailure(status = 405, statusText = "Title Missing") {
    return Promise.resolve({
        ok: false,
        title: TEST_BAD_TITLE,
        status,
        statusText
    })
}
function bodyMissingFailure(status = 406, statusText = "Body Missing") {
    return Promise.resolve({
        ok: false,
        body: TEST_BAD_BODY,
        status,
        statusText
    })
}

describe("create a post", () => {
  
    it("creates and posts a post successfully with no validation error only if title and body exists ", async () => {
        global.fetch = jest.fn(() => postSuccess())
        const post = await createPost(post);
        expect(post).toEqual(TEST_POST);
        expect(post.title).toEqual(TEST_POST.TEST_TITLE);
        expect(post.body).toEqual(TEST_POST.TEST_TITLE);
    })
   
    it(" doest create and post with validation error  if title does not exist even body exists", async () => {
        global.fetch = jest.fn(() => titleMissingFailure(405, "Title Missing"))
        const post = await createPost(post);
        expect(post).not.toBeTruthy(); 
        expect(post.title).toEqual(TEST_POST.TEST_BAD_TITLE);
        expect(post.body).toEqual(TEST_POST.TEST_BODY);
    })
 
    it(" doest create and post with validation error if body does not exist even title exists ", async () => {
        global.fetch = jest.fn(() => bodyMissingFailure(406, "Body Missing"))
        const post = await createPost(post);
        expect(post).not.toBeTruthy();  
        expect(post.title).toEqual(TEST_POST.TEST_TITLE);
        expect(post.body).toEqual(TEST_POST.TEST_BAD_BODY);
    })

    it("creates and posts a post successfully with no validation with or without tags ", async () => {
        global.fetch = jest.fn(() => postSuccess())
        const post = await createPost(post);
        expect(post).toEqual(TEST_POST);
        expect(post.title).toEqual(TEST_POST.TEST_TITLE);
        expect(post.body).toEqual(TEST_POST.TEST_BODY);
    })

    it("creates and posts a post successfully with no validation with or without media", async () => {
        global.fetch = jest.fn(() => postSuccess())
        const post = await createPost(post);
        expect(post).toEqual(TEST_POST);
        expect(post.title).toBe(TEST_POST.TEST_TITLE);
        expect(post.body).toBe(TEST_POST.TEST_BODY);
    })
    
    it("is an ok response and returns await response.json", () => {
        expect(response.json).toBeTruthy()
    })

    it("throws an error to the user "), () => {
        expect(toThrow(response.statusText))
    }
});

