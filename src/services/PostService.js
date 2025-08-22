import axios from 'axios';

const API_BASE = 'http://52.44.140.230:8089/api/v1/customer/post';

const PostService = {
  async createPost(payload, config = {}) {
    // payload expected: { name, testimonialText, backgroundColor }
    // Add auth headers here if needed: { headers: { Authorization: `Bearer ${token}` } }
    const url = `${API_BASE}/create-post`;
    const res = await axios.post(url, payload, config);
    return res.data;
  },
};

export default PostService;
