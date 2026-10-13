export default class Player {
    constructor(p) {
        this.p = p;
        this.life = 3;
    }

    run() {
        this.p.background(20);
        this.p.noStroke(); // 枠線なし
        this.p.fill(244, 190, 155);
        this.p.circle(this.p.mouseX - 20, this.p.mouseY - 10, 40); // 左金玉
        this.p.circle(this.p.mouseX + 20, this.p.mouseY - 10, 40); // 右金玉
        this.p.rect(this.p.mouseX - 15, this.p.mouseY - 90, 30, 80); // 竿
        this.p.fill(230, 150, 150);
        this.p.circle(this.p.mouseX, this.p.mouseY - 80, 35); // 亀頭
    }

    destroy(enemy) {
        const dx = this.p.mouseX - enemy.x;
        const dy = this.p.mouseY - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 20) {
            this.life--;

            if (this.life === 0) {
                alert('ゲームオーバー');
                
                this.life = 3;
            }

            return true;
        }

        return false;
    }
}