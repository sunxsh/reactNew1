import { useCallback, useState } from 'react';

/**
 *
 * @description 主要解决react中hooks中的useState钩子不能多个参数合并的问题
 * @param {Object} initialState  传入的值
 * @author lgf
 */
const useSetState = ( initialState= { page: 1, size: 20, sort: 'desc' } ) => {

  const [state, set] = useState(initialState);

  const setState = useCallback(
    patch => {
      set(prevState => Object.assign({}, prevState, patch instanceof Function ? patch(prevState) : patch));
    },
    [set]
  );

  return [state, setState]
};

export default useSetState;
