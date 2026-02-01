<template>
  <div class="music-container">
    <!-- 模块头部 -->
    <div class="module-header">
      <span class="module-tag music">♪ MUSIC COLLAB</span>
      <span class="module-code">AUDIO_SYS_v3.0</span>
    </div>
    
    <!-- 合作领域 -->
    <div class="collab-section">
      <div v-for="(item, index) in musicItems" :key="index" class="collab-card">
        <div class="card-header">
          <span class="collab-id">{{ item.id }}</span>
          <span :class="['genre-tag', item.genreClass]">{{ item.genre }}</span>
        </div>
        <div class="card-body">
          <span class="music-icon">{{ item.icon }}</span>
          <p class="collab-desc" v-scramble>{{ item.desc }}</p>
        </div>
        <div class="card-footer">
          <div class="waveform">
            <span v-for="(h, i) in item.waves" :key="i" class="wave-bar" :style="{ height: h }"></span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 音频标识 -->
    <div class="audio-footer">
      <div class="audio-spectrum">
        <div class="spectrum-bar" v-for="n in 12" :key="n" :style="{ animationDelay: n * 0.1 + 's' }"></div>
      </div>
      <div class="audio-id">AUDIO_TRACK_ID: 0xMUSIC-COLLAB</div>
    </div>
  </div>
</template>

<script setup>
const musicItems = [
  { 
    id: 'MUS-01', 
    genre: 'JPOP', 
    genreClass: 'jpop',
    icon: '♫', 
    desc: 'Jpop制作', 
    waves: ['60%', '80%', '40%', '90%', '70%', '50%', '85%', '65%'] 
  },
  { 
    id: 'MUS-02', 
    genre: 'EDM', 
    genreClass: 'edm',
    icon: '♬', 
    desc: '尝试complextro', 
    waves: ['90%', '70%', '95%', '60%', '85%', '75%', '80%', '90%'] 
  }
];
</script>

<style scoped>
.music-container {
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
  padding: 3px 8px;
  border: 1px solid;
}

.module-tag.music {
  color: #F4D03F;
  background: rgba(244, 208, 63, 0.1);
  border-color: #F4D03F;
}

.module-code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.1em;
}

.collab-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.collab-card {
  padding: 1.2rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 3px solid #F4D03F;
  transition: all 0.3s ease;
}

.collab-card:hover {
  background: rgba(244, 208, 63, 0.05);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(244, 208, 63, 0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.collab-id {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: rgba(244, 208, 63, 0.6);
  letter-spacing: 0.1em;
}

.genre-tag {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 2px 8px;
  letter-spacing: 0.1em;
}

.genre-tag.jpop {
  color: #ff6b9d;
  background: rgba(255, 107, 157, 0.1);
  border: 1px solid #ff6b9d;
}

.genre-tag.edm {
  color: #61b1d6;
  background: rgba(97, 177, 214, 0.1);
  border: 1px solid #61b1d6;
}

.card-body {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.music-icon {
  font-size: 2rem;
  color: #F4D03F;
  animation: music-pulse 2s ease-in-out infinite;
}

@keyframes music-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

.collab-desc {
  margin: 0;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
}

.card-footer {
  padding-top: 0.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.waveform {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 30px;
}

.wave-bar {
  flex: 1;
  background: linear-gradient(to top, #F4D03F, #61b1d6);
  opacity: 0.6;
  animation: wave-bounce 1.5s ease-in-out infinite;
}

.wave-bar:nth-child(1) { animation-delay: 0s; }
.wave-bar:nth-child(2) { animation-delay: 0.1s; }
.wave-bar:nth-child(3) { animation-delay: 0.2s; }
.wave-bar:nth-child(4) { animation-delay: 0.3s; }
.wave-bar:nth-child(5) { animation-delay: 0.4s; }
.wave-bar:nth-child(6) { animation-delay: 0.5s; }
.wave-bar:nth-child(7) { animation-delay: 0.6s; }
.wave-bar:nth-child(8) { animation-delay: 0.7s; }

@keyframes wave-bounce {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.3); }
}

.audio-footer {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.audio-spectrum {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 40px;
}

.spectrum-bar {
  width: 4px;
  background: linear-gradient(to top, #F4D03F, #61b1d6);
  animation: spectrum-dance 1s ease-in-out infinite;
}

@keyframes spectrum-dance {
  0%, 100% { height: 20%; opacity: 0.5; }
  50% { height: 90%; opacity: 1; }
}

.audio-id {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: rgba(244, 208, 63, 0.5);
  letter-spacing: 0.2em;
}
</style>