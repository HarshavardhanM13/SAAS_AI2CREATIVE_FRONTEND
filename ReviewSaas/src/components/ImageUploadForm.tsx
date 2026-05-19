import { useState } from "react";

interface Props {
  onGenerate: (data: FormData) => void;
}

export default function ImageUploadForm({ onGenerate }: Props) {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = () => {
  if (!file) {
    alert("Upload image");
    return;
  }

  const formData = new FormData();
  formData.append("user_prompt", prompt);
  formData.append("user_style", style);
  formData.append("file", file);

  onGenerate(formData); // ✅ MUST pass FormData directly
};

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Image → Image</h3>

      <input
        placeholder="Prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <input
        placeholder="Style"
        value={style}
        onChange={(e) => setStyle(e.target.value)}
      />

      {/* 🔥 File Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <button onClick={handleSubmit}>
        Generate from Image
      </button>
    </div>
  );
}