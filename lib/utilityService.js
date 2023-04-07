const UtilityService = () => {
  function addCommaText(price) {
    let str = price.toString().replaceAll(",", "");
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function removeComma(text) {
    return text.toString().replaceAll(",", "");
  }

  function randomText(size, addCharacter) {
    const chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    let randomstring = "";
    if (addCharacter) {
      for (let i = 0; i < size; i++) {
        const rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
      }
    } else {
      for (let i = 0; i < size; i++) {
        randomstring += Math.floor(Math.random() * 10);
      }
    }
    return randomstring;
  }

  function getToDay() {
    let today = new Date();
    today.setHours(today.getHours() + 9);
    return today.toISOString().replace("T", " ").substring(0, 19);
  }

  function _getClassType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
  }

  function lengthZeroCheck(obj) {
    if (_getClassType(obj) === "Object") {
      if (Object.keys(obj).length === 0) return true;
      else return false;
    } else {
      if (obj.length === 0) return true;
      else return false;
    }
  }

  return {
    addCommaText: addCommaText,
    removeComma: removeComma,
    randomText: randomText,
    getToDay: getToDay,
    lengthZeroCheck: lengthZeroCheck,
  };
};

const utilityService = UtilityService();
export { utilityService };
