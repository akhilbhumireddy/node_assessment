const userSchema = {
  id: Number,
  name: String,
  username: String,
  email: String,
  address: Object,
  phone: String,
  website: String,
  company: Object,
};

const postSchema = {
  id: Number,
  userId: Number,
  title: String,
  body: String,
};

const commentSchema = {
  id: Number,
  postId: Number,
  name: String,
  email: String,
  body: String,
};

module.exports = { userSchema, postSchema, commentSchema };
