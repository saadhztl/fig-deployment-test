export const useColorMapper = () => {
  const bgColor = (color?: string) => {
    if (color === 'cyan') {
      return 'bg-cyan';
    } else if (color === 'pink') {
      return 'bg-pink';
    } else if (color === 'orange') {
      return 'bg-orange-bright';
    } else if (color === 'darkOrange') {
      return 'bg-orange';
    } else if (color === 'green') {
      return 'bg-green';
    } else if (color === 'darkGreen') {
      return 'bg-green-dark';
    } else if (color === 'black') {
      return 'bg-black';
    } else if (color === 'white') {
      return 'bg-white';
    } else if (color === 'transparent') {
      return 'bg-transparent';
    } else {
      return 'bg-light';
    }
  };
  const borderColor = (color?: string) => {
    if (color === 'cyan') {
      return 'border-cyan';
    } else if (color === 'pink') {
      return 'border-pink';
    } else if (color === 'orange') {
      return 'border-orange-bright';
    } else if (color === 'darkOrange') {
      return 'border-orange';
    } else if (color === 'green') {
      return 'border-green';
    } else if (color === 'darkGreen') {
      return 'border-green-dark';
    } else if (color === 'black') {
      return 'border-black';
    } else if (color === 'white') {
      return 'border-white';
    } else {
      return 'border-light';
    }
  };

  const textColor = (color?: string, isGlowing?: boolean) => {
    if (color === 'cyan' && isGlowing) {
      return 'glowingText cyan';
    } else if (color === 'pink' && isGlowing) {
      return 'glowingText pink';
    } else if (color === 'orange' && isGlowing) {
      return 'glowingText orange';
    } else if (color === 'green' && isGlowing) {
      return 'glowingText green';
    } else if (color === 'cyan') {
      return 'text-cyan';
    } else if (color === 'pink') {
      return 'text-pink';
    } else if (color === 'orange') {
      return 'text-orange-bright';
    } else if (color === 'darkOrange') {
      return 'text-orange';
    } else if (color === 'green') {
      return 'text-green';
    } else if (color === 'darkGreen') {
      return 'text-green-dark';
    } else if (color === 'black') {
      return 'text-black';
    } else if (color === 'white') {
      return 'text-white';
    } else {
      return 'text-light';
    }
  };

  const textColorHover = (color?: string) => {
    return `transition-all duration-300 hover:${textColor(color)}`;
  };
  const borderColorHover = (color?: string) => {
    return `transition-all duration-300 hover:${borderColor(color)}`;
  };
  const bgColorHover = (color?: string) => {
    return `transition-all duration-300 hover:${bgColor(color)}`;
  };

  return {
    bgColor,
    borderColor,
    textColor,
    textColorHover,
    borderColorHover,
    bgColorHover
  }
}