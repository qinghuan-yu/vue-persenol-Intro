<template>
  <section class="projects-container">
    <div class="layer-content">
      <div class="projects-grid">
        <!-- Logic Content -->
        <div class="projects-list-section">
          <div class="section-header">
            <h3 class="projects-title">Projects</h3>
            <p class="projects-subtitle">Ongoing Development Logs</p>
          </div>

          <div class="project-list">
            <a v-for="(proj, i) in projects" :key="i" :href="proj.link" target="_blank" class="project-card group">
              <div class="card-top">
                <span class="card-id">ACTIVE_NODE_0{{ i+1 }}</span>
                <span class="card-type">{{ proj.type }}</span>
              </div>
              <h4 class="card-title">{{ proj.title }}</h4>
            </a>
          </div>
        </div>

        <!-- Visual Content -->
        <div class="projects-visual-section">
          <div class="visual-box group">
            <div class="visual-overlay"></div>
            <!-- Placeholder Image -->
            <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200" alt="Hardware" class="visual-img" />
            <div class="visual-tag">
              <div class="tag-badge">
                <span>VISUALIZING PERFORMANCE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const projects = [
  { type: 'WEB', title: 'gif-player: 逐帧 GIF 控制器', link: 'https://github.com/qinghuan-yu/gif-player' },
  { type: 'WEB', title: 'vue-piano: 基于 Vue 的交互式钢琴', link: 'https://github.com/qinghuan-yu/vue-piano' },
  { type: 'CORE', title: 'Pianalysis: 钢琴演奏分析系统', link: 'https://github.com/qinghuan-yu/Pianalysis' },
];
</script>

<style scoped>
.projects-container {
  min-height: 80vh;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.layer-content {
  display: flex;
  align-items: center;
  padding: 24px;
}
@media (min-width: 1024px) {
  .layer-content { padding: 96px; }
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  width: 100%;
  align-items: center;
}
@media (min-width: 1024px) {
  .projects-grid { grid-template-columns: 5fr 7fr; }
}

.section-header {
  margin-bottom: 32px;
}

.projects-title {
  font-size: 36px;
  font-weight: 500;
  font-style: normal;
  letter-spacing: -0.025em;
  color: #22d3ee;
  text-transform: uppercase;
  line-height: 1;
  margin: 0 0 8px 0;
}

.projects-subtitle {
  font-size: 10px;
  letter-spacing: 0.4em;
  opacity: 0.4;
  text-transform: uppercase;
  margin: 0;
}

.project-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.project-card {
  display: block;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 20px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
}

.project-card:hover {
  background: rgba(34, 211, 238, 0.05);
  border-color: rgba(34, 211, 238, 0.5);
  transform: translateX(10px);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.card-id {
  font-size: 9px;
  font-family: monospace;
  color: #22d3ee;
  opacity: 0.6;
}

.card-type {
  font-size: 9px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  text-transform: uppercase;
  opacity: 0.5;
  letter-spacing: 0.05em;
}

.card-title {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 0;
  transition: color 0.3s;
}
.project-card:hover .card-title {
  color: #22d3ee;
}

/* Visual Section */
.visual-box {
  width: 100%;
  aspect-ratio: 16/9;
  background: #18181b; /* zinc-900 */
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.visual-overlay {
  position: absolute;
  inset: 0;
  background: rgba(34, 211, 238, 0.05);
  mix-blend-mode: overlay;
  z-index: 10;
}

.visual-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  opacity: 0.3;
  transition: transform 2s;
}
.visual-box:hover .visual-img {
  transform: scale(1.1);
}

.visual-tag {
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 20;
}

.tag-badge {
  background: rgba(0, 0, 0, 0.8);
  padding: 8px 16px;
  border-left: 2px solid #22d3ee;
}

.tag-badge span {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
}
</style>
