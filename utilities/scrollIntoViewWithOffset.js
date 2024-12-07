const scrollIntoViewWithOffset = ({ id, offset }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (!element) {
        reject('Element not found');
      }
      const targetPosition = element?.getBoundingClientRect()?.top + window.pageYOffset - offset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 300; // duration of the scroll in milliseconds
      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        window.scrollTo(0, startPosition + distance * progress);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          resolve();
        }
      }

      requestAnimationFrame(animation);
    });
    }, 150 );
};

export default scrollIntoViewWithOffset;
