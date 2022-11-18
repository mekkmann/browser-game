class Player extends Sprite {
  constructor({ collisionBlocks = [], imgSrc, frames, animations, loop }) {
    super({ imgSrc, frames, animations, loop });
    this.position = {
      x: 200,
      y: 200,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.gravity = 1;
    this.collisionBlocks = collisionBlocks;
  }

  update() {
    // blue box
    // c.fillStyle = "rgba(0,0,255,0.5)";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);

    this.position.x += this.velocity.x;

    this.updateHitbox();

    this.checkForHorizontalCollisions();

    this.applyForce();

    this.updateHitbox();

    // red box
    // c.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.width,
    //   this.hitbox.height
    // );
    this.checkForVerticalCollisions();
  }

  switchSprite(animName) {
    if (this.image === this.animations[animName].image) return;
    this.currentFrame = 0;
    this.image = this.animations[animName].image;
    this.frames = this.animations[animName].frames;
    this.frameBuffer = this.animations[animName].frameBuffer;
    this.loop = this.animations[animName].loop;
    this.currentAnimation = this.animations[animName];
  }

  handleInput(keys) {
    if (this.preventInput) {
      return;
    }
    if (keys.k.pressed) {
      player.fire();
    } else if (keys.d.pressed) {
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
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 58,
        y: this.position.y + 34,
      },
      width: 50,
      height: 55,
    };
  }

  applyForce() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }

  checkForHorizontalCollisions() {
    // check for horizontal collisions
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        // collision on x-axis going left
        if (this.velocity.x < 0) {
          const offset = this.hitbox.position.x - this.position.x;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        }
        // collision on x-axis going right
        if (this.velocity.x > 0) {
          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width;
          this.position.x = collisionBlock.position.x - offset - 0.01;
          break;
        }
      }
    }
  }

  checkForVerticalCollisions() {
    // check for vertical collisions
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        // collision on y-axis going up
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }
        // collision on y-axis going down
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }
      }
    }
  }
}
