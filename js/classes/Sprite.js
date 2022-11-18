class Sprite {
  constructor({
    position,
    imgSrc,
    frames = 1,
    animations,
    frameBuffer = 2,
    loop = true,
    autoPlay = true,
  }) {
    this.position = position;
    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
      this.width = this.image.width / this.frames;
      this.height = this.image.height;
    };
    this.image.src = imgSrc;
    this.loaded = false;
    this.frames = frames;
    this.currentFrame = 0;
    this.elapsedFrames = 0;
    this.frameBuffer = frameBuffer;
    this.animations = animations;
    this.loop = loop;
    this.autoPlay = autoPlay;
    this.currentAnimation;

    if (this.animations) {
      for (let key in this.animations) {
        const image = new Image();
        image.src = this.animations[key].imgSrc;
        this.animations[key].image = image;
      }
    }
  }

  draw() {
    if (!this.loaded) return;
    const cropbox = {
      position: {
        x: this.width * this.currentFrame,
        y: 0,
      },
      width: this.width,
      height: this.height,
    };
    c.drawImage(
      this.image,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    this.updateFrames();
  }
  // applyForce(proj) {
  //   proj.velocity.y += proj.gravity;
  //   proj.position.y += proj.velocity.y;
  // }
  fire() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
    console.log(this.position.x, this.position.y);
  }
  play() {
    this.autoPlay = true;
  }

  updateFrames() {
    if (!this.autoPlay) return;

    this.elapsedFrames++;

    if (this.elapsedFrames % this.frameBuffer === 0) {
      if (this.currentFrame < this.frames - 1) {
        this.currentFrame++;
      } else if (this.loop) {
        this.currentFrame = 0;
      }
    }
    if (this.currentAnimation?.onComplete) {
      if (
        this.currentFrame === this.frames - 1 &&
        !this.currentAnimation.isActive
      ) {
        this.currentAnimation.onComplete();
        this.currentAnimation.isActive = true;
      }
    }
  }
}
