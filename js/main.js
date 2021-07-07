// Required Variables
let randomLst = [],
  randomColors = [];

const {
  buttonLst,
  blurButton,
  statusColors,
  statusLst,
  paginationButtons,
  nextButtons,
  backButtons,
  editButtons,
  wizardLst,
  customShowData,
  paginationNav,
  dpiaSteps,
  yesButtons,
  noButtons
} = {
  buttonLst: document.querySelectorAll("[data-toggle]"),
  blurButton: document.querySelectorAll("[data-blur]"),
  statusColors: ["#f1ca72", "#b56396", "#26a8af", "#d94154", "#46b469"],
  statusLst: document.querySelectorAll(".status"),
  paginationButtons: document.querySelectorAll("[data-pagination]"),
  nextButtons: document.querySelectorAll("[data-next]"),
  backButtons: document.querySelectorAll("[data-back]"),
  editButtons: document.querySelectorAll("[data-edit]"),
  wizardLst: document.querySelectorAll(".wizard"),
  customShowData: document.querySelectorAll("[data-customshow]"),
  paginationNav: document.querySelectorAll("[data-paginationnav]"),
  dpiaSteps: document.querySelectorAll(".dpia-steps"),
  yesButtons: document.querySelectorAll("[data-yes]"),
  noButtons: document.querySelectorAll("[data-no]")
}

// Add | Remove class by click
function toggleShow(item) {
  item.addEventListener("click", (e) => {
    document
      .getElementById(item.dataset.target)
      .classList.toggle(item.dataset.toggle);
    // Add overlay
    if (item.dataset.overlay) {
      document
        .getElementById(item.dataset.overlay)
        .classList.toggle(item.dataset.toggle);
      document.body.classList.toggle("stopScroll");
    }
  });
}
buttonLst.forEach((item) => {
  toggleShow(item);
});

// Remove class by blur
blurButton.forEach((item) => {
  item.onblur = () => {
    if (
      document
        .getElementById(item.dataset.target)
        .classList.contains(item.dataset.blur)
    ) {
      document
        .getElementById(item.dataset.target)
        .classList.remove(item.dataset.blur);
    }
  };
});

// Generate random number (within 0, 4)
function generateRandom() {
  return Math.floor(Math.random() * statusColors.length);
}
// generate random number list
function repeatRandom() {
  while (randomLst.length < statusLst.length) {
    let randomNumber = generateRandom();
    if (!randomLst.includes(randomNumber)) {
      randomLst.push(randomNumber);
    }
  }
  for (let i = 0; i < randomLst.length; i += 1) {
    randomColors.push(statusColors[randomLst[i]]);
  }
  return randomColors;
}
// Add color to status buttons
function setColors() {
  repeatRandom();
  for (let i = 0; i < statusLst.length; i += 1) {
    statusLst[i].style.backgroundColor = `${randomColors[i]}`;
  }
}
setColors();

// Fadeout Function
function fadeOut(el, duration = 500) {
  let updated = 1;
  let kickOut = setInterval(function() {
    el.style.opacity = updated;
    updated -= 100 / duration;
    if (updated < 0) {
      clearInterval(kickOut);
      updated = 0;
      el.style.opacity = updated;
      if (el.classList.contains("d-block")) {
        el.classList.replace("d-block", "d-none");
      } else {
        el.classList.add("d-none");
      }
    }
  }, 100);
}

// Custom Show Function
function customShow(actionElData) {
  customShowData.forEach(el => {
    if (actionElData === el.dataset.customshow) {
      if (el.classList.contains("d-none")) {
        setTimeout(() => {
          el.classList.replace("d-none", "d-block");
          el.style.opacity = 1;
        }, 600);
      } else {
        setTimeout(() => {
          el.classList.add("d-block");
          el.style.opacity = 1;
        }, 600);
      }
    } else {
      fadeOut(el);
    }
  })
}

