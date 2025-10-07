declare namespace ReCaptchaV2 {
  type Theme = 'light' | 'dark';
  type Type = 'image' | 'audio';
  type Size = 'compact' | 'normal' | 'invisible';
  type Badge = 'bottomright' | 'bottomleft' | 'inline';
  interface Parameters {
    [key: string]: any;
  }
  interface ReCaptcha {
    render: (container: string | HTMLElement, parameters: any) => number;
    reset: (opt_widget_id?: number) => void;
    getResponse: (opt_widget_id?: number) => string;
  }
}