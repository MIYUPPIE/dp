'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Globe, Instagram } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

const FLIER_ASSET = '/assets/bg.jpg';
const NAV_LINKS = [
  { label: 'Spiritlife Home', href: 'https://spiritlifecns.com/' },
  { label: 'Anniversary', href: 'https://spiritlifecns.com/' }
];
const SOCIAL_LINKS = [
  { href: 'https://facebook.com/spiritlife', icon: Facebook, label: 'Facebook' },
  { href: 'https://instagram.com/spiritlife', icon: Instagram, label: 'Instagram' },
  { href: 'https://spiritlife.example.com/', icon: Globe, label: 'Website' }
];

export default function Getdp() {
  const [name, setName] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [editedFlierUrl, setEditedFlierUrl] = useState(null);
  const [isFlierReady, setIsFlierReady] = useState(false);
  const [uploadResetCounter, setUploadResetCounter] = useState(0);

  const canvasRef = useRef(null);
  const flierImageRef = useRef(null);

  const sanitizedName = useMemo(() => name.trim(), [name]);

  const drawName = useCallback(
    (ctx) => {
      if (!sanitizedName) return;
      ctx.save();
      ctx.font = '30px "Montserrat", sans-serif';
	  ctx.fillStyle = '#ffffffff';
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(255, 255, 255, 1)';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.fillText(sanitizedName, ctx.canvas.width * 0.7, ctx.canvas.height * 0.82);
      ctx.restore();
    },
    [sanitizedName]
  );

  const generateCompositedImage = useCallback(() => {
    if (!canvasRef.current || !flierImageRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const baseFlier = flierImageRef.current;

    canvas.width = baseFlier.width;
    canvas.height = baseFlier.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseFlier, 0, 0);
    const userImgX = canvas.width * 0.7;
    const userImgY = canvas.height * 0.6;
    const radius = Math.min(canvas.width, canvas.height) * 0.25;
    const sides = 6;

    const clipPolygon = () => {
      ctx.beginPath();
      for (let i = 0; i < sides; i += 1) {
        const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
        const x = userImgX + radius * Math.cos(angle);
        const y = userImgY + radius * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
    };

    if (userImage?.preview && typeof window !== 'undefined') {
      const currentPreview = userImage.preview;
      const img = new window.Image();
      img.src = currentPreview;
      img.onload = () => {
  ctx.save();
  clipPolygon();
  ctx.clip();
// image positioning
        const targetSize = radius * 2;
        const scale = Math.max(targetSize / img.width, targetSize / img.height);
        const drawWidth = img.width * scale;
        const drawHeight = img.height * scale;
        const drawX = userImgX - drawWidth / 2;
        const drawY = userImgY - drawHeight / 2.2;

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

        ctx.restore();
        drawName(ctx);
        setEditedFlierUrl(canvas.toDataURL('image/png'));
      };
      img.onerror = () => {
        drawName(ctx);
        setEditedFlierUrl(canvas.toDataURL('image/png'));
      };
      return;
    }

    drawName(ctx);
    setEditedFlierUrl(canvas.toDataURL('image/png'));
  }, [drawName, userImage]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const img = new window.Image();
    img.src = FLIER_ASSET;
    img.onload = () => {
      flierImageRef.current = img;
      setIsFlierReady(true);
    };
  }, []);

  useEffect(() => {
    if (!isFlierReady) return;
    generateCompositedImage();
  }, [generateCompositedImage, isFlierReady, sanitizedName, userImage]);

  const handleDownload = () => {
    if (!editedFlierUrl) {
      alert('Please enter your name and upload an image first.');
      return;
    }

    const link = document.createElement('a');
    link.href = editedFlierUrl;
  link.download = `Spiritlife-10th-Anniversary-${(sanitizedName || 'guest').replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setName('');
    setUserImage(null);
    setEditedFlierUrl(null);
    setUploadResetCounter((count) => count + 1);
  };

  return (
    <div className="w-full max-w-6xl space-y-16" data-testid="getdp-root">
      <header className="border-b border-white/10 pb-10">
        <nav className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <ul className="flex gap-8 text-sm uppercase tracking-widest text-highlight">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label} className="transition hover:text-accent">
                <Link href={href} target="_blank" rel="noreferrer">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="https://spiritlifecns.com/" className="flex items-center justify-center" target="_blank" rel="noreferrer">
            <Image
              src="/logo.png"
              alt="Spiritlife 10th Anniversary logo"
              width={72}
              height={72}
              className="h-16 w-16 object-contain"
              priority
            />
          </Link>
        </nav>
      </header>

      <section className="space-y-10 rounded-3xl border border-white/10 bg-secondary/70 p-6 shadow-2xl shadow-glow backdrop-blur">
        <header className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Spiritlife 10th Year Anniversary</p>
          <h1 className="mt-4 text-3xl font-bold text-highlight md:text-4xl">
            Design Your Spiritlife Display Picture
          </h1>
          <p className="mt-2 text-base text-highlight/80">
            Celebrate a decade of Spiritlife stories by blending your photo and name into the official commemorative artwork.
          </p>
        </header>

        <canvas ref={canvasRef} className="hidden" />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl bg-secondary/60 p-6">
            <form
              className="flex flex-col gap-8"
              onSubmit={(event) => {
                event.preventDefault();
                generateCompositedImage();
              }}
            >
              <label className="flex flex-col gap-3 text-sm font-semibold text-accent">
                <span>Your Name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Kindly input your name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-base text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
                />
              </label>

              <div className="flex flex-col gap-3 text-sm font-semibold text-accent">
                <span>Upload Image</span>
                <ImageUpload key={uploadResetCounter} onImageUploaded={setUserImage} />
              </div>

              <button
                type="submit"
                className="rounded-xl bg-accent py-3 font-semibold text-white transition hover:bg-accentAlt focus:outline-none focus:ring-4 focus:ring-accent/40"
              >
                Refresh Preview
              </button>
            </form>
          </div>

          <div className="flex flex-col items-center justify-center rounded-2xl bg-secondary/80 p-6">
            <img
              src={editedFlierUrl || FLIER_ASSET}
              alt="Spiritlife DP preview"
              className="w-full max-h-[500px] rounded-2xl object-contain shadow-glow"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={handleDownload}
            disabled={!editedFlierUrl}
            className="w-full rounded-2xl bg-accent py-4 text-lg font-semibold text-white transition hover:bg-accentAlt disabled:cursor-not-allowed disabled:bg-accent/40"
          >
            Download Your Spiritlife DP
          </button>
          {!editedFlierUrl && (
            <p className="mt-3 text-sm text-neutral-400">
              Enter your name and upload a photo to enable the download button.
            </p>
          )}
        </div>
      </section>

      <footer className="flex flex-col items-center gap-6 border-t border-white/10 pt-10 text-center text-sm text-neutral-400 md:flex-row md:justify-between">
        <div className="flex gap-5">
          {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
            <Link key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
              <Icon strokeWidth={0.75} className="text-white transition hover:text-accent" />
            </Link>
          ))}
        </div>
        <p>&copy; {new Date().getFullYear()} Spiritlife. Celebrating 10 years of Infinite Praise.</p>
      </footer>
    </div>
  );
}
