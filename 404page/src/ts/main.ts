// 示例：控制台提示，可扩展交互（如按钮点击统计等）
document.addEventListener('DOMContentLoaded', () => {
    console.log('✨ 404 页面已加载 — 欢迎回来！');

    // 可选：为返回按钮添加平滑行为
    const backLinks = document.querySelectorAll('a[onclick*="history.back"]');
    backLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            history.back();
        });
    });

    // 简单彩蛋：点击幽灵切换心情（演示 TS 逻辑）
    const ghost = document.querySelector('.ghost');
    if (ghost) {
        ghost.addEventListener('click', () => {
            const smile = ghost.querySelector('.ghost-smile') as HTMLElement;
            if (smile) {
                const current = smile.style.borderBottomColor;
                smile.style.borderBottomColor = current === 'rgba(13, 17, 23, 0.6)' 
                    ? '#f0f6fc' 
                    : 'rgba(13, 17, 23, 0.6)';
            }
        });
    }
});