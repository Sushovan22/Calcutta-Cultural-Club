import { useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { ArrowUpRight, CheckCircle2, LoaderCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { contactSchema, interests } from '@/lib/community-schemas';
import { submitContact } from '@/lib/community.functions';

export function ContactDialog({ open, onOpenChange, initialInterest }: { open: boolean; onOpenChange: (value: boolean) => void; initialInterest: string }) {
  const [interest, setInterest] = useState(initialInterest || 'Social work');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const submit = useServerFn(submitContact);
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="contact-dialog">
    <div className="eyebrow"><ArrowUpRight size={14} /> Be part of the community</div>
    <DialogTitle>Contact us</DialogTitle>
    <DialogDescription>Good things begin with a conversation.</DialogDescription>
    {success ? <div className="contact-success"><CheckCircle2 /><h3>Thank you for reaching out.</h3><p>Your request has been saved for the Cultural Club team.</p><Button variant="festival" onClick={() => onOpenChange(false)}>Done</Button></div> :
    <form className="contact-form" onSubmit={async event => {
      event.preventDefault(); setError('');
      const form = new FormData(event.currentTarget);
      const result = contactSchema.safeParse({
        name: form.get('name'),
        email: form.get('email'),
        phone: form.get('phone'),
        interest,
        thought: form.get('thought') || '',
      });
      if (!result.success) { setError(result.error.issues[0]?.message || 'Please check your details.'); return; }
      setBusy(true);
      try { await submit({ data: result.data }); setSuccess(true); }
      catch (e) { setError(e instanceof Error ? e.message : 'Your request could not be saved. Please try again.'); }
      finally { setBusy(false); }
    }}>
      <label className="form-field">Your name<input name="name" autoComplete="name" placeholder="Full name" maxLength={100} required /></label>
      <label className="form-field">Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={255} required /></label>
      <label className="form-field">Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" maxLength={25} required /></label>
      <label className="form-field">Interested section<select name="interest" value={interest} onChange={e => setInterest(e.target.value)}>{interests.map(item => <option key={item}>{item}</option>)}</select></label>
      {interest === 'Others' && <label className="form-field">Your thought<textarea name="thought" placeholder="Tell us what you have in mind…" rows={3} maxLength={1000} required /></label>}
      {error && <p role="alert" className="form-error">{error}</p>}
      <Button variant="festival" type="submit" disabled={busy}>{busy ? <LoaderCircle className="animate-spin" /> : <Send />} {busy ? 'Sending…' : 'Send request'}</Button>
      <p className="form-hint">Your details are stored on this device and only shared with the club team.</p>
    </form>}
  </DialogContent></Dialog>;
}