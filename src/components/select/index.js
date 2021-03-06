import React, { memo } from 'react'
import { Select } from 'antd';
const { Option } = Select;

const Selects = memo(function Selects({ data, valKey,placeholder, valName, onChange, value, ...props }) {
  const handleCurrencyChange = (currency, option) => {
    onChange && onChange(currency, option);
  };

  return (
    <>
      <Select {...props} placeholder={placeholder} onChange={handleCurrencyChange} value={value} showSearch
        allowClear={true} filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {
          data.map((item, index) => (
            <Option value={item[valKey]} key={index}>{item[valName]}</Option>)
          )
        }
      </Select>
    </>
  )
})

Selects.defaultProps={
  placeholder:'请选择'
}

export default Selects;
