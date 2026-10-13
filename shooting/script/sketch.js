import * as p from './lib/p5.min.js';
import Sperm from './sperm.js'
import Enemy from './enemy.js'
import Player from './player.js';

const sketch = p => {
  const config = {
    x: 400,
    y: 600
  }

  let shotCount = 0;
  const shotInterval = 10;

  let sprites = [];
  let enemys = [];

  let count = 0;

  let score = 0;
  let time = 0;

  const player = new Player(p);
  
  p.setup = () => {
    p.createCanvas(config.x, config.y);
  }

  p.draw = () => {
    player.run();

    sprites.forEach(sprite => {
      if (sprite.show) {
        sprite.run(sprite);

        enemys.forEach(enemy => {
          if (enemy.show && enemy.destroy(sprite)) {
            sprite.destroy();
          }
        });
      }
    });

    enemys.forEach(enemy => {
      if (enemy.show) {
        enemy.run(enemy, player);

        if (player.destroy(enemy)) {
          enemy.show = false;
        }
      }
    });

    if (count % 30 === 0) {
      enemys.push(new Enemy(p, config));
    }

    if (p.mouseIsPressed) {
      if (shotCount % shotInterval === 0) {
          sprites.push(new Sperm(p, p.mouseX, p.mouseY));
      }
      shotCount++;
    } else {
      shotCount = 0;
    }

    count++;
  }

  p.touchStarted = () => {
    // sprites.push(new Sperm(p, p.mouseX, p.mouseY));
  }
}


 
new p5(sketch, 'id'); 

/**
 * 連射力
 * 貫通力
 * 攻撃力
 * 弾丸サイズ
 * 体力回復
 * 
 */