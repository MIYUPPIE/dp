"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

const IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export default function ImageUpload({ onImageUploaded }) {
	const [previewUrl, setPreviewUrl] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => () => {
		if (previewUrl) URL.revokeObjectURL(previewUrl);
	}, [previewUrl]);

	const handleDrop = useCallback(
		(acceptedFiles, rejectedFiles) => {
			if (rejectedFiles?.length) {
				const reason = rejectedFiles[0]?.errors?.[0]?.message || "Unsupported file";
				setError(reason);
				setPreviewUrl(null);
				onImageUploaded?.(null);
				return;
			}

			const file = acceptedFiles?.[0];
			if (!file) return;

			const objectUrl = URL.createObjectURL(file);
			setPreviewUrl(objectUrl);
			setError(null);
			onImageUploaded?.({ file, preview: objectUrl });
		},
		[onImageUploaded]
	);

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragReject,
		isFileDialogActive,
	} = useDropzone({
		onDrop: handleDrop,
		accept: IMAGE_MIME_TYPES.reduce((acc, mime) => ({ ...acc, [mime]: [] }), {}),
		maxSize: MAX_SIZE,
		multiple: false,
	});

	const borderState = useMemo(() => {
		if (isDragReject || error) return "border-red-500/70";
		if (isDragActive || isFileDialogActive) return "border-accent";
		return "border-white/20";
	}, [error, isDragActive, isDragReject, isFileDialogActive]);

	return (
		<div className="flex flex-col gap-4">
			<div
				{...getRootProps({
					className: `rounded-2xl border-2 border-dashed ${borderState} bg-primary/40 p-6 text-center transition hover:border-accent focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/40`,
				})}
			>
				<input {...getInputProps()} aria-label="Upload display picture" />
				<p className="text-base text-white">
					{isDragActive ? "Drop the image to upload" : "Drag & drop an image here, or click to choose"}
				</p>
				<p className="mt-2 text-sm text-neutral-400">PNG, JPG or WEBP — max 5MB</p>
			</div>

			{previewUrl && (
				<div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-secondary/60 p-4">
					<p className="text-sm font-semibold text-accent">Preview</p>
					<img
						src={previewUrl}
						alt="Uploaded preview"
						className="max-h-48 w-full rounded-xl object-cover"
					/>
				</div>
			)}

			{error && <p className="text-sm text-red-400">{error}</p>}
		</div>
	);
}

