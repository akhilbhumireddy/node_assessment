const https = require("https");

function fetchData(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          resolve(JSON.parse(data));
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

async function loadUsersWithPostsAndComments() {
  try {
    const users = await fetchData("https://jsonplaceholder.typicode.com/users");
    for (const user of users) {
      user.posts = await fetchData(
        `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
      );
      for (const post of user.posts) {
        post.comments = await fetchData(
          `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
        );
      }
    }
    return users;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
}

module.exports = { loadUsersWithPostsAndComments };
