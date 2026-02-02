<template>
  <section class="projects-container">
    <!-- Visual Layer: Pixi Canvas -->
    <div ref="visualContainer" class="pixi-layer"></div>

    <!-- UI Layer -->
    <div class="layer-content">
      
      <!-- VIEW 1: Project List -->
      <!-- Wrapper for list view content, handled by internal staggering -->
      <div class="view-list" :class="{ 'list-hidden': selectedIndex !== -1 }">
          <div class="list-header">
            <h3 class="projects-title">Projects</h3>
            <p class="projects-subtitle">Ongoing Development Logs</p>
          </div>

          <transition-group 
             tag="div" 
             name="staggered-list" 
             class="project-items"
             appear
          >
            <div 
              v-for="(proj, i) in (selectedIndex === -1 ? projects : [])" 
              :key="proj.title" 
              class="project-row group"
              :style="{ '--i': i }"
              @click="selectProject(i)"
            >
              <div class="row-left">
                <span class="row-id">0{{ i + 1 }}</span>
                <span class="row-type">{{ proj.type }}</span>
              </div>
              <h4 class="row-title">{{ proj.title }}</h4>
              <div class="row-arrow">→</div>
            </div>
          </transition-group>
      </div>

      <!-- VIEW 2: Project Detail -->
      <div v-if="selectedIndex !== -1" class="view-detail">
        <transition name="project-switch" mode="out-in">
          <!-- Wrapper keyed by project to force re-render transition -->
          <div :key="currentProject.title" class="switch-container">
            
            <!-- ContentWrapper: Right Aligned Text -->
            <div class="detail-wrapper">
               <div class="detail-content-area">
                  <h2 class="detail-title-cn">{{ currentProject.title }}</h2>
                  <h2 class="detail-title-en">{{ currentProject.descTitle || 'PROJECT DETAILS' }}</h2>
                  
                  <div class="detail-separator">
                     <div class="dashed-line"></div>
                  </div>

                  <p class="detail-desc">
                    {{ currentProject.desc }}
                  </p>
                  <div class="detail-action">
                     <a :href="currentProject.link" target="_blank" class="text-link-box">
                        <span class="link-label">LAUNCH PROJECT</span>
                        <span class="link-arrow">↗</span>
                     </a>
                  </div>
               </div>
            </div>

            <!-- Right Side World/Index Indicator (as per image) -->
            <div class="right-indicator">
                <span class="idx-big">0{{ selectedIndex + 1 }}</span>
                <div class="idx-sub">
                    <span>/ 0{{ projects.length }}</span>
                    <span class="idx-label_">Projects</span>
                </div>
            </div>

          </div>
        </transition>

        <!-- Navigation Switchers (Out of Transition, Persistent) -->
        <button @click="prevProject" class="nav-arrow nav-prev hover-glow">
            <svg viewBox="0 0 24 24" width="48" height="48"><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>
        
        <button @click="nextProject" class="nav-arrow nav-next hover-glow">
            <svg viewBox="0 0 24 24" width="48" height="48"><path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </button>

        <!-- Bottom Bar (Out of Transition, Persistent) -->
        <div class="bottom-bar-area">
           <div class="bar-progress-bg">
              <div class="bar-progress-fill" :style="{ width: ((selectedIndex + 1) / projects.length) * 100 + '%' }"></div>
           </div>
           
           <button @click="closeDetail" class="back-btn-block">
               <div class="back-icon">‹</div>
               <div class="back-text">
                  <span>返回</span>
                  <span class="back-en">GO BACK</span>
               </div>
           </button>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { usePixiApp } from '@/composables/usePixiApp';

// Asset Imports
import pcbUrl from '@/assets/pcb.png';
import pcb2Url from '@/assets/pcb2.png';
import pianoUrl from '@/assets/piano.png';
import aiUrl from '@/assets/AI.png';
// Fallback if needed
const defaultPcb = pcbUrl;

