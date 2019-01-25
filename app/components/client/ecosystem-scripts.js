"use strict"; /* global document, localStorage */



document.addEventListener("click", event => {
  if (!event.target.dataset.action) return;

  event.preventDefault();
  const data = event.target.dataset;

  switch(data.action) {
    case "open":
      open(data.target);
      break;

    case "openSubmodule":
      openSubmodule(data.target);
      break;

    case "close":
      close();
      break;

    default:
      break;
  }
});



function open(ecosystemComponentClassName) {
  switch(true) {
    case (ecosystemComponentClassName === "lbrycrd"):
      resetClassesAndStorage();
      document.getElementsByClassName("lbrycrd")[0].classList.add("active");
      document.getElementsByClassName("chainquery")[0].className += " on red";
      document.getElementsByClassName("lighthouse")[0].className += " on red";
      document.getElementsByClassName("wallet")[0].className += " on red";

      localStorage.setItem("LBRY Ecosystem Overview • lbrycrd is open", true);
      break;



    case (ecosystemComponentClassName === "lbry"):
      resetClassesAndStorage();
      document.getElementsByClassName("lbry")[0].classList.add("active");
      document.getElementsByClassName("reflector")[0].className += " on blue";
      document.getElementsByClassName("wallet")[0].className += " on blue";

      localStorage.setItem("LBRY Ecosystem Overview • lbry is open", true);
      break;



    case (ecosystemComponentClassName === "applications"):
      resetClassesAndStorage();
      document.getElementsByClassName("applications")[0].classList.add("active");
      document.getElementsByClassName("chainquery")[0].className += " on green";
      document.getElementsByClassName("lighthouse")[0].className += " on green";

      localStorage.setItem("LBRY Ecosystem Overview • applications is open", true);
      break;



    default:
      break;
  }
}

function openSubmodule(ecosystemComponentClassName) {
  if (!document.getElementsByClassName(ecosystemComponentClassName)[0].classList.contains("on")) return; // do not activate unless submodule is ".on"

  document.querySelectorAll(".ecosystem__submodule").forEach(n => {
    n.classList.remove("active");
    n.classList.remove("on");
  });

  localStorage.removeItem("LBRY Ecosystem Overview • chainquery is open");
  localStorage.removeItem("LBRY Ecosystem Overview • wallet is open");
  localStorage.removeItem("LBRY Ecosystem Overview • lighthouse is open");
  localStorage.removeItem("LBRY Ecosystem Overview • reflector is open");

  document.querySelectorAll(".ecosystem__module").forEach(n => n.classList.remove("active"));

  switch(true) {
    case (ecosystemComponentClassName === "chainquery"):
      setSubmoduleConnectionTitle(ecosystemComponentClassName);

      document.getElementsByClassName("ecosystem")[0].className += " expand-left";
      document.getElementsByClassName(ecosystemComponentClassName)[0].className += " active";

      localStorage.setItem("LBRY Ecosystem Overview • chainquery is open", true);
      break;



    case (ecosystemComponentClassName === "wallet"):
      setSubmoduleConnectionTitle(ecosystemComponentClassName);

      document.getElementsByClassName("ecosystem")[0].className += " expand-left";
      document.getElementsByClassName(ecosystemComponentClassName)[0].className += " active";

      localStorage.setItem("LBRY Ecosystem Overview • wallet is open", true); // uh-oh
      break;



    case (ecosystemComponentClassName === "lighthouse"):
      setSubmoduleConnectionTitle(ecosystemComponentClassName);

      document.getElementsByClassName("ecosystem")[0].className += " expand-right";
      document.getElementsByClassName(ecosystemComponentClassName)[0].className += " active";

      localStorage.setItem("LBRY Ecosystem Overview • lighthouse is open", true);
      break;



    case (ecosystemComponentClassName === "reflector"):
      setSubmoduleConnectionTitle(ecosystemComponentClassName);

      document.getElementsByClassName("ecosystem")[0].className += " expand-right";
      document.getElementsByClassName(ecosystemComponentClassName)[0].className += " active";

      localStorage.setItem("LBRY Ecosystem Overview • reflector is open", true);
      break;



    default:
      break;
  }
}

function close() {
  resetClassesAndStorage();
}



const mainModules = [
  { applications: localStorage.getItem("LBRY Ecosystem Overview • applications is open") },
  { lbry: localStorage.getItem("LBRY Ecosystem Overview • lbry is open") },
  { lbrycrd: localStorage.getItem("LBRY Ecosystem Overview • lbrycrd is open") }
];

const subModules = [
  { chainquery: localStorage.getItem("LBRY Ecosystem Overview • chainquery is open") },
  { lighthouse: localStorage.getItem("LBRY Ecosystem Overview • lighthouse is open") },
  { reflector: localStorage.getItem("LBRY Ecosystem Overview • reflector is open") },
  { wallet: localStorage.getItem("LBRY Ecosystem Overview • wallet is open") }
];

for (const module of mainModules) {
  if (
    module[Object.keys(module)] === "true" &&
    document.querySelector(`.ecosystem__module.${Object.keys(module)} h2 span`)
  ) document.querySelector(`.ecosystem__module.${Object.keys(module)} h2 span`).click();
}

for (const subModule of subModules) {
  if (
    subModule[Object.keys(subModule)] === "true" &&
    document.querySelector(`.ecosystem__submodule.${Object.keys(subModule)} h3`)
  ) document.querySelector(`.ecosystem__submodule.${Object.keys(subModule)} h3`).click();
}



function setSubmoduleConnectionTitle(submoduleClass) {
  if (document.getElementsByClassName(submoduleClass)[0].classList.contains("blue")) {
    document.querySelector(`.${submoduleClass} .__parent.blue`).className += " active";
  }

  if (document.getElementsByClassName(submoduleClass)[0].classList.contains("green")) {
    document.querySelector(`.${submoduleClass} .__parent.green`).className += " active";
  }

  if (document.getElementsByClassName(submoduleClass)[0].classList.contains("red")) {
    document.querySelector(`.${submoduleClass} .__parent.red`).className += " active";
  }
}

function resetClassesAndStorage() {
  document.querySelectorAll(".ecosystem__submodule").forEach(n => {
    n.classList.remove("active");
    n.classList.remove("blue");
    n.classList.remove("green");
    n.classList.remove("on");
    n.classList.remove("red");
  });

  document.querySelectorAll(".ecosystem__module").forEach(n => n.classList.remove("active"));

  document.querySelectorAll(".ecosystem").forEach(n => {
    n.classList.remove("expand-left");
    n.classList.remove("expand-right");
  });

  document.querySelectorAll(".__parent").forEach(n => n.classList.remove("active"));

  // Clear localStorage
  localStorage.removeItem("LBRY Ecosystem Overview • lbrycrd is open");
  localStorage.removeItem("LBRY Ecosystem Overview • lbry is open");
  localStorage.removeItem("LBRY Ecosystem Overview • applications is open");
  localStorage.removeItem("LBRY Ecosystem Overview • chainquery is open");
  localStorage.removeItem("LBRY Ecosystem Overview • wallet is open");
  localStorage.removeItem("LBRY Ecosystem Overview • lighthouse is open");
  localStorage.removeItem("LBRY Ecosystem Overview • reflector is open");
}
