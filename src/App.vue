<template>
  <div id="app" @wheel="handleScroll">
    <div :class="['sidebar-toggle', { 'is-active': isSidebarOpen }]" @click="toggleSidebar">
      MENU
    </div>

    <transition name="fade">
      <div class="overlay" v-if="isSidebarOpen" @click="toggleSidebar"></div>
    </transition>

    <nav :class="['sidebar', { 'is-open': isSidebarOpen }]">
      <div class="sidebar-content">
        <div class="vertical-line"></div>
        <div class="sidebar-buttons">
          <button class="sidebar-button" @click="navigateAndCloseSidebar('/')">介绍</button>
          <button class="sidebar-button" @click="navigateAndCloseSidebar('/')">合作</button>
          <button class="sidebar-button" @click="navigateAndCloseSidebar('/saturn-system')">3D星系</button>
          <button class="sidebar-button" @click="navigateAndCloseSidebar('/')">联系方式</button>
        </div>
      </div>
    </nav>

    <div class="navbar">
      <router-link
        v-for="(item, index) in navItems"
        :key="index"
        :to="item.to"
        class="nav-button"
        active-class="is-active"
      >
        <div class="nav-text">
          <span class="cn-text">{{ item.name }}</span>
          <span class="en-text">{{ item.en_name }}</span>
        </div>
      </router-link>
    </div>

    <div class="page-container">
      <hr class="divider" />
      <div class="transition-viewport">
        <!-- New Pure CSS Transition Structure -->
        <router-view v-slot="{ Component, route }">
          <transition name="reveal">
            <div :key="route.path" class="transition-page-wrapper">
              <component :is="Component" class="page-content" />
              <div class="scan-line"></div>
            </div>
          </transition>
        </router-view>
      </div>
      <hr class="divider" />
    </div>

     <div class="info-panel">
      <button class="info-toggle" @click="toggleDescription">
        {{ showDescription ? '关闭' : '信息' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isSidebarOpen: false,
      showDescription: false,
      navItems: [
        { to: '/', name: '首页', en_name: 'Index' },
        { to: '/川蜀', name: '川蜀', en_name: 'ChuanShu' },
        { to: '/勾吴', name: '勾吴', en_name: 'GouWu' },
        { to: '/闽台', name: '闽台', en_name: 'MinTai' },
        { to: '/三秦', name: '三秦', en_name: 'SanQin' },
        { to: '/玉门', name: '玉门', en_name: 'YuMen' },
      ],
    };
  },
  methods: {
    handleScroll(event) {
      const activeTransition = document.querySelector('.reveal-enter-active, .reveal-leave-active');
      if (activeTransition) return;

      const delta = Math.sign(event.deltaY);
      const currentIndex = this.navItems.findIndex(item => item.to === this.$route.path);
      if (currentIndex === -1) return;

      const nextIndex = currentIndex + delta;
      
      if (nextIndex >= 0 && nextIndex < this.navItems.length) {
        this.$router.push(this.navItems[nextIndex].to);
      }
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    navigateAndCloseSidebar(path) {
      if (this.isSidebarOpen) {
        this.isSidebarOpen = false;
      }
      this.$router.push(path);
    },
    toggleDescription() {
      this.showDescription = !this.showDescription
    },
  },
};
</script>

<style>
/* --- Animation Variables --- */
:root {
  --tech-duration: 1.5s; /* Further slowed down for a more deliberate feel */
  --tech-ease: cubic-bezier(0.19, 1, 0.22, 1);
}

/* --- Keyframe Animations for Perfect Sync --- */
@keyframes reveal-animation {
  from {
    clip-path: inset(0 0 0 100%);
  }
  to {
    clip-path: inset(0 0 0 0%);
  }
}

