<template>
  <div class="app-container">
    <!-- Global Static Background -->
    <div class="cross-grid-background"></div>
    <div class="scan-effect"></div>

    <!-- 顶部导航 -->
    <nav class="top-nav">
      <div class="nav-left">
        <div class="brand">
          <span class="brand-name">RELIC</span>
          <span class="brand-sub">Data Hub</span>
        </div>
        <div class="nav-divider"></div>
        <div class="nav-links">
          <router-link to="/intro/personal" class="nav-item">
            <span class="item-label">IDENTITY</span>
            <span class="item-sub">身份</span>
          </router-link>
          <router-link to="/intro/ongoing" class="nav-item">
            <span class="item-label">PROJECTS</span>
            <span class="item-sub">项目</span>
          </router-link>
          <router-link to="/intro/skills" class="nav-item">
            <span class="item-label">CAPABILITY</span>
            <span class="item-sub">能力</span>
          </router-link>
          <router-link to="/intro/finished" class="nav-item">
            <span class="item-label">ARCHIVE</span>
            <span class="item-sub">档案</span>
          </router-link>
        </div>
      </div>

      <div class="nav-right">
        <a href="https://github.com/qinghuan-yu" target="_blank" class="icon-link">GITHUB</a>
        <a href="mailto:Reliarc.me@outlook.com" class="icon-link">MAIL</a>
      </div>
    </nav>

    <!-- 右侧进度条 -->
    <div class="right-sidebar">
      <div class="page-number">
        <transition name="num-slide" mode="out-in">
          <span :key="currentPageIndex" class="current-num dark-cyan">{{ currentPageIndex }}</span>
        </transition>
      </div>
      <div class="progress-track">
        <div class="progress-indicator" :style="{ top: indicatorPosition }">
          <div class="indicator-line"></div>
        </div>
      </div>
    </div>

    <!-- 主内容区 -->
    <main class="main-content">
      <router-view v-slot="{ Component, route }">
        <transition 
          name="parallax" 
          mode="out-in"
          @before-enter="(el) => console.log('Transition Start:', el)"
          @enter="(el) => console.log('Transition Enter:', el)"
        >
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </router-view>
    </main>

    <footer class="app-footer">
      © 2026 RELIC-ARK ARCHIVE // JUFE COMPUTER SCIENCE // STATUS: AUTHORIZED
    </footer>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const routesOrder = ['/intro/personal', '/intro/ongoing', '/intro/skills', '/intro/finished'];

let isNavigating = false;

const handleWheel = (e) => {
  if (isNavigating) return;
  
  const currentPath = route.path;
  const currentIndex = routesOrder.findIndex(p => currentPath.includes(p));
  
  if (currentIndex === -1) return;

  if (e.deltaY > 50) { // Scroll Down -> Next
    if (currentIndex < routesOrder.length - 1) {
      navigate(routesOrder[currentIndex + 1]);
    }
  } else if (e.deltaY < -50) { // Scroll Up -> Prev
    if (currentIndex > 0) {
      navigate(routesOrder[currentIndex - 1]);
    }
  }
};

const navigate = (path) => {
  isNavigating = true;
  router.push(path);
  setTimeout(() => {
    isNavigating = false;
  }, 1000); // Debounce duration matching transition time
};

onMounted(() => {
  window.addEventListener('wheel', handleWheel);
});

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel);
});

const currentPageIndex = computed(() => {
  const path = route.path;
  if (path.includes('personal')) return '01';
  if (path.includes('ongoing')) return '02';
  if (path.includes('skills')) return '03';
  if (path.includes('finished') || path.includes('links')) return '04';
  return '00';
});

const indicatorPosition = computed(() => {
  const path = route.path;
  if (path.includes('personal')) return '0%';
  if (path.includes('ongoing')) return '33%';
  if (path.includes('skills')) return '66%';
  if (path.includes('finished') || path.includes('links')) return '100%';
  return '0%';
});
</script>

<style scoped>
/* 容器 */
.app-container {
  min-height: 100vh;
  background-color: #050505;
  color: white;
  font-family: 'Noto Sans SC', sans-serif;
  overflow: hidden;
  position: relative;
}

/* 背景特效 */
.cross-grid-background {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.2;
  background-color: #000;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(45deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(-45deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 160px 160px, 160px 160px, 160px 160px, 160px 160px;
  background-position: center center;
}

.cross-grid-background::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.15;
  background-image: radial-gradient(circle, #fff 1px, transparent 0);
  background-size: 40px 40px;
}

.scan-effect {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 50;
  opacity: 0.03;
  mix-blend-mode: overlay;
  background-image: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.04));
  background-size: 100% 4px, 3px 100%;
}

/* 顶部导航 */
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 96px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(12px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  box-sizing: border-box;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.brand {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.05em;
  color: #22d3ee;
}

.brand-sub {
  font-size: 8px;
  letter-spacing: 0.3em;
  opacity: 0.5;
  text-transform: uppercase;
}

.nav-divider {
  height: 32px;
  width: 1px;
  background: rgba(255, 255, 255, 0.2);
  display: none;
}
@media (min-width: 640px) { .nav-divider { display: block; } }

.nav-links {
  display: none;
  gap: 32px;
}
@media (min-width: 768px) { .nav-links { display: flex; } }

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;
  color: #6b7280;
  transition: all 0.3s;
}

.nav-item:hover, .nav-item.router-link-active {
  color: #22d3ee;
}
.nav-item.router-link-active .item-label, .nav-item:hover .item-label {
  color: #22d3ee;
}

.item-label {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.2em;
}

.item-sub {
  font-size: 9px;
  opacity: 0.6;
  font-weight: 500;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.icon-link {
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  opacity: 0.8;
  transition: color 0.3s;
}
.icon-link:hover {
  color: #22d3ee;
}

/* 右侧侧边栏 */
.right-sidebar {
  position: fixed;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 90;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-number {
  position: relative;
  margin-bottom: 24px;
  text-align: center;
  width: 64px;  /* Fixed width to prevent collapse */
  height: 48px; /* Fixed height matching font-size */
  display: flex;     /* Use flex to center absolute child if needed, though text-align works for inline blocks usually */
  justify-content: center;
}

.current-num {
  font-size: 48px;
  font-weight: 500; /* Removed bold/900 */
  line-height: 1;
  color: #22d3ee;
  display: block;
  width: 100%; /* Ensure it takes full width of parent for centering */
}

.page-label {
  position: absolute;
  right: -32px;
  top: 4px;
  font-size: 10px;
  opacity: 0.3;
  font-family: monospace;
  font-style: normal; /* Removed italic */
  white-space: nowrap;
}

.progress-track {
  height: 192px;
  width: 1px;
  background: rgba(255, 255, 255, 0.05);
  position: relative;
}

.progress-indicator {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 16px;
  border: 1px solid #22d3ee;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: top 0.5s ease-in-out;
}

.indicator-line {
  width: 1px;
  height: 8px;
  background: #22d3ee;
}

/* 主内容区 */
.main-content {
  padding-top: 96px;
  min-height: 100vh;
  width: 100%;
  position: relative;
  box-sizing: border-box;
}

/* Footer */
.app-footer {
  position: fixed;
  bottom: 0px;
  left: 24px;
  z-index: 90;
  font-size: 8px;
  letter-spacing: 0.4em;
  opacity: 0.3;
  text-transform: uppercase;
  padding-bottom: 16px; 
}

/* 颜色工具类 */
.dark-cyan { color: #22d3ee; }

/* 路由转场 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
