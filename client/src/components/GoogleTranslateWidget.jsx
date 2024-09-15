import { useEffect } from 'react';

function GoogleTranslateWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        autoDisplay: false
      }, 'google_translate_element');
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="google_translate_element"></div>
  );
}

export default GoogleTranslateWidget;