const projects = [
  { 
    type: 'WEB', 
    title: 'GIF 播放器',
    descTitle: 'GIF-PLAYER',
    desc: '提供了逐帧控制 GIF 动画的能力。轻量级布局引擎实现精准的播放操控。',
    link: 'https://github.com/qinghuan-yu/gif-player',
    image: pcb2Url
  },
  { 
    type: 'INTERACTIVE', 
    title: 'Vue 钢琴',
    descTitle: 'VUE-PIANO',
    desc: '基于 Vue.js 构建的交互式虚拟钢琴。具有逼真的声音合成和响应式键位映射。',
    link: 'https://github.com/qinghuan-yu/vue-piano',
    image: pianoUrl
  },
  { 
    type: 'CORE', 
    title: '演奏分析', 
    descTitle: 'PIANALYSIS',
    desc: '钢琴演奏的深度分析系统。使用 AI 算法可视化按键力度和时值稳定性。',
    link: 'https://github.com/qinghuan-yu/Pianalysis',
    image: aiUrl
  },
];

const selectedIndex = ref(-1);
const visualContainer = ref(null);
const { init, destroy } = usePixiApp();
let morphToShapes = null;

const currentProject = computed(() => {
  if (selectedIndex.value === -1) return {};
  return projects[selectedIndex.value];
});

// --- Actions ---

const updateParticles = async (imgUrl, layoutX = 0.35) => {
  if (!morphToShapes) return;
  // Use morphToShapes with layout option
  // layoutX: 0.35 (Left - Detail View), 0.75 (Right - List View)
  await morphToShapes([
    { source: imgUrl, options: { type: 'image', sampleRate: 4, layoutX: layoutX } } 
  ]);
};

const selectProject = (index) => {
  selectedIndex.value = index;
  // Switch to Detail View: Image on Left (0.35)
  updateParticles(projects[index].image, 0.35);
};

const nextProject = () => {
  let next = selectedIndex.value + 1;
  if (next >= projects.length) next = 0;
  selectedIndex.value = next;
  // Detail View Switching: Image on Left
  updateParticles(projects[next].image, 0.35);
};

const prevProject = () => {
  let prev = selectedIndex.value - 1;
  if (prev < 0) prev = projects.length - 1;
  selectedIndex.value = prev;
  // Detail View Switching: Image on Left
  updateParticles(projects[prev].image, 0.35);
};

const closeDetail = () => {
  selectedIndex.value = -1;
  // Return to List View: Image on RIGHT (0.75) to avoid overlap with Left List
  updateParticles(defaultPcb, 0.75);
};

// --- Lifecycle ---

onMounted(async () => {
  if (visualContainer.value) {
    const controls = await init(visualContainer.value);
    morphToShapes = controls.morphToShapes;
    
    // Initial State: Default PCB on RIGHT (0.75) for List View
    setTimeout(() => {
        updateParticles(defaultPcb, 0.75);
    }, 100);
  }
});

onUnmounted(() => {
  destroy();
});
</script>

<style scoped>
.projects-container {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: transparent; /* MainLayout handles background */
}

/* --- Pixi Layer --- */
.pixi-layer {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none; /* Let clicks pass through */
}

/* --- UI Layer --- */
.layer-content {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100vh;
  padding: 96px 48px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* --- View 1: List Styles --- */
.view-list {
  width: 100%;
  max-width: 600px;
  position: relative; /* Ensure z-index works contextually */
  z-index: 20; 
} 

.projects-title {
  font-size: 48px;
  color: #22d3ee;
  margin: 0;
  letter-spacing: -0.05em;
  font-weight: 500;
}

.projects-subtitle {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.4em;
  text-transform: uppercase;
  margin-bottom: 48px;
}

.project-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* Staggered transition handled by TransitionGroup */
}

.project-row {
  display: flex;
  align-items: center;
  padding: 24px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(0,0,0,0.3);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  overflow: hidden;
}

.project-row:hover {
  border-color: #22d3ee;
  transform: translateX(20px);
  background: rgba(34, 211, 238, 0.05);
}

.row-left {
  display: flex;
  flex-direction: column;
  margin-right: 32px;
  min-width: 80px;
}

.row-id {
  font-family: monospace;
  color: #22d3ee;
  font-size: 12px;
}

.row-type {
  font-size: 9px;
  opacity: 0.5;
  letter-spacing: 0.1em;
}

.row-title {
  flex: 1;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.05em;
  margin: 0;
  text-transform: uppercase;
}

.row-arrow {
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s;
  color: #22d3ee;
}

