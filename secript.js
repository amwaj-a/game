// -----Word Api------------
// let url = "https://random-word-api.herokuapp.com/all";
let endPoint = 3;
let word = document.querySelector("#show");
let catchWord = document.querySelector("#catch");
let HowLevel = document.getElementById("level");
let levelWin = document.getElementById("levelWin");
let hiddWord = 60000;
let person = document.querySelector(".box");
let navBar = document.querySelector(".score");
let count = 0;
let level = 1;
let numberattempts = 3;
let Numberattempts = document.querySelector("#Numberattempts");
let attempts = document.querySelector("#attempts");
let modal = document.querySelector(".modal");
let overlay = document.querySelector(".overlay");
let modalWin = document.querySelector(".modalWin");
let overlayWin = document.querySelector(".overlayWin");
let score = document.querySelector("#score");
let canvas = document.querySelector("#canvas");
let letter = [
  "r",
  "e",
  "w",
  "q",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "l",
  "k",
  "j",
  "h",
  "g",
  "f",
  "d",
  "s",
  "a",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
];
let leve1Fall = 2000;
let comp = [];
let result = [];
let increase = 0;
let speed = 5;
let personSizeFall = 14;
let personSize = 8;
// -------------------------- fetch API ------------------------
score.innerText = 0;
async function words() {
  HowLevel.innerHTML = `Level ${endPoint - 2}`;
  levelWin.innerHTML = `Level ${endPoint - 1}`;
  let data = await fetch(
    `https://random-word-api.herokuapp.com//word?length=${endPoint}`
  );
  let res = await data.json();
  res.forEach((e) => (word.innerText = e));

  console.log(word.textContent);
  word.textContent.split("").forEach((e) => {
    result.push(e);

    comp.push("_");
  });
  console.log(result);
  console.log(comp);
  catchWord.innerText = comp.join(" ");
}
words();
let interval = setInterval(letters, leve1Fall);
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

// ----------------------------------------------Letters--------------------
let container = document.getElementById("content");
function letters() {
  let lett = document.createElement("h3");
  let lett2 = document.createElement("h3");
  lett.classList.add("letter");
  lett2.classList.add("letter");
  lett2.textContent = letter[Math.floor(Math.random() * letter.length)];
  lett2.style.left = Math.random() * width - 100 + "px";
  lett2.style.top = "-20px";
  lett.textContent = letter[Math.floor(Math.random() * letter.length)];
  lett.style.left = Math.random() * width - 100 + "px";
  lett.style.top = "-20px";
  container.appendChild(lett);
  container.appendChild(lett2);

  gsap.to(lett, {
    duration: speed,
    top: height,

    onUpdate: () => {
      if (isCatch(lett, container)) {
        gsap.killTweensOf(lett);
        container.removeChild(lett);

        setTimeout(() => {
          //   navBar.style.color = "red";
          //   person.style.width = "10vw";
          person.style.width = personSize + "vw";

          person.src = "carecter.png";
        }, 990);
      }
    },
  });

  gsap.to(lett2, {
    duration: speed,
    top: height,

    onUpdate: () => {
      if (isCatch(lett2, container)) {
        gsap.killTweensOf(lett2);
        container.removeChild(lett2);

        setTimeout(() => {
          //   navBar.style.color = "red";
          //   person.style.width = "10vw";
          person.style.width = personSize + "vw";

          person.src = "carecter.png";
        }, 990);
      }
    },
  });
}
function isCatch(lett, parents = "") {
  // attempts.style.color = "black";

  Numberattempts.innerText = numberattempts;

  let letter1 = lett.getBoundingClientRect();
  let person1 = person.getBoundingClientRect();
  if (
    !(
      person1.right < letter1.left ||
      person1.left > letter1.right ||
      person1.bottom < letter1.top ||
      person1.top > letter1.bottom
    )
  ) {
    if (result.includes(lett.textContent)) {
      result.forEach((e, i) => {
        if (e == lett.textContent) {
          comp.splice(i, 1, lett.textContent);
        }
      });
      parents.removeChild(lett);
      // ----------------------------------Win-------------------------
      setTimeout(() => {
        if (JSON.stringify(comp) === JSON.stringify(result)) {
          ++level;
          increase += 100;

          numberattempts = 3;
          leve1Fall = Number(leve1Fall) - 500;
          --speed;
          score.innerHTML = increase;
          modalWin.classList.remove("hiddenWin");
          overlayWin.classList.remove("hiddenWin");
          setTimeout(() => {
            word.innerText = " ";
            comp = [];
            result = [];
            endPoint == 8 ? (endPoint = 5) : (endPoint = endPoint + 1);
            hiddWord = hiddWord - 1000;
            modalWin.classList.add("hiddenWin");
            overlayWin.classList.add("hiddenWin");
            // alert("Your Win!! \n Next Level " + level);
            words();
          }, 1000);
          // clearInterval(interval);

          // console.log("speed5 " + speed);
          // console.log("level1 " + level);
          // console.log("levelFa2000 " + leve1Fall);
          // console.log("endpoint" + endPoint);
        }
      }, 1000);

      catchWord.innerText = comp.join(" ");
    }

    // ---------------------------letter wrong---------
    else {
      person.src = "carecterFall.png";
      person.style.width = personSizeFall + "vw";
      --numberattempts;
      attempts.style.color = "red";
      micron.getEle("#me").interaction("fade").duration(".9");
      micron.getEle("#attempts").interaction("fade").duration(".9");
      setTimeout(() => {
        attempts.style.color = "black";
      }, 1000);

      // ------------lost--------------------------
      if (numberattempts <= 0) {
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      return true;
    }
  }
}

// ----------------- move-------------------
function move(arrow) {
  person.style.width = personSize + "vw";
  //   console.log(count);
  if (arrow == "ArrowRight") {
    person.src = "carecter.png";

    count >= width - 100 ? (count = width - 100) : (count += 100);

    gsap.to(
      ".box",

      { x: count, duration: 1 }
    );
  } else if (arrow == "ArrowLeft") {
    person.src = "carecterLeft.png";

    count < 100 ? (count = 0) : (count -= 100);

    gsap.to(".box", { x: count, duration: 1 });
  }
}
window.addEventListener("keydown", down);
function down(params) {
  person.style.width = personSize + "vw";
  //   console.log(count);
  if (params.key == "ArrowRight") {
    person.src = "carecter.png";

    count >= width - 100 ? (count = width - 100) : (count += 100);

    gsap.to(
      ".box",

      { x: count, duration: 1 }
    );
  } else if (params.key == "ArrowLeft") {
    person.src = "carecterLeft.png";

    count < 100 ? (count = 0) : (count -= 100);

    gsap.to(".box", { x: count, duration: 1 });
  }
}

// ---------Word hidden---------------------------------
setTimeout(
  () => {
    word.style.display = "none";
  },
  hiddWord == 0 ? (hiddWord = 1000) : (hiddWord = hiddWord)
);

function myFunction(media) {
  if (media.matches) {
    personSize = 20;
    personSizeFall = 30;
  } else {
    personSize = 8;
    personSizeFall = 14;
  }
}

let media = window.matchMedia("(max-width: 700px)");

myFunction(media);

media.addEventListener("change", function () {
  myFunction(media);
});
