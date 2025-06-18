"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useState } from "react";
import { FaBold, FaItalic, FaUnderline, FaLink, FaPlus } from "react-icons/fa";

export default function ProfessionalEditor() {
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
                placeholder: "Tell your story...",
            }),
        ],
        content: "",
        editorProps: {
            attributes: {
                class: "prose prose-lg max-w-2xl mx-auto focus:outline-none min-h-[300px] py-6 px-4",
            },
        },
        onUpdate: ({ editor }) => {
            const text = editor.getText();
            const words = text.trim() ? text.trim().split(/\s+/).filter(word => word.length > 0) : [];
            setWordCount(words.length);
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
        return <div className="min-h-[300px] flex items-center justify-center">Loading editor...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="flex justify-end mb-2">
                <div className="text-sm text-gray-500">{wordCount} words</div>
            </div>

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full text-5xl font-serif font-light focus:outline-none placeholder:text-gray-300 mb-8"
            />

            <div className="relative">
                <div className="absolute -left-20 top-0 flex flex-col gap-1 p-2">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        isActive={editor.isActive("bold")}
                        title="Bold"
                    >
                        <FaBold className="text-sm" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        isActive={editor.isActive("italic")}
                        title="Italic"
                    >
                        <FaItalic className="text-sm" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        isActive={editor.isActive("underline")}
                        title="Underline"
                    >
                        <FaUnderline className="text-sm" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={addLink}
                        isActive={editor.isActive("link")}
                        title="Add Link"
                    >
                        <FaLink className="text-sm" />
                    </ToolbarButton>
                    <div className="relative group">
                        <ToolbarButton
                            title="Add Image"
                        >
                            <FaPlus className="text-sm" />
                        </ToolbarButton>
                        <div className="absolute left-full ml-1 hidden group-hover:flex flex-col bg-white shadow-lg rounded-md overflow-hidden z-10 border border-gray-200">
                            <button
                                onClick={addImage}
                                className="px-3 py-2 text-sm text-left hover:bg-gray-50 whitespace-nowrap border-b border-gray-100"
                            >
                                From URL
                            </button>
                            <label className="px-3 py-2 text-sm text-left hover:bg-gray-50 cursor-pointer whitespace-nowrap">
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
            className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${isActive ? "bg-gray-100 text-black" : "text-gray-500"
                } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            title={title}
        >
            {children}
        </button>
    );
}