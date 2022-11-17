window.addEventListener("keydown", (event) => {
  switch (event.key) {
    // make player jump
    case "w":
      if (player.velocity.y === 0) {
        player.velocity.y = -15;
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
