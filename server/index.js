const express = require('express');
const cors = require('cors');
require('dotenv').config();

const twilioAccSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioMsgServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const twilioClient = require('twilio')(twilioAccSid, twilioAuthToken);

// * LOAD ROUTE files;
const authRoutes = require('./routes/auth');

const app = express();

// * MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!...');
});

app.post('/', (req, res) => {
  const { message, user: sender, type, members } = req.body;

  if (type === 'message.new') {
    members
      .filter((member) => member.user._id !== sender.id)
      .forEach((member) => {
        const user = member.user;
        const online = user.online;
        if (!online) {
          twilioClient.messages
            .create({
              body: `You have a new message from ${message.user.fullName} - ${message.text}`,
              messagingServiceSid: twilioMsgServiceSid,
              to: user.phoneNumber,
            })
            .then(() => console.log('Message sent!'))
            .catch((err) => console.log(err));
        }
      });
    return res.status(200).send('Message sent!');
  }
  return res.status(200).send('Not a new message request');
});

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
