const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

const backgroundLevel1 = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imgSrc: "./images/backgroundLevel1.png",
});

const player = new Player();

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
