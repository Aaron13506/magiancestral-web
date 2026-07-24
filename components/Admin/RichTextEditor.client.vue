<template>
  <div class="rte">
    <div v-if="editor" class="rte-toolbar">
      <button type="button" :class="{ active: editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()"><b>B</b></button>
      <button type="button" :class="{ active: editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()"><i>I</i></button>
      <button type="button" :class="{ active: editor.isActive('strike') }" @click="editor.chain().focus().toggleStrike().run()"><s>S</s></button>
      <span class="rte-sep" />
      <button type="button" :class="{ active: editor.isActive('heading', { level: 2 }) }" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">H2</button>
      <button type="button" :class="{ active: editor.isActive('heading', { level: 3 }) }" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">H3</button>
      <button type="button" :class="{ active: editor.isActive('paragraph') }" @click="editor.chain().focus().setParagraph().run()">P</button>
      <span class="rte-sep" />
      <button type="button" :class="{ active: editor.isActive('bulletList') }" @click="editor.chain().focus().toggleBulletList().run()">• Lista</button>
      <button type="button" :class="{ active: editor.isActive('orderedList') }" @click="editor.chain().focus().toggleOrderedList().run()">1. Lista</button>
      <button type="button" :class="{ active: editor.isActive('blockquote') }" @click="editor.chain().focus().toggleBlockquote().run()">Cita</button>
      <span class="rte-sep" />
      <button type="button" :class="{ active: editor.isActive('link') }" @click="setLink">Enlace</button>
      <button type="button" :disabled="!editor.isActive('link')" @click="editor.chain().focus().unsetLink().run()">Quitar enlace</button>
      <span class="rte-sep" />
      <button type="button" @click="editor.chain().focus().undo().run()">Deshacer</button>
      <button type="button" @click="editor.chain().focus().redo().run()">Rehacer</button>
    </div>
    <EditorContent :editor="editor" class="rte-content" />
  </div>
</template>

<script setup>
import { onBeforeUnmount, watch } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'

const props = defineProps({
  modelValue: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])

const editor = new Editor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Link.configure({ openOnClick: false, autolink: true })
  ],
  onUpdate: ({ editor: ed }) => {
    emit('update:modelValue', ed.getHTML())
  }
})

watch(() => props.modelValue, (value) => {
  if (value === editor.getHTML()) return
  editor.commands.setContent(value || '', false)
})

const setLink = () => {
  const previousUrl = editor.getAttributes('link').href
  const url = window.prompt('URL del enlace', previousUrl || 'https://')
  if (url === null) return
  if (url === '') {
    editor.chain().focus().unsetLink().run()
    return
  }
  editor.chain().focus().setLink({ href: url }).run()
}

onBeforeUnmount(() => {
  editor.destroy()
})
</script>

<style scoped>
.rte {
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
}
.rte-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 8px;
  background: #fafafa;
  border-bottom: 1px solid #eee;
}
.rte-toolbar button {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 9px;
  font-size: 0.82rem;
  cursor: pointer;
  color: #444;
}
.rte-toolbar button:hover {
  border-color: #b3a85a;
}
.rte-toolbar button.active {
  background: #b3a85a;
  border-color: #b3a85a;
  color: #fff;
}
.rte-toolbar button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.rte-sep {
  width: 1px;
  background: #e2e2e2;
  margin: 2px 4px;
}
.rte-content {
  padding: 12px 14px;
  min-height: 220px;
  max-height: 480px;
  overflow-y: auto;
}
.rte-content :deep(.ProseMirror) {
  outline: none;
  min-height: 200px;
}
.rte-content :deep(p) {
  margin: 0 0 0.8em;
}
.rte-content :deep(h2) {
  font-size: 1.4rem;
  margin: 0.6em 0 0.4em;
}
.rte-content :deep(h3) {
  font-size: 1.15rem;
  margin: 0.6em 0 0.4em;
}
.rte-content :deep(ul),
.rte-content :deep(ol) {
  padding-left: 1.4em;
  margin: 0 0 0.8em;
}
.rte-content :deep(blockquote) {
  border-left: 3px solid #b3a85a;
  margin: 0 0 0.8em;
  padding-left: 1em;
  color: #666;
  font-style: italic;
}
</style>
