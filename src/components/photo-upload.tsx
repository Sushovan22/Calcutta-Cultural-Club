import { useEffect, useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { Camera, CheckCircle2, ImagePlus, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { photoSchema } from '@/lib/community-schemas';
import { uploadPhoto } from '@/lib/community.functions';

export function PhotoUpload({ onUploaded }: { onUploaded: () => Promise<unknown> }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const upload = useServerFn(uploadPhoto);
  useEffect(() => { if (!file) { setPreview(''); return; } const url = URL.createObjectURL(file); setPreview(url); return () => URL.revokeObjectURL(url); }, [file]);
  function choose(next: File | undefined) {
    setSuccess(false); setError('');
    if (!next) return;
    if (!['image/jpeg','image/png','image/webp'].includes(next.type) || next.size > 10 * 1024 * 1024) { setError('Choose a JPG, PNG, or WebP photo smaller than 10 MB.'); return; }
    setFile(next);
  }
  return <form className="upload-form" onSubmit={async e => {
    e.preventDefault(); setError(''); setSuccess(false);
    if (!file) { setError('Please choose your photo first.'); return; }
    const formElement = e.currentTarget;
    const fields = new FormData(formElement);
    const parsed = photoSchema.safeParse({ handle: fields.get('handle') || '', caption: fields.get('caption') || '' });
    if (!parsed.success) { setError('Please shorten your handle or caption.'); return; }
    const data = new FormData(); data.set('photo', file); data.set('handle', parsed.data.handle); data.set('caption', parsed.data.caption);
    setBusy(true);
    try { await upload({ data }); await onUploaded(); setFile(null); formElement.reset(); setSuccess(true); }
    catch (e) { setError(e instanceof Error ? e.message : 'Your photo could not be uploaded.'); }
    finally { setBusy(false); }
  }}>
    <label className={`upload-zone ${dragging ? 'dragging' : ''}`} onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); choose(e.dataTransfer.files[0]); }}>
      {preview ? <img className="upload-preview" src={preview} alt="Selected photo preview" /> : <ImagePlus />}
      <strong>{file ? file.name : 'Drop your favourite moment here'}</strong>
      <small>{file ? 'Click to choose a different photo' : 'or click to browse · JPG, PNG, WebP · up to 10 MB'}</small>
      <input type="file" aria-label="Your photo" accept="image/jpeg,image/png,image/webp" onChange={e => choose(e.target.files?.[0])} disabled={busy} />
    </label>
    <div className="form-grid"><label className="form-field">Instagram handle<input name="handle" placeholder="@yourhandle" maxLength={100} required /></label><label className="form-field">A little about your moment<input name="caption" placeholder="Your photo's story" maxLength={200} required /></label></div>
    {error && <p className="form-error" role="alert">{error}</p>}
    {success && <p className="form-success" role="status"><CheckCircle2 size={16} /> Your moment is now in the community gallery.</p>}
    <Button type="submit" variant="festival" disabled={busy}>{busy ? <LoaderCircle className="animate-spin" /> : <Camera />} {busy ? 'Uploading…' : 'Share your moment'} {!busy && <span aria-hidden="true">↗</span>}</Button>
    <p className="form-hint">Please include your handle and a short caption so your contest entry is complete.</p>
  </form>;
}