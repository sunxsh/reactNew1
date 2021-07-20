import { useEffect } from 'react'
import { requestCode } from '@/utils/varbile'
import { confirm } from '@/utils/function'
import useSetState from '@/hooks/useSetState'

/**
 * @description 删除功能
 * @param {Promise} interfaces 接口对象
 * @param {Function} successCallBack 成功的回调
 * @param {Stringf} text 弹窗的文本
 * @param {Object} data 传入的值
 * @author lgf
 */

const useDel = (interfaces, successCallBack,text='确定要删除吗？', data = {}) => {
  const [receipt, setReceipt] = useSetState(data);

  useEffect(() => {
    if (receipt[receipt.idKey]) { // idKey：表示要传入的id值得名称
      confirm(async () => {
        let res = await interfaces({ [receipt.idKey]:receipt[receipt.idKey], ...receipt });
        if (res.code === requestCode.successCode) { successCallBack && successCallBack(); }
      },text);
    }
    return () => { setReceipt({}) }
  }, [receipt[receipt.idKey], receipt.listen]); // receipt.listen,防止重复点击没效果

  return [setReceipt];
}
export default useDel;
