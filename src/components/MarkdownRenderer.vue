<template>
  <div class="markdown-body" v-html="htmlContent"></div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css'; 

const props = defineProps({
  source: String // 传入的 md 原始内容
});

const htmlContent = ref('');
const metadata = ref({});

const init = async () => {
    if (!props.source) return;

    let content = props.source;
    let metadataObj = {};

    // 1. Simple Regex Frontmatter Parser
    const fmRegex = /^---\r?\n([\s\S]+?)\r?\n---/;
    const match = props.source.match(fmRegex);

    if (match) {
        const rawFm = match[1];
        content = props.source.replace(fmRegex, '').trim();
        
        rawFm.split('\n').forEach(line => {
            const parts = line.split(':');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                let value = parts.slice(1).join(':').trim();
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.slice(1, -1);
                }
                metadataObj[key] = value;
            }
        });
        emit('metadata', metadataObj);
        metadata.value = metadataObj;
    }

    // 2. Configure Markdown-it with Highlight.js
    const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return '<pre class="hljs"><code>' +
                        hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                        '</code></pre>';
                } catch (__) {}
            }
            return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
        }
    });

    htmlContent.value = md.render(content);
};

const emit = defineEmits(['metadata']);

watchEffect(() => {
    if (props.source) init();
});
</script>

<style>
/* Global Markdown Styles Override for Transparency */
.markdown-body {
  background-color: transparent !important;
  font-family: 'Space Grotesk', 'Noto Sans SC', sans-serif;
  color: #e6e6e6;
  line-height: 1.6;
}

.markdown-body h1, .markdown-body h2, .markdown-body h3 {
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 0.3em;
  color: #fff;
  margin-top: 1.5em;
}

.markdown-body blockquote {
  border-left: 4px solid #61b1d6; /* Accent Color */
  color: #8b949e;
  padding-left: 1em;
  background: rgba(255,255,255,0.05); /* Slight bg for quote */
}

.markdown-body a {
  color: #61b1d6;
  text-decoration: none;
}
.markdown-body a:hover {
  text-decoration: underline;
}

/* Highlight.js Code Block Styles */
.markdown-body pre.hljs {
  background-color: #0d1117 !important; /* GitHub Dark BG */
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.1);
  overflow-x: auto;
}

.markdown-body code {
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  background: rgba(255,255,255,0.1);
  padding: 0.2em 0.4em;
  border-radius: 3px;
}
.markdown-body pre code {
  background: transparent;
  padding: 0;
}

.markdown-body table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
}
.markdown-body table th, .markdown-body table td {
    border: 1px solid rgba(255,255,255,0.2);
    padding: 8px 12px;
}
</style>
