import { useState } from "react";

interface Props {
  onGenerate: (data: {
    user_prompt: string;
    user_style: string;
    file?: File | null;
  }) => void;
}

export default function PromptForm({ onGenerate }: Props) {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("cinematic");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onGenerate({
      user_prompt: prompt,
      user_style: style,
      file: file,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Text → Image + Logo</h3>

      <input
        type="text"
        placeholder="Enter prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <select value={style} onChange={(e) => setStyle(e.target.value)}>
        <option value="cinematic">Cinematic</option>
        <option value="dark">Dark</option>
        <option value="minimal">Minimal</option>
      </select>

      {/* 🔥 NEW: FILE INPUT */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button type="submit">Generate</button>
    </form>
  );
}