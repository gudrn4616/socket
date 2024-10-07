import { moveStageHandler, specificStageHandler } from './stage.handler.js';
import { gameEnd, gameStart } from './game.handler.js';
import { getItemScoreHandler, getItemUnlockHandler} from './item.handler.js';

const handlerMappings = {
  2: gameStart, // 게임 시작 핸들러
  3: gameEnd, // 게임 종료 핸들러
  11: moveStageHandler, // 스테이지 이동 핸들러
  21: getItemScoreHandler, // 아이템 점수 핸들러
  22: specificStageHandler, // 특정 스테이지 핸들러
  31: getItemUnlockHandler, // 아이템 잠금 해제 핸들러
};

export default handlerMappings;
