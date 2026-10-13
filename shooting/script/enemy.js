export default class Enemy {
    constructor(p, config) {
        this.p = p;
        this.x = Math.floor(Math.random() * (config.x + 1));
        this.y = 0;
        this.show = true;
        this.life = Math.floor(Math.random() * 5) + 1;

        this.bullets = [];
        this.shotInterval = 180;
        this.shotTimer = 0;
    }

    run(enemy, player) {
        this.y = this.y + 2;
        this.p.fill(255, 0, 0);
        this.p.circle(enemy.x, enemy.y, 30);

        this.shotTimer++;
        if (this.shotTimer >= this.shotInterval) {
            this.shot(player);
            this.shotTimer = 0;
        }

        for (const bullet of this.bullets) {
            bullet.x += bullet.vx;
            bullet.y += bullet.vy;

            this.p.fill(255, 255, 255);
            this.p.circle(bullet.x, bullet.y, 10);

            const dx = bullet.x - this.p.mouseX;
            const dy = bullet.y - this.p.mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 20) {
                player.life--;

                if (player.life <= 0) {
                    player.life = 0;
                    alert('ゲームオーバー');
                }

                bullet.x = -100;
            }
        }

        this.bullets = this.bullets.filter(bullet =>
            bullet.x >= 0 &&
            bullet.x <= this.p.width &&
            bullet.y >= 0 &&
            bullet.y <= this.p.height
        );
    }


    shot(player) {
        const dx = this.p.mouseX - this.x;
        const dy = this.p.mouseY - this.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) return;

        const speed = 5;

        this.bullets.push({
            x: this.x,
            y: this.y,
            vx: (dx / distance) * speed,
            vy: (dy / distance) * speed
        });
    }

    destroy(sprite) {
        const dx = this.x - sprite.x;
        const dy = this.y - sprite.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 20) {
            this.life--;

            if (this.life === 0) {
                this.show = false;
            }

            return true;
        }

        return false;
    }
}