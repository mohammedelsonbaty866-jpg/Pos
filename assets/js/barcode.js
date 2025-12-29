let buffer = "";

document.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    searchProduct(buffer);
    new Audio("assets/sounds/beep.mp3").play();
    buffer = "";
  } else {
    buffer += e.key;
  }
});
