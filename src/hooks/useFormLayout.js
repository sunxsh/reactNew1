import useSetState from './useSetState'

/**
 * @description ant-design中的from组件布局,详细请查看antd-design
 * @param {Number} labelColSm
 * @param {Number} wrapperColSm
 * @param {Number} labelColXs
 * @param {Number} wrapperColXs
 * @author lgf
 */

const useModelLayout = (labelColSm = 6, wrapperColSm = 18, labelColXs = 24, wrapperColXs = 24) => {
  const formItemLayouts = {
    labelCol: {
      xs: { span: labelColXs },
      sm: { span: labelColSm },
    },
    wrapperCol: {
      xs: { span: wrapperColXs },
      sm: { span: wrapperColSm },
    },
  };

  const [formItemLayout] = useSetState(formItemLayouts);

  return [formItemLayout];
}
export default useModelLayout
