import Item from "./Item.js";
import { sendEvent } from "./Socket.js";

class ItemController {

    INTERVAL_MIN = 0;
    INTERVAL_MAX = 12000;

    nextInterval = null;
    items = [];
    updateItems = [1];
    currentStage = 1; // 현재 스테이지를 저장하는 변수 추가
    stageId = 999;


    constructor(ctx, itemImages, scaleRatio, speed) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.itemImages = itemImages;
        this.scaleRatio = scaleRatio;
        this.speed = speed;

        this.setNextItemTime();
    }

    setNextItemTime() {
        this.nextInterval = this.getRandomNumber(
            this.INTERVAL_MIN,
            this.INTERVAL_MAX
        );
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    createItem(stageId) {
        if (this.currentStage !== stageId) {
            this.currentStage = stageId;
            sendEvent(31, { stageId: stageId }).then(response => {
                const { items } = response;
                this.updateItems = items; // updateItems에 저장
            }).catch(error => {
                console.error('Error sending event:', error);
            });
        }

        if (this.updateItems.length === 0) return; // updateItems에 아이템이 없으면 생성하지 않음
        const index = this.getRandomNumber(1, this.updateItems.length); // updateItems에서 랜덤 인덱스 선택
        const stageItemImages = this.itemImages.filter(item => item.id === index);
        const itemInfo = stageItemImages[0]; // 랜덤 인덱스로 아이템 정보 선택
        const x = this.canvas.width * 1.5;
        const y = this.getRandomNumber(
            10,
            this.canvas.height - itemInfo.height
        );

        const item = new Item(
            this.ctx,
            itemInfo.id,
            x,
            y,
            itemInfo.width,
            itemInfo.height,
            itemInfo.image
        );

        this.items.push(item);
    }

    update(gameSpeed, deltaTime, stageId) {
        if(this.nextInterval <= 0) {
            this.createItem(stageId);
            this.setNextItemTime();
        }

        this.nextInterval -= deltaTime;

        this.items.forEach((item) => {
            item.update(this.speed, gameSpeed, deltaTime, this.scaleRatio);
        })

        this.items = this.items.filter(item => item.x > -item.width);
    }

    draw() {
        this.items.forEach((item) => item.draw());
    }

    collideWith(sprite) {
        const collidedItem = this.items.find(item => item.collideWith(sprite))
        if (collidedItem) {
            this.ctx.clearRect(collidedItem.x, collidedItem.y, collidedItem.width, collidedItem.height)
            return {
                itemId: collidedItem.id
            }
        }
    }

    reset() {
        this.items = [];
    }

    setCurrentStage(stage) {
        this.currentStage = stage; // 현재 스테이지를 설정하는 메서드 추가
    }
}

export default ItemController;