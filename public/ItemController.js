import Item from "./Item.js";

class ItemController {

    INTERVAL_MIN = 0;
    INTERVAL_MAX = 12000;

    nextInterval = null;
    items = [];

    constructor(ctx, itemImages, scaleRatio, speed) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.itemImages = itemImages;
        this.scaleRatio = scaleRatio;
        this.speed = speed;

        this.setNextItemTime();
    }

    // 다음 아이템 생성 시간을 설정하는 함수
    setNextItemTime() {
        this.nextInterval = this.getRandomNumber(
            this.INTERVAL_MIN,
            this.INTERVAL_MAX
        );
    }

    // 최소값과 최대값 사이의 랜덤 숫자를 반환하는 함수
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // 새로운 아이템을 생성하는 함수
    createItem() {
        const availableItems = this.itemImages.filter(item => item.id <= this.stage);
        const index = this.getRandomNumber(0, availableItems.length - 1);
        const itemInfo = availableItems[index];
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

    // 게임 속도와 시간에 따라 아이템을 업데이트하는 함수
    update(gameSpeed, deltaTime) {
        if(this.nextInterval <= 0) {
            this.createItem();
            this.setNextItemTime();
        }

        this.nextInterval -= deltaTime;

        this.items.forEach((item) => {
            item.update(this.speed, gameSpeed, deltaTime, this.scaleRatio);
        })

        this.items = this.items.filter(item => item.x > -item.width);
    }

    // 아이템을 그리는 함수
    draw() {
        this.items.forEach((item) => item.draw());
    }

    // 스프라이트와 충돌한 아이템을 반환하는 함수
    collideWith(sprite) {
        const collidedItem = this.items.find(item => item.collideWith(sprite))
        if (collidedItem) {
            this.ctx.clearRect(collidedItem.x, collidedItem.y, collidedItem.width, collidedItem.height)
            return {
                itemId: collidedItem.id
            }
        }
    }

    // 아이템을 초기화하는 함수
    reset() {
        this.items = [];
    }

    // 스테이지를 설정하는 함수
    setStage(stage) {
        this.stage = stage;
    }
}

export default ItemController;