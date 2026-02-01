<template>
  <div class="barcode-section">
    <svg :width="width" :height="height" xmlns="http://www.w3.org/2000/svg">
      <g class="barcode-group">
        <rect x="0" y="0" width="3" :height="barHeight" :fill="color"/>
        <rect x="5" y="0" width="2" :height="barHeight" :fill="color"/>
        <rect x="9" y="0" width="4" :height="barHeight" :fill="color"/>
        <rect x="15" y="0" width="2" :height="barHeight" :fill="color"/>
        <rect x="19" y="0" width="3" :height="barHeight" :fill="color"/>
        <rect x="24" y="0" width="1" :height="barHeight" :fill="color"/>
        <rect x="27" y="0" width="4" :height="barHeight" :fill="color"/>
        <rect x="33" y="0" width="2" :height="barHeight" :fill="color"/>
        <rect x="37" y="0" width="3" :height="barHeight" :fill="color"/>
        <rect x="42" y="0" width="1" :height="barHeight" :fill="color"/>
        <rect x="45" y="0" width="2" :height="barHeight" :fill="color"/>
        <rect x="49" y="0" width="4" :height="barHeight" :fill="color"/>
        <rect x="55" y="0" width="2" :height="barHeight" :fill="color"/>
        <rect x="59" y="0" width="3" :height="barHeight" :fill="color"/>
        <rect x="64" y="0" width="1" :height="barHeight" :fill="color"/>
        <rect x="67" y="0" width="4" :height="barHeight" :fill="color"/>
        <rect x="73" y="0" width="2" :height="barHeight" :fill="color"/>
      </g>
    </svg>
    <div v-if="text" class="barcode-id" :style="{ color: textColor || color }">{{ text }}</div>
  </div>
</template>

<script setup>
defineProps({
  width: { type: [Number, String], default: 180 },
  height: { type: [Number, String], default: 40 },
  barHeight: { type: [Number, String], default: 30 },
  color: { type: String, default: '#F4D03F' },
  text: { type: String, default: '' },
  textColor: { type: String, default: '' }
})
</script>

<style scoped>
.barcode-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* 默认右对齐，与原设计一致 */
}

.barcode-id {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  margin-top: 4px;
}
</style>
