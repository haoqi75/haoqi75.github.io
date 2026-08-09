// src/customHead.tsx
import { Helmet } from 'react-helmet-async';

export const CustomHead = () => {
  return (
    <Helmet>
      {/* 在这里插入任何 <head> 内的标签 */}
      <meta name="description" content="我的个人 GitHub 主页" />
      <meta name="keywords" content="GitHub, React, 个人主页" />
      {/* <link rel="icon" type="image/svg+xml" href="/vite.svg" />*/}
      
      {/* 示例：插入自定义脚本（放在 head 底部） */}
      {/* <script type="text/javascript">
        {`
          console.log('自定义头部脚本已加载');
        `}
      </script>*/}
      
      {/* 示例：插入外部 CSS */}
      {/*<link rel="stylesheet" href="https://cdn.example.com/custom.css" />*/}
    </Helmet>
  );
};