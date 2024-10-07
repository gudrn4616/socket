import { sendEvent } from './Socket.js';

class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  stageChange = true;
  currentStageId = 1000;
  nextscore = 100;
  mulscore = 1;
  stage = 1;

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  update(deltaTime) {
    // deltaTime을 이용하여 점수를 증가시킴
    this.score += deltaTime * 0.01 * this.mulscore;
    // 점수가 100에 도달하고 stageChange가 true일 때
    if (Math.floor(this.score)>this.nextscore && this.score !== 0 && this.stageChange) {
      // stageChange를 false로 설정
      this.stageChange = false;
      // 이벤트를 전송하여 스테이지 변경을 알림
      sendEvent(11, { currentStage: this.currentStageId, targetStage: this.currentStageId+1 }).then(response => {
        if(response.status === 'success'){
          this.stageChange = true;
          this.currentStageId = this.currentStageId+1;
          this.mulscore = response.data.scorePerSecond;
          this.nextscore = response.data.nextscore;
          this.stage = response.data.currentStage
        }
      }).catch(error => {
        console.error('Error sending event:', error);
      });
    }
  }
  get stage(){
    return this.stage
  }

  get CurrentStageId(){
    return this.currentStageId;
  }
  
  updatemulscore(mulscore){
    this.mulscore = mulscore;
  }

  getItem(itemId) {
    this.score += itemId;
  }

  reset() {
    this.score = 0;
    this.stageChange = true;
    this.currentStageId = 1000;
    this.nextscore = 100;
    this.mulscore = 1;
    this.stage = 1;
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  getScore() {
    return this.score;
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;
    const stageX = highScoreX - 120 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);
    const stagePadded = this.stage.toString().padStart(2, 0);

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
    this.ctx.fillText(`STAGE ${stagePadded}`, stageX, y);
  }

  getCurrentScore() {
    return Math.floor(this.score);
  }

  setmulscore(m) {
    this.mulscore = m;
  }
}

export default Score;
