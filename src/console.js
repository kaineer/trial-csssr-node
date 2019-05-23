export const createConsole = () => {
  const $el = document.querySelector(".console");

  return {
    log(message) {
      const p = document.createElement("p");
      p.textContent = message;
      p.className = "console__log";
      $el.appendChild(p);
    }
  };
};
