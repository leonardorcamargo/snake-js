window.onload = function () {
  const stage = document.getElementById("stage");
  const context = stage.getContext("2d");

  const speed = 1;
  let speedX = (speedY = 0);
  let posX = (posY = 10);
  const length = 40;
  const posAmount = 20;
  let itemX = (itemY = 15);
  let trail = [];
  let tail = 5;
  let pointing = 0;
  let record = 0;

  document.addEventListener("keydown", keyPush);

  setInterval(game, 1000 / 10);

  function game() {
    posX += speedX;
    posY += speedY;
    if (posX < 0) {
      posX = posAmount - 1;
    } else if (posX > posAmount - 1) {
      posX = 0;
    }

    if (posY < 0) {
      posY = posAmount - 1;
    } else if (posY > posAmount - 1) {
      posY = 0;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, stage.width, stage.height);

    context.fillStyle = "red";
    context.fillRect(itemX * length, itemY * length, length, length);

    context.fillStyle = "gray";
    trail.forEach((item, index) => {
      context.fillRect(
        item.x * length,
        item.y * length,
        length - 1,
        length - 1
      );
      if (item.x === posX && item.y === posY) {
        speedX = speedY = 0;
        tail = 5;
        pointing = 0;
      }
    });

    trail.push({ x: posX, y: posY });
    while (trail.length > tail) {
      trail.shift();
    }

    if (itemX === posX && itemY === posY) {
      tail += 1;
      itemX = Math.floor(Math.random() * posAmount);
      itemY = Math.floor(Math.random() * posAmount);
      pointing += 1;
    }

    record = record > pointing ? record : pointing;

    document.getElementById("pointing").innerText = `Pontuação: ${pointing}`;
    document.getElementById("record").textContent = `Recorde: ${record}`;
  }

  function keyPush(event) {
    switch (event.keyCode) {
      case 37: //Left
        speedX = -speed;
        speedY = 0;
        break;
      case 38: //Up
        speedX = 0;
        speedY = -speed;
        break;
      case 39: //Right
        speedX = speed;
        speedY = 0;
        break;
      case 40: //Down
        speedX = 0;
        speedY = speed;
        break;
      default:
        break;
    }
  }
};
