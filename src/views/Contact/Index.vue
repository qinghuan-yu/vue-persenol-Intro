<template>
  <div class="contact-content">
    <!-- 标题区 -->
    <div class="contact-header">
      <div class="header-line">
        <span class="line-code">COMM_MODULE</span>
        <span class="status-indicator">● ACTIVE</span>
      </div>
      <h2 class="contact-title">CONTACT CHANNELS</h2>
    </div>
    
    <!-- 联系方式列表 -->
    <div class="contact-list">
      <div class="contact-item">
        <span class="item-index">CH-01</span>
        <span class="item-label">EMAIL</span>
        <span class="item-value email-highlight">Reliarc.me@outlook.com</span>
      </div>
      
      <div class="contact-item">
        <span class="item-index">CH-02</span>
        <span class="item-label">QQ</span>
        <span class="item-value">悬停左侧查看二维码</span>
      </div>
      
      <div class="contact-item">
        <span class="item-index">CH-03</span>
        <span class="item-label">WECHAT</span>
        <span class="item-value">悬停右侧查看二维码</span>
      </div>
    </div>
    
    <!-- 装饰性条形码 -->
    <div class="terminal-footer">
      <svg width="200" height="35" xmlns="http://www.w3.org/2000/svg">
        <g class="barcode-group">
          <rect x="0" y="0" width="4" height="25" fill="#61b1d6"/>
          <rect x="6" y="0" width="2" height="25" fill="#61b1d6"/>
          <rect x="10" y="0" width="5" height="25" fill="#61b1d6"/>
          <rect x="17" y="0" width="2" height="25" fill="#61b1d6"/>
          <rect x="21" y="0" width="4" height="25" fill="#61b1d6"/>
          <rect x="27" y="0" width="2" height="25" fill="#61b1d6"/>
          <rect x="31" y="0" width="3" height="25" fill="#61b1d6"/>
          <rect x="36" y="0" width="2" height="25" fill="#61b1d6"/>
          <rect x="40" y="0" width="5" height="25" fill="#61b1d6"/>
          <rect x="47" y="0" width="2" height="25" fill="#61b1d6"/>
        </g>
      </svg>
      <div class="terminal-code">TERMINAL_ID: 0xFF-CONTACT-8A2B</div>
    </div>
    
    <!-- 真实二维码叠加层（鼠标悬停显示） -->
    <div class="qr-overlay qr-overlay-left">
      <div class="qr-frame">
        <img src="@/assets/QQ.png" alt="QQ" />
        <div class="frame-corner tl"></div>
        <div class="frame-corner tr"></div>
        <div class="frame-corner bl"></div>
        <div class="frame-corner br"></div>
      </div>
      <div class="qr-hint">QQ_SCAN</div>
    </div>
    <div class="qr-overlay qr-overlay-right">
      <div class="qr-frame">
        <img src="@/assets/WeChat.png" alt="WeChat" />
        <div class="frame-corner tl"></div>
        <div class="frame-corner tr"></div>
        <div class="frame-corner bl"></div>
        <div class="frame-corner br"></div>
      </div>
      <div class="qr-hint">WECHAT_SCAN</div>
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
}

.contact-header {
  margin-bottom: 2rem;
}

.header-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(244, 208, 63, 0.3);
}

.line-code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.15em;
}

.status-indicator {
  font-size: 0.7rem;
  color: #4ade80;
  animation: status-blink 2s infinite;
}

@keyframes status-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.contact-title {
  font-size: 1.5rem;
  margin: 0;
  color: var(--color-accent);
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: 0.1em;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin: 2rem 0;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.02);
  border-left: 2px solid transparent;
  transition: all 0.3s ease;
}

.contact-item:hover {
  background: rgba(97, 177, 214, 0.05);
  border-left-color: #61b1d6;
}

.item-index {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: rgba(97, 177, 214, 0.5);
  min-width: 50px;
}

.item-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: #999;
  min-width: 80px;
  letter-spacing: 0.1em;
}

.item-value {
  flex: 1;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.email-highlight {
  color: #F4D03F;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(244, 208, 63, 0.3);
}

.terminal-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
}

.barcode-group rect {
  opacity: 0.6;
  animation: barcode-scan 2.5s ease-in-out infinite;
}

@keyframes barcode-scan {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.9; }
}

.terminal-code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: rgba(97, 177, 214, 0.5);
  letter-spacing: 0.2em;
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

.qr-frame {
  position: relative;
  padding: 15px;
  background: rgba(10, 10, 10, 0.95);
  border: 1px solid var(--color-accent);
  clip-path: polygon(
    10px 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    10px 100%,
    0 calc(100% - 10px),
    0 10px
  );
}

.qr-frame img {
  width: 180px;
  height: 180px;
  background: rgba(255, 255, 255, 0.98);
  padding: 10px;
  display: block;
}

.frame-corner {
  position: absolute;
  width: 15px;
  height: 15px;
  border-color: #F4D03F;
  border-style: solid;
  border-width: 0;
}

.frame-corner.tl {
  top: 0;
  left: 0;
  border-left: 2px solid #F4D03F;
  border-top: 2px solid #F4D03F;
}

.frame-corner.tr {
  top: 0;
  right: 0;
  border-right: 2px solid #F4D03F;
  border-top: 2px solid #F4D03F;
}

.frame-corner.bl {
  bottom: 0;
  left: 0;
  border-left: 2px solid #F4D03F;
  border-bottom: 2px solid #F4D03F;
}

.frame-corner.br {
  bottom: 0;
  right: 0;
  border-right: 2px solid #F4D03F;
  border-bottom: 2px solid #F4D03F;
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
  font-size: 0.8rem;
  font-family: 'JetBrains Mono', monospace;
  color: var(--color-accent);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  opacity: 0.9;
  margin-top: 0.5rem;
}

/* 移动端调整 */
@media (max-width: 768px) {
  .qr-overlay-left { left: 5%; }
  .qr-overlay-right { right: 5%; }
  .qr-overlay img { width: 120px; height: 120px; }
}
</style>
