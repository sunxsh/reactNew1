import React, { memo } from 'react'
import { Pagination } from 'antd';
import { backTopAnimate } from '@/utils/function'

const Pagation = memo(function Pagation({ pageSizeOptions, defaultPageSize,page,size,current,pageSize, total = 0, onChanges,defaultCurrent, ...props }) {
  const Change = (page, pageSize) => {
    onChanges && onChanges(page, pageSize);
    // backTopAnimate(document.querySelector('#content'));
  }
  return (
    <>
      {total ? <Pagination {...props} showSizeChanger showQuickJumper total={total} showTotal={total => `共 ${total} 条`}
        onChange={Change} onShowSizeChange={Change} pageSizeOptions={pageSizeOptions}
         current={current} pageSize={pageSize}
        defaultPageSize={defaultPageSize} style={{ marginTop: '20px' }} defaultCurrent={defaultCurrent} /> : null}
    </>
  )
})

Pagation.defaultProps = {
  current:1,
  pageSize:20,
  defaultCurrent:1,
  defaultPageSize: 20,
  pageSizeOptions: ['20', '50', '100', '200']
}

export default Pagation;
