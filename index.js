const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

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
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

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

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    // make player jump
    case "w":
      if (player.velocity.y === 0) {
        player.velocity.y = -20;
      }

      break;
    // move player to the left
    case "a":
      keys.a.pressed = true;
      break;
    // move player to the right
    case "d":
      keys.d.pressed = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    // stop player
    case "a":
      player.velocity.x = 0;
      keys.a.pressed = false;
      break;
    // move player to the right
    case "d":
      player.velocity.x = 0;
      keys.d.pressed = false;
      break;
  }
});
