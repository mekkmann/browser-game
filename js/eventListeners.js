window.addEventListener("keydown", (event) => {
  if (player.preventInput) {
    return;
  }
  switch (event.key) {
    // make player jump
    case "w":
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i];

        if (
          player.hitbox.position.x + player.hitbox.width <=
            door.position.x + door.width &&
          player.hitbox.position.x >= door.position.x &&
          player.hitbox.position.y + player.hitbox.height >= door.position.y &&
          player.hitbox.position.y <= door.position.y + door.height
        ) {
          player.velocity.x = 0;
          player.velocity.y = 0;
          player.preventInput = true;
          player.switchSprite("enterDoor");
          door.play();
          gsap.to(overlay, {
            opacity: 1,
            onComplete: () => {
              level++;
              if (levels[level] === undefined) {
                level = 1;
              }
              levels[level].init();
              gsap.to(overlay, {
                opacity: 0,
              });
              player.preventInput = false;
            },
          });
          return;
        }
      }
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
