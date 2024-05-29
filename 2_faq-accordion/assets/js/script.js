const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {
  const accordionToggles = accordion.querySelectorAll(
    "[aria-controls='accordion']"
  );

  accordionToggles.forEach((accordionToggle) => {
    const handleAccordionActive = () => {
      const plusIconSrc = "./assets/images/icon-plus.svg";
      const minusIconSrc = "./assets/images/icon-minus.svg";

      accordionToggles.forEach((item) => {
        if (item !== accordionToggle) {
          item.parentElement.setAttribute("aria-expanded", "false");
          item.querySelector("img").src = plusIconSrc;
        }
      });

      const isExpanded =
        accordionToggle.parentElement.getAttribute("aria-expanded") === "true"
          ? "false"
          : "true";

      accordionToggle.parentElement.setAttribute("aria-expanded", isExpanded);
      accordionToggle.querySelector("img").src =
        accordionToggle.parentElement.hasAttribute("aria-expanded") &&
        isExpanded === "true"
          ? minusIconSrc
          : plusIconSrc;
    };

    accordionToggle.addEventListener("click", handleAccordionActive);
    accordionToggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleAccordionActive();
      }
    });
  });
});

const handleArrowKey = (e) => {
  if (e.key === "Escape") {
    document.activeElement.blur();
  }

  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    const accordionTitles = document.querySelectorAll(
      "[aria-controls='accordion']"
    );
    const activeTitle = document.querySelector(
      "[aria-controls='accordion']:focus"
    );
    const activeTitleIndex = Array.from(accordionTitles).indexOf(activeTitle);

    if (e.key === "ArrowDown") {
      if (activeTitleIndex < accordionTitles.length - 1) {
        accordionTitles[activeTitleIndex + 1].focus();
        accordionTitles[activeTitleIndex + 1].click();
      } else {
        accordionTitles[0].focus();
        accordionTitles[0].click();
      }
    } else {
      if (activeTitleIndex > 0) {
        accordionTitles[activeTitleIndex - 1].focus();
        accordionTitles[activeTitleIndex - 1].click();
      } else {
        accordionTitles[accordionTitles.length - 1].focus();
        accordionTitles[accordionTitles.length - 1].click();
      }
    }
  }
};

document.addEventListener("keydown", handleArrowKey);
