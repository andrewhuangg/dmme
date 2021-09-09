const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat');
const crypto = require('crypto');

const API_KEY = process.env.STREAM_API_KEY;
const API_SECRET = process.env.STREAM_API_SECRET;
const APP_ID = process.env.STREAM_APP_ID;

// * @desc      Login user
// * @route     POST /auth/
// * @access    Public
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const serverClient = connect(API_KEY, API_SECRET, APP_ID);

    const client = StreamChat.getInstance(API_KEY, API_SECRET);

    const { users } = await client.queryUsers({ name: username });

    if (!users.length) return res.status(400).json({ message: 'User not found' });

    const success = await bcrypt.compare(password, users[0].hashedPassword);

    const token = serverClient.createUserToken(users[0].id);

    if (success) {
      res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id });
    } else {
      res.status(500).json({ message: 'Incorrect Password' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

// * @desc      Sign up user
// * @route     POST /auth/
// * @access    Public
exports.signup = async (req, res) => {
  try {
    const { fullName, username, password, phoneNumber } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const serverClient = connect(API_KEY, API_SECRET, APP_ID);

    const userId = crypto.randomBytes(16).toString('hex');

    const token = serverClient.createUserToken(userId);

    res
      .status(200)
      .json({ token, fullName, username, userId, password, phoneNumber, hashedPassword });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
