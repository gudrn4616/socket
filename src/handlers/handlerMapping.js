import { moveStageHandler, specificStageHandler } from './stage.handler.js';
import { gameEnd, gameStart } from './game.handler.js';
import { getItemScoreHandler, getItemUnlockHandler} from './item.handler.js';

const handlerMappings = {
  2: gameStart,
  3: gameEnd,
  11: moveStageHandler,
  21: getItemScoreHandler,
  22: specificStageHandler,
  31: getItemUnlockHandler,
};

export default handlerMappings;
