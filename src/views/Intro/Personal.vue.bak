<template>
  <div class="personal-container">
    <!-- 系统信息装饰 -->
    <div class="system-info">
      <span class="sys-text">VER. 2.0.45</span>
      <span class="sys-text">SYS. ONLINE</span>
      <span class="sys-text">MEM. 45%</span>
    </div>
    
    <!-- 主要信息区 -->
    <div class="info-section">
      <div class="info-line">
        <span class="line-number">01 //</span>
        <span class="label-tag">IDENTITY:</span>
        <h2 class="info-content" v-scramble>清 棫</h2>
      </div>
      
      <div class="info-line">
        <span class="line-number">02 //</span>
        <span class="label-tag highlight">STATUS:</span>
        <p class="info-content" v-scramble>JUFE 计算机专业大二在读</p>
      </div>
      
      <div class="info-line">
        <span class="line-number">03 //</span>
        <span class="label-tag">MISSION:</span>
        <p class="info-content" v-scramble>Kaggle竞赛准备</p>
      </div>
    </div>
    
    <!-- 条形码识别模块 -->
    <DecorationBarcode 
      color="#F4D03F" 
      text="ID: 0000-RELIC-ARK" 
      text-color="rgba(255, 255, 255, 0.4)"
    />
  </div>
</template>

<script setup>
import DecorationBarcode from '@/components/DecorationBarcode.vue';
</script>

<style scoped>
.personal-container {
  position: relative;
  padding: 1rem 0;
}

.system-info {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.sys-text {
  font-size: 10px;
  font-family: 'JetBrains Mono', monospace;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 0.1em;
}

.info-section {
  margin: 2rem 0;
}

.info-line {
  display: flex;
  align-items: baseline;
  margin-bottom: 1.2rem;
  gap: 0.5rem;
}

.line-number {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: rgba(97, 177, 214, 0.5);
  min-width: 40px;
  letter-spacing: 0.05em;
}

.label-tag {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #999;
  padding: 2px 6px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
  min-width: 80px;
  text-align: center;
}

.label-tag.highlight {
  color: #000;
  background: rgba(244, 208, 63, 0.9);
  border-color: #F4D03F;
  box-shadow: 0 0 10px rgba(244, 208, 63, 0.3);
}

.info-content {
  margin: 0;
  flex: 1;
}

h2.info-content {
  font-size: 1.8rem;
  color: #fff;
  font-weight: 600;
}

p.info-content {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.barcode-section {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.barcode-group rect {
  opacity: 0.7;
  animation: barcode-scan 3s ease-in-out infinite;
}

@keyframes barcode-scan {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

.barcode-id {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: rgba(244, 208, 63, 0.6);
  letter-spacing: 0.2em;
  margin-top: 0.3rem;
}
</style>