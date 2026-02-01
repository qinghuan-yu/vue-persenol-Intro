<template>
  <section class="skills-container">
    <div class="layer-content">
      <div class="skills-content">
        <div class="skills-grid">
          <!-- List Section -->
          <div class="skills-list">
            <div v-for="(skill, i) in skills" :key="i" class="skill-row group">
              <div class="row-left">
                <span class="skill-cn">{{ skill.cn }}</span>
                <span class="skill-en">{{ skill.en }}</span>
              </div>
              <div class="row-right">
                <span class="skill-level">{{ skill.level }}</span>
              </div>
            </div>
          </div>

          <!-- Animation Section -->
          <div class="skills-visual">
            <div class="circle-container">
              <div class="circle-outer"></div>
              <div class="circle-inner"></div>
              <div class="circle-center group">
                <div class="cpu-icon">[CPU]</div>
                <p class="processing-text">PROCESSING...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const skills = [
  { en: 'COMPUTER SCIENCE', cn: '计算机基础', level: 'JUFE CS Sophomore' },
  { en: 'VUE.JS / WEB', cn: '前端开发', level: 'Portfolio & Tools' },
  { en: 'EMBEDDED / IOT', cn: '嵌入式开发', level: 'C/C++ Exploration' },
  { en: 'PIANO PERFORMANCE', cn: '钢琴演奏', level: 'Animenz Style' },
  { en: 'MUSIC PRODUCTION', cn: '音乐制作', level: 'JPOP / Complextro' },
];
</script>

<style scoped>
.skills-container {
  min-height: 80vh;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.layer-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.skills-content {
  width: 100%;
  padding: 0 24px;
}
@media (min-width: 1024px) {
  .skills-content { padding: 0 96px; }
}

.skills-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 80px;
}
@media (min-width: 1024px) {
  .skills-grid { grid-template-columns: 1fr 1fr; }
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.skill-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding: 20px 16px;
  transition: all 0.3s;
  cursor: default;
}

.skill-row:hover {
  background-color: rgba(34, 211, 238, 0.05);
  transform: translateX(5px);
}

.row-left {
  display: flex;
  flex-direction: column;
}

.skill-cn {
  font-size: 20px; /* xl */
  font-weight: 500;
  font-style: normal;
  letter-spacing: -0.025em;
}

.skill-en {
  font-size: 9px;
  letter-spacing: 0.3em;
  opacity: 0.4;
  text-transform: uppercase;
  transition: color 0.3s;
}
.skill-row:hover .skill-en {
  color: #22d3ee;
}

.skill-level {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  opacity: 0.2;
  text-transform: uppercase;
  transition: opacity 0.3s;
}
.skill-row:hover .skill-level {
  opacity: 1;
}

/* Animation Section */
.skills-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.circle-container {
  width: 320px;
  height: 320px;
  border: 1px solid rgba(34, 211, 238, 0.1);
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle-outer {
  position: absolute;
  inset: 16px;
  border: 1px dashed rgba(34, 211, 238, 0.3);
  border-radius: 50%;
  animation: spin 40s linear infinite;
}

.circle-inner {
  position: absolute;
  inset: 48px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  animation: spin-reverse 60s linear infinite;
}

.circle-center {
  text-align: center;
  z-index: 10;
}

.cpu-icon {
  font-size: 48px;
  color: #22d3ee;
  margin-bottom: 16px;
  transition: transform 0.3s;
  font-weight: 100;
}
.circle-center:hover .cpu-icon {
  transform: rotate(12deg);
}

.processing-text {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.5em;
  opacity: 0.3;
  margin: 0;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spin-reverse {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}
</style>
