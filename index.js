const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const backgroundLevel1 = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imgSrc: "./images/backgroundLevel1.png",
});
const parsedCollisions = collisionLevel1.parse2D();
const collisionBlocks = parsedCollisions.createObjectsFrom2DArray();

const player = new Player({
  collisionBlocks,
  imgSrc: "./images/king/idle.png",
  frames: 11,
  animations: {
    idleRight: {
      frames: 11,
      frameBuffer: 2,
      loop: true,
      imgSrc: "./images/king/idle.png",
    },
    idleLeft: {
      frames: 11,
      frameBuffer: 2,
      loop: true,
      imgSrc: "./images/king/idleLeft.png",
    },
    runRight: {
      frames: 8,
      frameBuffer: 2,
      loop: true,
      imgSrc: "./images/king/runRight.png",
    },
    runLeft: {
      frames: 8,
      frameBuffer: 2,
      loop: true,
      imgSrc: "./images/king/runLeft.png",
    },
  },
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

function animate() {
  window.requestAnimationFrame(animate);
  backgroundLevel1.draw();
  collisionBlocks.forEach((block) => {
    block.draw();
  });

  if (keys.d.pressed) {
    player.switchSprite("runRight");
    player.velocity.x = 5;
    player.lastDirection = "right";
  } else if (keys.a.pressed) {
    player.switchSprite("runLeft");
    player.velocity.x = -5;
    player.lastDirection = "left";
  } else {
    if (player.lastDirection === "left") {
      player.switchSprite("idleLeft");
    }
    if (player.lastDirection === "right") {
      player.switchSprite("idleRight");
    }
  }
  player.draw();
  player.update();
}

animate();
