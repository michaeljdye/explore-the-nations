/**
 * @description create script tag and add it to document
 * @param { string } url - script tag src url
 */
export default url => {
  const index = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
};
