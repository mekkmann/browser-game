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
    player.velocity.x = 4;
  }
  if (keys.a.pressed) {
    player.velocity.x = -4;
  }
  player.draw();
  player.update();
}

animate();
