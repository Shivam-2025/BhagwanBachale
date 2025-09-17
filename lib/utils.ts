import { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

type NamedStyles = ViewStyle | TextStyle | ImageStyle;

/**
 * Combines multiple style objects or arrays into one flattened array.
 * Use this instead of className-based cn() from web.
 */
export function cn(
  ...inputs: Array<StyleProp<NamedStyles> | false | null | undefined>
): StyleProp<NamedStyles> {
  return inputs.filter(Boolean);
}
