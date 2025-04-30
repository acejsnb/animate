// utils
// export const wrapChars = (str: string) => str.replace(/./g, '<span>$&</span>');
export const wrapChars = (str: string) => {
  return str.split('').map((char: string) => {
    if (char === ' ') return '<span>&nbsp;</span>';
    return `<span>${char}</span>`;
  }).join('');
};

// 鼠标位置 left-top left-middle left-bottom
export const getPlace = (e: MouseEvent) => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  let area = '';

  // 水平方向判断
  if (e.clientX < w / 3) {
    area += 'left';
  } else if (e.clientX < (w / 3) * 2) {
    area += 'center';
  } else {
    area += 'right';
  }

  // 垂直方向判断
  if (e.clientY < h / 3) {
    area += '-top';
  } else if (e.clientY < (h / 3) * 2) {
    area += '-middle';
  } else {
    area += '-bottom';
  }

  return area;
};
