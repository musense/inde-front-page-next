export default function debounce(func, delay = 250) {
    let timer = null;
  
    return function (...args) {
      let context = this;
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay)
    }
  }