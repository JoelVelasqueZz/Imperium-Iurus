'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import LinkExt from '@tiptap/extension-link'
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link,
  Minus,
  Undo,
  Redo,
} from 'lucide-react'
import { useEffect } from 'react'

type Props = {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

function btn(action: () => boolean, active: boolean, Icon: React.ElementType, title: string) {
  return (
    <button
      type="button"
      title={title}
      onClick={action}
      className={`rounded p-1.5 transition-colors ${
        active
          ? 'bg-gold text-primary'
          : 'text-text-muted hover:bg-white/10 hover:text-gold'
      }`}
    >
      <Icon size={14} />
    </button>
  )
}

export default function TipTapEditor({ value, onChange, placeholder = 'Escribe el contenido aquí...' }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Placeholder.configure({ placeholder }),
      LinkExt.configure({ openOnClick: false, HTMLAttributes: { class: 'text-gold underline' } }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none min-h-[280px] px-5 py-4 text-sm font-light leading-8 text-text-light focus:outline-none',
      },
    },
  })

  // Sync value when parent changes (e.g. load from DB)
  useEffect(() => {
    if (!editor) return
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value)
    }
  }, [editor, value])

  if (!editor) return null

  function setLink() {
    const prev = editor?.getAttributes('link').href as string | undefined
    const url  = window.prompt('URL del enlace (deja vacío para eliminar):', prev ?? '')
    if (url === null) return
    if (url === '') {
      editor?.chain().focus().unsetLink().run()
    } else {
      editor?.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div className="border border-border bg-card-bg">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-border px-2 py-1.5">
        {btn(() => editor.chain().focus().toggleBold().run(),        editor.isActive('bold'),           Bold,         'Negrita')}
        {btn(() => editor.chain().focus().toggleItalic().run(),      editor.isActive('italic'),         Italic,       'Cursiva')}
        <div className="mx-1 h-4 w-px bg-border" />
        {btn(() => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive('heading', { level: 2 }), Heading2, 'Título H2')}
        {btn(() => editor.chain().focus().toggleHeading({ level: 3 }).run(), editor.isActive('heading', { level: 3 }), Heading3, 'Título H3')}
        <div className="mx-1 h-4 w-px bg-border" />
        {btn(() => editor.chain().focus().toggleBulletList().run(),  editor.isActive('bulletList'),     List,         'Lista con viñetas')}
        {btn(() => editor.chain().focus().toggleOrderedList().run(), editor.isActive('orderedList'),    ListOrdered,  'Lista numerada')}
        <div className="mx-1 h-4 w-px bg-border" />
        <button
          type="button"
          title="Enlace"
          onClick={setLink}
          className={`rounded p-1.5 transition-colors ${editor.isActive('link') ? 'bg-gold text-primary' : 'text-text-muted hover:bg-white/10 hover:text-gold'}`}
        >
          <Link size={14} />
        </button>
        {btn(() => editor.chain().focus().setHorizontalRule().run(), false, Minus, 'Separador')}
        <div className="mx-1 h-4 w-px bg-border" />
        {btn(() => editor.chain().focus().undo().run(), false, Undo, 'Deshacer')}
        {btn(() => editor.chain().focus().redo().run(), false, Redo, 'Rehacer')}
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} />
    </div>
  )
}
