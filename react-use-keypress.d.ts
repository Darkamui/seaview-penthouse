declare module 'react-use-keypress' {
  export default function useKeypress(
    keys: string | string[],
    handler: (event: KeyboardEvent) => void,
    options?: {
      target?: HTMLElement | Window;
      eventOptions?: AddEventListenerOptions;
    }
  ): void;
}
