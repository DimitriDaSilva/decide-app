export type ButtonVariant = 'filled' | 'ghost';
export type ButtonColor = 'gradient' | 'blue' | 'secondary';

export function buttonDesign(
  variant: ButtonVariant,
  color: ButtonColor,
): string {
  if (color === 'gradient') {
    switch (variant) {
      case 'filled':
        return 'color-gradient hover:shadow-[0_0_60px] hover:shadow-primary transition-shadow';
      case 'ghost':
        throw new Error('Button: variation & color combination supported');
      default:
        const exhaustiveCheck: never = variant;
        throw new Error(exhaustiveCheck);
    }
  } else if (color === 'blue') {
    switch (variant) {
      case 'filled':
        throw new Error('Button: variation & color combination supported');
      case 'ghost':
        throw new Error('Button: variation & color combination supported');
      default:
        const exhaustiveCheck: never = variant;
        throw new Error(exhaustiveCheck);
    }
  } else {
    switch (variant) {
      case 'filled':
        throw new Error('Button: variation & color combination supported');
      case 'ghost':
        return 'border border-1 border-secondary hover:bg-secondary-hover transition-colors';
      default:
        const exhaustiveCheck: never = variant;
        throw new Error(exhaustiveCheck);
    }
  }
}
