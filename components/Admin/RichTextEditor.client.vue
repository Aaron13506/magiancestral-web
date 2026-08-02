<template>
  <div class="a-rte">
    <div v-if="editor" class="a-rte__toolbar">
      <button type="button" class="a-rte__btn" :class="on('bold')" title="Negrita (Ctrl+B)" @click="run(c => c.toggleBold())">
        <i class="fas fa-bold" />
      </button>
      <button type="button" class="a-rte__btn" :class="on('italic')" title="Cursiva (Ctrl+I)" @click="run(c => c.toggleItalic())">
        <i class="fas fa-italic" />
      </button>
      <button type="button" class="a-rte__btn" :class="on('strike')" title="Tachado" @click="run(c => c.toggleStrike())">
        <i class="fas fa-strikethrough" />
      </button>

      <span class="a-rte__sep" />

      <button type="button" class="a-rte__btn" :class="on('paragraph')" title="Párrafo" @click="run(c => c.setParagraph())">P</button>
      <button type="button" class="a-rte__btn" :class="on('heading', { level: 2 })" title="Título" @click="run(c => c.toggleHeading({ level: 2 }))">H2</button>
      <button type="button" class="a-rte__btn" :class="on('heading', { level: 3 })" title="Subtítulo" @click="run(c => c.toggleHeading({ level: 3 }))">H3</button>

      <span class="a-rte__sep" />

      <button type="button" class="a-rte__btn" :class="on('bulletList')" title="Lista con viñetas" @click="run(c => c.toggleBulletList())">
        <i class="fas fa-list-ul" />
      </button>
      <button type="button" class="a-rte__btn" :class="on('orderedList')" title="Lista numerada" @click="run(c => c.toggleOrderedList())">
        <i class="fas fa-list-ol" />
      </button>
      <button type="button" class="a-rte__btn" :class="on('blockquote')" title="Cita" @click="run(c => c.toggleBlockquote())">
        <i class="fas fa-quote-right" />
      </button>
      <button type="button" class="a-rte__btn" title="Separador" @click="run(c => c.setHorizontalRule())">
        <i class="fas fa-minus" />
      </button>

      <span class="a-rte__sep" />

      <button type="button" class="a-rte__btn" :class="on('link')" title="Insertar enlace" @click="linkOpen = true">
        <i class="fas fa-link" />
      </button>
      <button
        type="button"
        class="a-rte__btn"
        title="Quitar enlace"
        :disabled="!editor.isActive('link')"
        @click="run(c => c.unsetLink())"
      >
        <i class="fas fa-unlink" />
      </button>

      <span class="a-rte__sep" />

      <button type="button" class="a-rte__btn" title="Deshacer (Ctrl+Z)" :disabled="!editor.can().undo()" @click="run(c => c.undo())">
        <i class="fas fa-undo" />
      </button>
      <button type="button" class="a-rte__btn" title="Rehacer (Ctrl+Y)" :disabled="!editor.can().redo()" @click="run(c => c.redo())">
        <i class="fas fa-redo" />
      </button>

      <span class="a-grow" />

      <button type="button" class="a-rte__btn" :class="{ 'a-rte__btn--on': htmlMode }" title="Editar el HTML" @click="toggleHtmlMode">
        &lt;/&gt;
      </button>
    </div>

    <textarea
      v-if="htmlMode"
      v-model="htmlDraft"
      class="a-textarea a-mono"
      style="border: none; border-radius: 0; min-height: 300px;"
      spellcheck="false"
    />
    <EditorContent v-else :editor="editor" class="a-rte__area" />

    <div class="a-rte__foot">
      <span>{{ words }} palabras</span>
      <span>{{ characters }} caracteres</span>
      <span class="a-grow" />
      <span v-if="htmlMode">Los cambios del HTML se aplican al volver al editor visual</span>
    </div>

    <!-- Diálogo de enlace: sustituye a window.prompt(), que bloquea el hilo -->
    <Teleport to="body">
      <div v-if="linkOpen" class="admin-shell a-modal-backdrop" @click.self="linkOpen = false">
        <div class="a-modal">
          <div class="a-modal__head">
            <h3>Insertar enlace</h3>
            <button type="button" class="a-btn a-btn--subtle a-btn--icon" @click="linkOpen = false">
              <i class="fas fa-times" />
            </button>
          </div>
          <div class="a-modal__body">
            <div class="a-field">
              <label class="a-field__label" for="rte-link">URL</label>
              <input
                id="rte-link"
                v-model="linkDraft"
                type="text"
                class="a-input"
                placeholder="https://ejemplo.com"
                @keydown.enter.prevent="applyLink"
              >
              <span class="a-field__hint">Se aplica al texto seleccionado. Déjalo vacío para quitar el enlace.</span>
            </div>
          </div>
          <div class="a-modal__foot">
            <button type="button" class="a-btn a-btn--ghost" @click="linkOpen = false">Cancelar</button>
            <button type="button" class="a-btn a-btn--primary" @click="applyLink">Aplicar</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { stripHtml } from '~/utils/format'

const props = defineProps({
  modelValue: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])

const linkOpen = ref(false)
const linkDraft = ref('')
const htmlMode = ref(false)
const htmlDraft = ref('')

// `shallowRef` evita que Vue haga reactiva toda la instancia de TipTap.
const editor = shallowRef(new Editor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: 'noopener', target: '_blank' } })
  ],
  onUpdate: ({ editor: instance }) => {
    emit('update:modelValue', instance.getHTML())
  }
}))

watch(() => props.modelValue, (value) => {
  if (htmlMode.value) return
  if (!editor.value || value === editor.value.getHTML()) return
  editor.value.commands.setContent(value || '', false)
})

const plainText = computed(() => stripHtml(props.modelValue))
const words = computed(() => (plainText.value ? plainText.value.split(/\s+/).length : 0))
const characters = computed(() => plainText.value.length)

const on = (name, attrs) => ({ 'a-rte__btn--on': editor.value?.isActive(name, attrs) })

const run = (command) => {
  if (!editor.value) return
  command(editor.value.chain().focus()).run()
}

const toggleHtmlMode = () => {
  if (htmlMode.value) {
    // Volver al editor visual: TipTap normaliza el HTML que se haya escrito.
    editor.value?.commands.setContent(htmlDraft.value || '', false)
    emit('update:modelValue', editor.value?.getHTML() || '')
    htmlMode.value = false
  } else {
    htmlDraft.value = props.modelValue || ''
    htmlMode.value = true
  }
}

watch(htmlDraft, (value) => {
  if (htmlMode.value) emit('update:modelValue', value)
})

watch(linkOpen, (open) => {
  if (open) linkDraft.value = editor.value?.getAttributes('link').href || 'https://'
})

const applyLink = () => {
  const url = linkDraft.value.trim()
  if (!url || url === 'https://') {
    run(c => c.unsetLink())
  } else {
    run(c => c.extendMarkRange('link').setLink({ href: url }))
  }
  linkOpen.value = false
}

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>
