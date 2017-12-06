function clickME(){
    let buttoon = document.querySelector(".bouncy-button");
    let rightHalf = document.querySelector(".right-button");
    let leftHalf = document.querySelector(".left-button");
    let ballDroppy = document.querySelector("#ballDropper");
    let download = document.querySelector(".download-button");
    let thankYou = document.querySelector(".thanks");
    buttoon.addEventListener("click", () => {
        buttoon.classList.add("animation");
        rightHalf.classList.add("right-button-animation");
        leftHalf.classList.add("left-button-animation");
        ballDroppy.classList.add("appearance-animation");
        go();
        download.classList.add("appearance-animation");
    });
    download.addEventListener("click", () => {
        download.style.display = "none";
        thankYou.classList.add("appearance-animation");
    });

    let ballDropper = document.querySelector("#ballDropper");
    let ballContext = ballDropper.getContext("2d");
    let totalBalls = 20;
    let balls = [];
    let colors = ['7bcff3', '2fb360', 'f5773c', 'e75498', 'f8dd44', 'c5c5c5'];
    let w = ballDropper.width;
    let h = ballDropper.height;

    let random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    //unless you want to release the slugs
    let clearcanvas = () => ballContext.clearRect(0, 0, w, h);
    let distanceNextFrame = (a, b) => Math.sqrt((a.x + a.vx - b.x - b.vx)**2 + (a.y + a.vy - b.y - b.vy)**2) - a.r - b.r;
    let distance = (a, b) => Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2);

    function makeLaxBall() {
        this.x = random(300,310);
        this.y = random(0,50);
        this.r = 10;
        this.mass = this.r * this.r * this.r;
        this.vx = Math.cos(random(0, 360)) * random(1, 3);
        this.vy = Math.sin(random(0, 360)) * random(1, 3);
        this.color = '#'+colors[random(0,colors.length-1)];
        this.speed = () => Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        this.angle = () => Math.atan2(this.vy, this.vx)
        this.kineticEnergy = () => (0.5 * this.mass * this.speed() * this.speed());
        this.onGround = () => (this.y + this.r >= h)
        
        this.make = () => {
            ballContext.save();
            ballContext.beginPath();
            ballContext.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            ballContext.closePath();
            ballContext.fillStyle = this.color;
            ballContext.fill();
            ballContext.restore();
        };
    }

    let animate = () => {
        clearcanvas();
        applyGravity();
        applyDrag();
        ballCollision();
        wallCollision();

        requestAnimationFrame(animate);
    }

    let wallCollision = () => {
        for (var i = 0; i < balls.length; i++) {
            balls[i].x += balls[i].vx;
            balls[i].y += balls[i].vy;

            if (balls[i].x >= w || balls[i].x <= 0) 
                balls[i].vx = -balls[i].vx;
            if (balls[i].y >= h || balls[i].y <= 0) 
                balls[i].vy = -balls[i].vy;
            
            balls[i].x >= w ? balls[i].x = random(w-10,w) : balls[i].x;
            balls[i].y > h-10 ? balls[i].y = h-10 : balls[i].y;
            balls[i].x <= 0 ? balls[i].x = random(0,10) : balls[i].x;
            balls[i].y < 0 ? balls[i].y = 0 : balls[i].y;

            balls[i].make();
        }
    }

    let ballCollision = () =>{
        for (var ball1 in balls) {
            for (var ball2 in balls) {
                if (ball1 !== ball2 && distanceNextFrame(balls[ball1], balls[ball2]) <= 0) {
                    ballCollisionSafety();
                    let theta1 = balls[ball1].angle();
                    let theta2 = balls[ball2].angle();
                    let phi = Math.atan2(balls[ball2].y - balls[ball1].y, balls[ball2].x - balls[ball1].x);
                    let m1 = balls[ball1].mass;
                    let m2 = balls[ball2].mass;
                    let v1 = balls[ball1].speed();
                    let v2 = balls[ball2].speed();

                    const vx1F = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.cos(phi) + v1*Math.sin(theta1-phi) * Math.cos(phi+Math.PI/2);
                    const vy1F = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.sin(phi) + v1*Math.sin(theta1-phi) * Math.sin(phi+Math.PI/2);
                    const vx2F = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) / (m1+m2) * Math.cos(phi) + v2*Math.sin(theta2-phi) * Math.cos(phi+Math.PI/2);
                    const vy2F = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) / (m1+m2) * Math.sin(phi) + v2*Math.sin(theta2-phi) * Math.sin(phi+Math.PI/2);

                    balls[ball1].vx = vx1F;                
                    balls[ball1].vy = vy1F;                
                    balls[ball2].vx = vx2F;                
                    balls[ball2].vy = vy2F;
                }

            }
        }
    }

    let ballCollisionSafety = () => { 
        for (var ball1 in balls) {
            for (var ball2 in balls) {
                if (ball1 !== ball2 && distance(balls[ball1], balls[ball2]) < balls[ball1].r + balls[ball2].r) {
                    let theta = Math.atan2((balls[ball1].y - balls[ball2].y), (balls[ball1].x - balls[ball2].x));
                    let overlap = balls[ball1].r + balls[ball2].r - distance(balls[ball1], balls[ball2]);
                    balls[ball1].x += overlap * Math.cos(theta);
                    balls[ball1].y += overlap * Math.sin(theta);
                }
            }
        }
    }


    let applyGravity = () => {
        for (var ball in balls) {
            if (balls[ball].onGround() == false) 
                balls[ball].vy += 0.20;
        }
    }

    let applyDrag = () => {
        for (var ball in balls) {
            balls[ball].vx *= 0.99
            balls[ball].vy *= 0.99
        }
    }

    function go() {
        for (var i = 0; i < totalBalls; i++) {
            let ball = new makeLaxBall();
            balls.push(ball);
        }
        requestAnimationFrame(animate);
    };
};