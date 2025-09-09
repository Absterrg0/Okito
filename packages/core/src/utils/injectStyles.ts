import { OKITO_SDK_STYLES } from '../styles.inline';

const STYLE_ELEMENT_ID = 'okito-sdk-styles';

export const injectSdkStyles = (): void => {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ELEMENT_ID)) return;

  const styleElement = document.createElement('style');
  styleElement.id = STYLE_ELEMENT_ID;
  styleElement.textContent = OKITO_SDK_STYLES;
  document.head.appendChild(styleElement);
};


