<template>
  <div class="custom-cursor" ref="cursorRef">
    <img :src="cursorSvg" alt="cursor" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import cursorSvg from '@/assets/cursor.svg';

const cursorRef = ref(null);

const updateCursorPosition = (e) => {
  if (cursorRef.value) {
    cursorRef.value.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  }
};

onMounted(() => {
  window.addEventListener('mousemove', updateCursorPosition);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', updateCursorPosition);
});
</script>

<style scoped>
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 32px;
  height: 32px;
  pointer-events: none;
  z-index: 9999; /* 保持最高层级 */
  transform: translate(-50%, -50%); /* 初始隐藏在左上角或由JS更新 */
  will-change: transform;
}

.custom-cursor img {
  width: 100%;
  height: 100%;
  display: block;
  /* 增加滤镜效果，让光标看起来更像HUD元素 */
  filter: drop-shadow(0 0 5px rgba(97, 177, 214, 0.8));
}
</style>
