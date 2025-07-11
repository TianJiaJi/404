// 404错误页面交互脚本

/**
 * 创建背景粒子动画
 * 生成指定数量的粒子元素并添加随机动画效果
 */
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 设置随机位置和动画延迟
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

/**
 * 初始化鼠标跟随效果
 * 让主容器轻微跟随鼠标移动，增强交互感
 */
function initMouseFollowEffect() {
    document.addEventListener('mousemove', (e) => {
        const cursor = document.querySelector('.container');
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        cursor.style.transform = `translate(${x}px, ${y}px)`;
    });
}

/**
 * 初始化按钮波纹效果
 * 为所有按钮添加点击时的水波纹动画
 */
function initButtonRippleEffect() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // 设置波纹样式
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            // 动画结束后移除波纹元素
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * 添加波纹动画样式到页面
 * 动态创建CSS动画规则
 */
function addRippleAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * 页面加载完成后的初始化
 * 设置页面透明度并显示内容
 */
function initPageLoadAnimation() {
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
}

/**
 * 主初始化函数
 * 当DOM加载完成后执行所有初始化操作
 */
function init() {
    // 创建背景粒子
    createParticles();
    
    // 初始化交互效果
    initMouseFollowEffect();
    initButtonRippleEffect();
    
    // 添加动画样式
    addRippleAnimationStyles();
    
    // 初始化页面加载动画
    initPageLoadAnimation();
}

// 当DOM内容加载完成后执行初始化
document.addEventListener('DOMContentLoaded', init);

// 导出函数供外部使用（如果需要）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createParticles,
        initMouseFollowEffect,
        initButtonRippleEffect,
        init
    };
}