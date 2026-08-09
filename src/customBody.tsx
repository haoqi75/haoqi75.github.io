// src/customBody.tsx
import React from 'react';
import { createPortal } from 'react-dom';

export const CustomBody = () => {
  return createPortal(
    <div id="custom-body-bottom">
      {/* 在这里放任何你想要添加到 <body> 底部的内容 */}
      {/* <div style={{ textAlign: 'center', padding: '10px', background: 'rgba(0,0,0,0.05)', marginTop: '20px' }}>
        ⚡ 你好世界
      </div>*/}
      
      {/* 示例：插入统计脚本（如 Google Analytics） */}
      {/*<script dangerouslySetInnerHTML={{
        __html: `
          console.log('自定义底部脚本已执行');
          // 这里可以放第三方统计代码
        `
      }} />*/}
    </div>,
    document.body
  );
};