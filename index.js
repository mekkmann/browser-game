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
      frameBuffer: 3,
      loop: true,
      imgSrc: "./images/king/runRight.png",
    },
    runLeft: {
      frames: 8,
      frameBuffer: 3,
      loop: true,
      imgSrc: "./images/king/runLeft.png",
    },
    enterDoor: {
      frames: 8,
      frameBuffer: 4,
      loop: false,
      imgSrc: "./images/king/enterDoor.png",
    },
  },
});
const doors = [
  new Sprite({
    position: {
      x: 751,
      y: 386 - 114,
    },
    imgSrc: "./images/doorOpen.png",
    frames: 5,
    frameBuffer: 5,
    loop: false,
    autoPlay: false,
  }),
];

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
  doors.forEach((door) => {
    door.draw();
  });

  player.handleInput(keys);
  player.draw();
  player.update();
}

animate();
