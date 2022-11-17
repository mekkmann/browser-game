const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

let background;
let parsedCollisions;
let collisionBlocks;
let doors;

let level = 1;
let levels = {
  1: {
    init: () => {
      parsedCollisions = collisionLevel1.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2DArray();
      player.collisionBlocks = collisionBlocks;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imgSrc: "./images/backgroundLevel1.png",
      });
      doors = [
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
    },
  },
  2: {
    init: () => {
      parsedCollisions = collisionLevel2.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2DArray();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 96;
      player.position.y = 140;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imgSrc: "./images/backgroundLevel2.png",
      });
      doors = [
        new Sprite({
          position: {
            x: 772,
            y: 448 - 114,
          },
          imgSrc: "./images/doorOpen.png",
          frames: 5,
          frameBuffer: 5,
          loop: false,
          autoPlay: false,
        }),
      ];
    },
  },
  3: {
    init: () => {
      parsedCollisions = collisionLevel3.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2DArray();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 780;
      player.position.y = 130;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imgSrc: "./images/backgroundLevel3.png",
      });
      doors = [
        new Sprite({
          position: {
            x: 176,
            y: 448 - 114,
          },
          imgSrc: "./images/doorOpen.png",
          frames: 5,
          frameBuffer: 5,
          loop: false,
          autoPlay: false,
        }),
      ];
    },
  },
};
const player = new Player({
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
      onComplete: () => {
        console.log("door is now open");
      },
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
const overlay = {
  opacity: 0,
};
function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  // red collision blocks
  // collisionBlocks.forEach((block) => {
  //   block.draw();
  // });
  doors.forEach((door) => {
    door.draw();
  });

  player.handleInput(keys);
  player.draw();
  player.update();

  c.save();
  c.globalAlpha = overlay.opacity;
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
}
levels[level].init();
animate();