@keyframes scan-line-animation {
  0% {
    left: 105%; /* Start further off-screen to the right */
    opacity: 0;
  }
  10% {
    opacity: 1; /* Fade in quickly */
  }
  90% {
    opacity: 1; /* Stay visible for the majority of the travel */
  }
  100% {
    left: -5%; /* End further off-screen to the left */
    opacity: 0; /* Fade out */
  }
}


/* --- Core Transition Layout --- */
.transition-viewport {
  position: relative;
  flex-grow: 1;
  overflow: hidden;
}

.transition-page-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000; /* Pure black background */
}

.page-content {
  width: 100%;
  height: 100%;
}

.scan-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #fff; /* White line */
  box-shadow: -2px 0 15px rgba(255, 255, 255, 0.7); /* White glow */
  z-index: 10;
  left: 105%; /* Set initial position consistent with keyframes */
  transform: translateX(-50%);
  opacity: 0; /* Hidden by default */
}

/* --- Enter Animation (New Keyframe-based) --- */
.reveal-enter-active {
  animation: reveal-animation var(--tech-duration) var(--tech-ease) forwards;
  z-index: 2; /* New page must be on top */
}
.reveal-enter-active .scan-line {
  animation: scan-line-animation var(--tech-duration) var(--tech-ease) forwards;
}

/* --- Leave Animation (Old page fades to back) --- */
.reveal-leave-active {
  transition: filter calc(var(--tech-duration) * 0.9) linear;
  z-index: 1; /* Old page sinks to the bottom */
}
.reveal-leave-to {
  filter: brightness(0.3) grayscale(0.5);
}

/* --- Empty transition classes to prevent Vue's default behavior if needed --- */
.reveal-enter-from, .reveal-enter-to, .reveal-leave-from {
  /* These are no longer needed for the enter animation */
}


/* --- Existing Styles --- */
.nav-button.is-active .cn-text {
  color: #61b1d6;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-color: #000; /* Changed to pure black */
}

/* ... Paste the rest of your original CSS here ... */
.sidebar-toggle {
  position: fixed; top: 20px; left: 40px; z-index: 1001;
  cursor: pointer; background: none; border: none; font-family: 'Font', sans-serif;
  font-size: 24px; color: #fff; transition: color 0.5s ease;
}
.sidebar-toggle.is-active { color: #61b1d6; }
.overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.5); z-index: 999;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.sidebar {
  position: fixed; left: -360px; top: 0; height: 100%; width: 360px;
  background: transparent; z-index: 1000; transition: left 0.6s ease; display: flex;
}
.sidebar.is-open { left: 0; }
.sidebar-content { display: flex; width: 100%; position: relative; }
.vertical-line {
  width: 1px; background-color: #fff; position: absolute; left: 100%;
  top: 0; bottom: 0; transform: translateX(-100%); transition: transform 0.4s ease;
}
.sidebar.is-open .vertical-line { transform: translateX(0); }
.sidebar-buttons {
  margin-top: 100px; margin-left: 40px; display: flex; flex-direction: column; align-items: flex-start;
}
.sidebar-button {
  background: none; border: none; padding: 0; margin-bottom: 90px; font-family: 'Font', sans-serif;
  font-size: 30px; color: #fff; cursor: pointer; transform: translateX(-100%);
  opacity: 0; transition: transform 0.4s ease, opacity 0.4s ease;
}
.sidebar.is-open .sidebar-button { transform: translateX(0); opacity: 1; }
.sidebar.is-open .sidebar-button:nth-child(1) { transition-delay: 0.1s; }
.sidebar.is-open .sidebar-button:nth-child(2) { transition-delay: 0.3s; }
.sidebar.is-open .sidebar-button:nth-child(3) { transition-delay: 0.5s; }
.sidebar.is-open .sidebar-button:nth-child(4) { transition-delay: 0.7s; }
.page-container {
  display: flex; flex-direction: column; flex-grow: 1; transition: filter 0.4s ease;
}
.sidebar.is-open ~ .page-container { filter: grayscale(80%); }
</style>