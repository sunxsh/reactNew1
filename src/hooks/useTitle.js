import { useRef, useEffect } from 'react';

const DEFAULT_USE_TITLE_OPTIONS = {
  restoreOnUnmount: false,
};

/**
 * @description 修改和获取地址栏的标题
 * @param {String} title
 * @param {Boolean} options
 * @author lgf
 */

const useTitle = (title, options = DEFAULT_USE_TITLE_OPTIONS) => {
  const prevTitleRef = useRef(document.title);

  document.title = title;

  useEffect(() => {
    if (options && options.restoreOnUnmount) {
      return () => {
        document.title = prevTitleRef.current;
      };
    } else {
      return;
    }
  }, []);

}

export default typeof document !== 'undefined' && useTitle;
