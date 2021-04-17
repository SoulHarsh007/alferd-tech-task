import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * @function app
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @description Custom next.js app
 * @param {any} param0 - components and pageprops
 * @returns {any} - components and pageprops
 */
export default function app({Component, pageProps}) {
  return <Component {...pageProps} />;
}
