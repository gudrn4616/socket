import { CLIENT_VERSION } from './Constants.js';

const socket = io('http://localhost:3000', {
  query: {
    clientVersion: CLIENT_VERSION,
  },
});

let userId = null;
socket.on('response', (data) => {
  console.log(data);
});

socket.on('connection', (data) => {
  console.log('connection: ', data);
  userId = data.uuid;
});

const sendEvent = (handlerId, payload) => {
  socket.emit('event', {
    userId,
    clientVersion: CLIENT_VERSION,
    handlerId,
    payload,
  });
};

const getItemScore = (itemId) => {
  return new Promise((resolve, reject) => {
    // 서버로 'getItemScore' 이벤트와 함께 itemId를 전송
    socket.emit('getItemScore', { itemId });

    // 'itemScore' 이벤트를 한 번만 수신하고 결과를 resolve로 반환
    socket.once('itemScore', (response) => {
      resolve(response);
    });

  });
};

export { sendEvent, getItemScore };
