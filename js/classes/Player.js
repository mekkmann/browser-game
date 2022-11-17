class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.gravity = 1;
    this.width = 50;
    this.height = 100;
    this.sides = {
      bottom: this.position.y + this.height,
    };
  }

  // function to draw the player on the canvas
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  // updates player position/velocity according to input
  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.sides.bottom = this.position.y + this.height;

    // if at bottom of canvas
    if (this.sides.bottom + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    }
    // if above bottom of canvas
    if (this.sides.bottom + this.velocity.y < canvas.height) {
      this.velocity.y += this.gravity;
      this.sides.bottom = this.position.y + this.height;
    }
  }
}
