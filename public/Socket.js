import { CLIENT_VERSION } from './Constants.js';

const socket = io('http://localhost:3000', {
  query: {
    clientVersion: CLIENT_VERSION,
  },
});

let userId = null;
socket.on('response', (data) => {
  console.log(data)
});

socket.on('connection', (data) => {
  console.log('connection: ', data);
  userId = data.uuid;
});
const sendEvent = async (handlerId, payload) => {
  return new Promise((resolve, reject) => {
    // 이벤트를 서버로 전송
    socket.emit('event', {
      userId, // 사용자 ID
      clientVersion: CLIENT_VERSION, // 클라이언트 버전
      handlerId, // 핸들러 ID
      payload, // 추가 데이터
    });
    // 서버로부터 응답을 받으면 Promise를 해결
    socket.on('response', (response) => {
      resolve(response);
    });
  });
};

export { sendEvent};
