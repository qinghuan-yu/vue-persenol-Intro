<template>
  <div class="contact-content">

    
    <!-- 真实二维码叠加层（鼠标悬停显示） -->
    <div class="qr-overlay qr-overlay-left">
      <img src="@/assets/QQ.png" alt="QQ" />
      <div class="qr-hint">QQ</div>
    </div>
    <div class="qr-overlay qr-overlay-right">
      <img src="@/assets/WeChat.png" alt="WeChat" />
      <div class="qr-hint">WeChat</div>
    </div>
  </div>
</template>

<script setup>
// Contact 页面主要通过背景粒子系统展示二维码
// 此处保留基础文字内容以触发页面过渡动画
</script>

<style scoped>
.contact-content {
  padding: 2rem 0;
  text-align: center;
}

.contact-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-accent);
}

.contact-content p {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--color-text-main);
  opacity: 0.8;
}

.contact-content .email {
  font-size: 1.2rem;
  color: var(--color-accent);
  font-weight: bold;
  margin-top: 1rem;
}

/* 真实二维码叠加层 */
.qr-overlay {
  position: fixed;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 15;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.qr-overlay-left {
  left: 12%;
  top: 50%;
  transform: translateY(-50%);
}

.qr-overlay-right {
  right: 12%;
  top: 50%;
  transform: translateY(-50%);
}

.qr-overlay:hover {
  opacity: 1;
}

.qr-overlay img {
  width: 180px;
  height: 180px;
  border: 2px solid var(--color-accent);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.95);
  padding: 10px;
  box-shadow: 0 0 20px rgba(97, 177, 214, 0.5);
}

.qr-hint {
  font-size: 0.9rem;
  color: var(--color-accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.8;
}

/* 移动端调整 */
@media (max-width: 768px) {
  .qr-overlay-left { left: 5%; }
  .qr-overlay-right { right: 5%; }
  .qr-overlay img { width: 120px; height: 120px; }
}
</style>
