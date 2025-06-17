"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useState } from "react";
import { FaBold, FaItalic, FaUnderline, FaLink, FaUndo, FaRedo, FaPlus } from "react-icons/fa";

export default function CleanEditor() {
    const [title, setTitle] = useState("");
    const [wordCount, setWordCount] = useState(0);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Placeholder.configure({
                placeholder: "Start writing your content here...",
            }),
        ],
        content: "",
        editorProps: {
            attributes: {
                class: "prose prose-sm max-w-none focus:outline-none min-h-[300px] p-4",
            },
        },
        onUpdate: ({ editor }) => {
            const text = editor.getText();
            setWordCount(text.split(/\s+/).filter(word => word.length > 0).length);
        },
    });

    const addLink = () => {
        if (!editor) return;
        const url = window.prompt('Enter the URL');
        if (url) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }
    };

    const addImage = () => {
        if (!editor) return;

        const url = window.prompt('Enter the URL of the image:');

        if (url) {
            editor
                .chain()
                .focus()
                .setImage({ src: url })
                .run();
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editor || !e.target.files) return;

        const file = e.target.files[0];
        console.log(file);
    };

    if (!editor) {
        return <div className="min-h-[300px] bg-gray-50 rounded-lg flex items-center justify-center">Loading editor...</div>;
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
            <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">{wordCount} words</div>
            </div>

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Document title"
                className="w-full text-2xl font-medium focus:outline-none placeholder:text-gray-300 border-b pb-2 mb-2"
            />

            <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex gap-1 p-2 bg-gray-50 border-b">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        title="Undo"
                    >
                        <FaUndo />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        title="Redo"
                    >
                        <FaRedo />
                    </ToolbarButton>

                    <div className="w-px bg-gray-300 mx-1"></div>

                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        isActive={editor.isActive("bold")}
                        title="Bold"
                    >
                        <FaBold />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        isActive={editor.isActive("italic")}
                        title="Italic"
                    >
                        <FaItalic />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        isActive={editor.isActive("underline")}
                        title="Underline"
                    >
                        <FaUnderline />
                    </ToolbarButton>

                    <div className="w-px bg-gray-300 mx-1"></div>

                    <ToolbarButton
                        onClick={addLink}
                        isActive={editor.isActive("link")}
                        title="Add Link"
                    >
                        <FaLink />
                    </ToolbarButton>

                    <div className="w-px bg-gray-300 mx-1"></div>

                    <div className="relative group">
                        <ToolbarButton
                            title="Add Image"
                        >
                            <FaPlus />
                        </ToolbarButton>
                        <div className="absolute hidden group-hover:flex flex-col bg-white shadow-lg rounded-md overflow-hidden z-10">
                            <button
                                onClick={addImage}
                                className="px-3 py-2 text-sm text-left hover:bg-gray-100 whitespace-nowrap"
                            >
                                From URL
                            </button>
                            <label className="px-3 py-2 text-sm text-left hover:bg-gray-100 cursor-pointer whitespace-nowrap">
                                Upload Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

function ToolbarButton({
    onClick,
    isActive = false,
    disabled = false,
    title,
    children,
}: {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isActive?: boolean;
    disabled?: boolean;
    title?: string;
    children: React.ReactNode;
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${isActive ? "bg-gray-200 text-blue-600" : "text-gray-600"
                } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            title={title}
        >
            {children}
        </button>
    );
}