.project-row:hover .row-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* --- View 2: Detail Styles (Revamped) --- */
.view-detail {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* Make content wrapper occupy right half approx. */
.detail-wrapper {
  position: absolute;
  top: 50%;
  left: 55%; /* Start from slightly right of center */
  transform: translateY(-50%);
  width: 35%; /* Reduced width to avoid overlap with right arrow */
  pointer-events: none; /* Container passes clicks */
  text-align: left;
  z-index: 50;
}

.detail-content-area {
  color: white;
  pointer-events: auto; /* Text content captures clicks */
}

.detail-title-cn {
  font-size: 48px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
}

.detail-title-en {
  font-size: 24px;
  font-weight: 700;
  font-family: 'Arial Black', sans-serif;
  color: white;
  margin: 0 0 16px 0;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.detail-separator {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin-bottom: 24px;
  position: relative;
}

.detail-desc {
  font-size: 14px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 32px;
  max-width: 400px;
}

/* Nav Arrows */
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1); /* Subtle border to define hit area visually if needed, or remove */
  background: rgba(0,0,0,0.2); /* Slight background to capture clicks */
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  pointer-events: auto; /* CRITICAL */
  transition: all 0.3s;
  padding: 0;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 99999; /* Max Z-Index */
}
.nav-arrow:hover {
  color: #22d3ee;
  transform: translateY(-50%) scale(1.1);
  background: rgba(34, 211, 238, 0.1);
  border-color: #22d3ee;
}
.nav-prev { left: 48px; }
.nav-next { right: 48px; } 

/* Ensure no other element blocks clicks */
.right-indicator {
  position: absolute;
  right: 0;
  top: 52%; 
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 140px; /* Make space for the button */
  z-index: 50; 
  opacity: 0.8;
  pointer-events: none; /* Container is passthrough */
}
.right-indicator * {
  pointer-events: none; /* Children are passthrough */
}

.idx-big {
  font-size: 80px;
  font-weight: 700;
  color: #22d3ee;
  line-height: 0.8;
  font-family: 'Arial', sans-serif; /* Cleaner font */
}

.text-link-box {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #22d3ee;
  padding: 12px 24px;
  text-decoration: none;
  color: #22d3ee;
  font-size: 12px;
  letter-spacing: 0.1em;
  transition: all 0.3s;
  background: rgba(0,0,0,0.5);
}
.text-link-box:hover {
  background: #22d3ee;
  color: #000;
}

.idx-big {
  font-size: 80px;
  font-weight: 700;
  color: #22d3ee;
  line-height: 0.8;
}

.idx-sub {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 14px;
  color: white;
}
.idx-label_ {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 18px;
}

/* Bottom Bar */
.bottom-bar-area {
  position: absolute;
  bottom: 80px; /* Lifted up further to avoid cutoff */
  left: 0;
  width: 100%;
  height: 64px;
  display: flex;
  align-items: flex-end;
  pointer-events: auto;
  z-index: 150;
}

.bar-progress-bg {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  margin-bottom: 20px; /* Align visually */
  position: relative;
}

.bar-progress-fill {
  height: 100%;
  background: #22d3ee;
  transition: width 0.5s ease;
  box-shadow: 0 0 10px #22d3ee;
}

.back-btn-block {
  width: 160px;
  height: 100%;
  background: #52525b; /* zinc-600 ish */
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: background 0.3s;
}
.back-btn-block:hover {
  background: #22d3ee;
  color: black;
}

.back-icon {
  font-size: 24px;
  margin-right: 12px;
  font-weight: bold;
}

.back-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.2;
}

.back-en {
  font-size: 8px;
  letter-spacing: 0.1em;
  opacity: 0.7;
}

/* --- Transitions --- */
.list-hidden {
  pointer-events: none;
}

.switch-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* Staggered List Item Transitions */
.staggered-list-enter-active {
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(var(--i) * 0.1s);
}
.staggered-list-leave-active {
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  /* Reverse stagger for leaving? Or standard stagger. 
     Standard stagger works if items removed together and CSS delay applies. 
     But v-if removes all at once. The v-for trick handles this. */
  transition-delay: calc(var(--i) * 0.05s);
}

/* Enter: Slide from left */
.staggered-list-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}

/* Leave: Slide out to left */
.staggered-list-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

/* Project Switch Parallax (Internal Toggle) */
.project-switch-enter-active,
.project-switch-leave-active {
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.project-switch-enter-from {
  opacity: 0;
  transform: translateY(40px); /* Enter from below */
}

.project-switch-leave-to {
  opacity: 0;
  transform: translateY(-40px); /* Leave to top */
}

.project-switch-enter-to,
.project-switch-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>