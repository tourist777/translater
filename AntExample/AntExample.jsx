import React from 'react'

import { SearchOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';

export default function AntExample() {
  return (
    <Space direction="vertical">
    <Space wrap>      
      <Button type="primary" icon={<SearchOutlined />}>
        Search
      </Button>      
    </Space>    
  </Space>  
  )
}
