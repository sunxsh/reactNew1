import { useRef,useReducer,useMemo } from 'react'

/**
 * @description pagation分页值
 * @author lgf
 */

const usePagaTion = ()=>{

  const [, forceUpdate] = useReducer(v => v + 1, 0); // 强制hooks更新

  const pagaTion = useRef({ // useRef不收闭包的影响，不会将值默认进行重置
    page: 1,
    size: 20,
    sort: "desc"
  })

  const changePgVal = (page,size)=>{
    pagaTion.current = {
      ...pagaTion.current,
      page,
      size
    }
  }

  return useMemo(()=>{
   return {
    forceUpdate,
    pagaTion,
    changePgVal
   }
  },[pagaTion.current])
}

export default usePagaTion;
