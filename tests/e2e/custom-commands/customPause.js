module.exports = class CustomPause {
  command(ms) {
    if (!ms) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }
};