// Pagination Nav
paginationNav.forEach(nav => {
  nav.addEventListener("click", () => {
    if (document.contains(document.querySelector(".step-title"))) {
      if (document.querySelector(".step-title").classList.contains("invisible")) {
        document.querySelector(".step-title").classList.replace("invisible", "visible");
      }
    }
    paginationNav.forEach(item => {
      if (nav === item) {
        nav.classList.add("active");
      } else {
        if(item.classList.contains("active")) {
          item.classList.remove("active");
        }
      }
    })
    dpiaSteps.forEach(step => {
      if (step.getAttribute("id") === nav.dataset.paginationnav) {
        if (step.classList.contains("d-none")) {
          setTimeout(() => {step.classList.replace("d-none", "d-block");}, 600);
          step.style.opacity = 1;
        } else {
          setTimeout(() => {step.classList.add("d-block");}, 600);
          step.style.opacity = 1;
        }
      } else {
        fadeOut(step);
      }
    })
    customShow(nav.dataset.paginationnav);
  })
})

// Pagination Bullets
paginationButtons.forEach((button, index) => {
  const thisEle = document.getElementById(button.dataset.pagination);
  button.addEventListener("click", () => {
    let i = index + 1;
    while (i < paginationButtons.length) {
      if (paginationButtons[i].classList.contains("active")) {
        paginationButtons[i].classList.remove("active");
      }
      i += 1;
    }
    wizardLst.forEach(el => {
      fadeOut(el);
    })
    setTimeout(() => {
      if (thisEle.classList.contains("d-none")) {
        thisEle.classList.replace("d-none", "d-block");
      } else {
        thisEle.classList.add("d-block");
      }
      thisEle.style.opacity = 1;
    }, 600)
    customShow(button.dataset.pagination);
  })
})

// Next Buttons
nextButtons.forEach(button => {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    const buttonBullet = document.querySelector(`[data-pagination=${button.dataset.next}]`);
    const parentEl = document.getElementById(button.dataset.next);
    buttonBullet.classList.add("active");
    fadeOut(button.parentElement);
    setTimeout(() => {
      if (parentEl.classList.contains("d-none")) {
        parentEl.classList.replace("d-none", "d-block");
      } else {
        parentEl.classList.add("d-block");
      }
      parentEl.style.opacity = 1;
    }, 600);
    customShow(button.dataset.next);
  })
})

// Back Buttons
backButtons.forEach(button => {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    const buttonBullet = document.querySelector(`[data-pagination=${button.dataset.back}]`).nextElementSibling;
    const parentEl = document.getElementById(button.dataset.back);
    if (buttonBullet.classList.contains("active")) {
      buttonBullet.classList.remove("active");
    }
    fadeOut(button.parentElement);
    setTimeout(() => {
      if (parentEl.classList.contains("d-none")) {
        parentEl.classList.replace("d-none", "d-block");
      } else {
        parentEl.classList.add("d-block");
      }
      parentEl.style.opacity = 1
    }, 600);
    customShow(button.dataset.back);
  })
})

// Edit Buttons
editButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    fadeOut(wizardLst[wizardLst.length - 1]);
    let el = document.getElementById(button.dataset.edit);
    let i = index + 1;
    setTimeout(() => {
      if (el.classList.contains("d-none")) {
        el.classList.replace("d-none", "d-block");
      } else {
        el.classList.add("d-block");
      }
      el.style.opacity = 1;
    }, 600);
    while (i < paginationButtons.length) {
      if (paginationButtons[i].classList.contains("active")) {
        paginationButtons[i].classList.remove("active");
      }
      i += 1;
    }
    customShow(button.dataset.edit);
  })
})

// DPIA Yes Buttons
yesButtons.forEach(button => {
  button.addEventListener("click", () => {
    const reqButton = document.getElementById(button.dataset.yes);
    const changeInnerText = document.getElementById("changeInner");
    if (reqButton.hasAttribute("disabled")) {
      reqButton.removeAttribute("disabled");
      reqButton.classList.add("button-primary");
      reqButton.textContent = "Conduct a DPIA";
    }
    reqButton.parentElement.previousElementSibling.firstElementChild.textContent = "high";
    reqButton.parentElement.previousElementSibling.firstElementChild.classList.replace("low", "bg-danger");
  })
})

// DPIA No Buttons
noButtons.forEach(button => {
  button.addEventListener("click", () => {
    const reqButton = document.getElementById(button.dataset.no);
    if (!reqButton.hasAttribute("disabled")) {
      reqButton.setAttribute("disabled", "true");
      reqButton.classList.remove("button-primary");
      reqButton.textContent = "No action required";
    }
    reqButton.parentElement.previousElementSibling.firstElementChild.textContent = "low";
    reqButton.parentElement.previousElementSibling.firstElementChild.classList.replace("bg-danger", "low");
  })
})