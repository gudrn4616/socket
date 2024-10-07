import { getItemScore, getItemUnlock } from '../models/item.model.js';

// getItemScoreHandler 함수는 사용자 ID와 payload를 받아서 아이템 점수를 반환합니다.
export const getItemScoreHandler = (userId, payload) => {
  const { itemId, stageId } = payload;
  return getItemScore(userId, itemId, stageId);
};

// getItemUnlockHandler 함수는 사용자 ID와 payload를 받아서 아이템 잠금 해제를 반환합니다.(스테이지마다 얻을 수 있는 아이템)
export const getItemUnlockHandler = (userId, payload) => {
  const { stageId } = payload;
  return getItemUnlock(stageId);
}