<template>
  <svg class="decoration-svg" xmlns="http://www.w3.org/2000/svg">
    <!-- 左上角十字瞄准线 -->
    <g class="crosshair" transform="translate(100, 100)">
      <line x1="-20" y1="0" x2="20" y2="0" stroke="rgba(97, 177, 214, 0.3)" stroke-width="1"/>
      <line x1="0" y1="-20" x2="0" y2="20" stroke="rgba(97, 177, 214, 0.3)" stroke-width="1"/>
      <circle cx="0" cy="0" r="15" fill="none" stroke="rgba(97, 177, 214, 0.3)" stroke-width="1"/>
    </g>
    
    <!-- 右下角动态三角形 -->
    <g class="triangle-deco" transform="translate(-100, -100)">
      <polygon points="0,0 30,0 15,25" fill="none" stroke="rgba(97, 177, 214, 0.4)" stroke-width="1" class="triangle-1"/>
      <polygon points="0,0 30,0 15,25" fill="none" stroke="rgba(97, 177, 214, 0.2)" stroke-width="1" class="triangle-2" transform="scale(1.3)"/>
    </g>
    
    <!-- 装饰性连接线（从中心到边缘） -->
    <line class="connect-line" x1="50%" y1="50%" x2="95%" y2="20%" stroke="rgba(97, 177, 214, 0.15)" stroke-width="1" stroke-dasharray="5,5"/>
    <circle class="pulse-dot" cx="95%" cy="20%" r="3" fill="rgba(97, 177, 214, 0.6)"/>
  </svg>
</template>

<style scoped>
.decoration-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
  overflow: visible;
}

.triangle-deco {
  /* 定位需要配合父级容器的大小，这里假设父级是全屏 */
  /* 如果svg是viewBox="0 0 100% 100%"可能会有问题，通常我们在外部CSS控制svg大小，内部用百分比或绝对坐标 */
  /* 这里的 transform translate 是基于 SVG 坐标系的 */
}

/* 使用 CSS transform 将右下角元素定位到角落 */
/* 由于 SVG 内部定位受限，我们通过 JS 或外部 CSS 辅助定位有点难完全解耦 */
/* 这里保持原样结构，但注意 .triangle-deco 需要在svg坐标系右下角 */
/* 原代码中并没有看到对 triangle-deco 的 x, y 设置，只看到了 transform: translate(-100, -100) */
/* 推测原代码可能在 CSS 里有对 .decoration-svg 的子元素做定位，或者我漏看了 */
/* 搜索一下原 CSS 中关于 decoration-svg 的部分 */
</style>
