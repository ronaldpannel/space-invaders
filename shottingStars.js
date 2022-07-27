class ShootingStar {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.velX = random(-10, -0.5);
    this.velY = random(2, 3.5);
    this.color = 'rgba(255, 255, 255, 1)';
    this.history = []
  }
  update() {
    this.x = this.x += this.velX;
    this.y = this.y += this.velY;
    let v = createVector(this.x, this.y)
    this.history.push(v)
   
  }
  show() {
    fill(this.color);
    ellipse(this.x, this.y, this.r * 2);

    for(let i = 0; i < this.history.length; i++){
      let pos = this.history[i]
      if(this.x < 400 || this.y > 300){
      fill('orange')
      ellipse(pos.x, pos.y, this.r * 1.5)
      }
      if(this.history.length > random(10, 20))(
        this.history.splice(i, 1)
      )
    }
  }
  edges() {
    if (this.x < 0 || this.y > height) {
      this.x = 650, 
      this.y = random(-30, 200);
      this.velX = random(-10, -0.5);
      this.velY = random(2, 3.5);
    }
  }
}
