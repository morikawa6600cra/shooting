export default class Sperm {
    constructor(p, mouseX, mouseY) {
        this.p = p;
        this.x = mouseX;
        this.y = mouseY - 100;
        this.show = true;
    }

    run(sprite) {
        this.y = this.y - 5;
        this.p.fill(255, 255, 255);
        this.p.circle(sprite.x, sprite.y, 10);
        this.p.triangle(sprite.y + 10, sprite.x - 10, sprite.x + 10);
    }

    destroy(sprite) {
        this.show = false;
    }
  }