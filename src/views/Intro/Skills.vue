<template>
  <div class="skills-container">
    <!-- 系统标识 -->
    <div class="module-header">
      <span class="module-tag">CAPABILITY MODULE</span>
      <span class="module-code">SKILL_SYS_v1.3</span>
    </div>
    
    <div class="skills-section">
      <div class="skill-item">
        <span class="skill-index">SK-01</span>
        <span class="skill-icon">█</span>
        <p v-scramble>基本的计算机知识</p>
      </div>
      
      <div class="skill-item">
        <span class="skill-index">SK-02</span>
        <span class="skill-icon">█</span>
        <p v-scramble>基本的钢琴演奏和编曲作曲知识</p>
      </div>
      
      <div class="skill-item">
        <span class="skill-index">SK-03</span>
        <span class="skill-icon">█</span>
        <p v-scramble>基本的动手能力</p>
      </div>
      
      <div class="skill-item">
        <span class="skill-index">SK-04</span>
        <span class="skill-icon">█</span>
        <p v-scramble>基本的解决问题的能力</p>
      </div>
    </div>
    
    <!-- 装饰性数据 -->
    <div class="data-footer">
      <span class="data-line">TOTAL SKILLS: 04</span>
      <span class="data-line">LEVEL: BASIC</span>
      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 使用 script setup
</script>

<style scoped>
.skills-container {
  position: relative;
  padding: 1rem 0;
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(244, 208, 63, 0.3);
}

.module-tag {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #F4D03F;
  padding: 3px 8px;
  background: rgba(244, 208, 63, 0.1);
  border: 1px solid #F4D03F;
}

.module-code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.1em;
}

.skills-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.5rem 0;
  border-left: 2px solid transparent;
  padding-left: 0.5rem;
  transition: all 0.3s ease;
}

.skill-item:hover {
  border-left-color: #61b1d6;
  padding-left: 1rem;
}

.skill-index {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: rgba(97, 177, 214, 0.6);
  min-width: 45px;
}

.skill-icon {
  font-size: 0.6rem;
  color: #F4D03F;
  animation: icon-pulse 2s ease-in-out infinite;
}

@keyframes icon-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.skill-item p {
  margin: 0;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.85);
  flex: 1;
}

.data-footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.data-line {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.1em;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  width: 65%;
  background: linear-gradient(90deg, #61b1d6, #F4D03F);
  animation: progress-glow 2s ease-in-out infinite;
}

@keyframes progress-glow {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}
</style>