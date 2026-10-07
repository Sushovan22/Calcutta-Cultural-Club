import { describe, expect, it } from 'vitest';
import { contactSchema, interests, photoSchema } from '@/lib/community-schemas';

const valid = { name: 'Visitor', email: 'visitor@example.com', phone: '+91 98765 43210', thought: '' };
describe('Contact interest requirements', () => {
  it('offers exactly the four requested activities', () => {
    expect([...interests]).toEqual(['Social work', 'Cultural activities', 'Fun tourism', 'Others']);
    expect(contactSchema.safeParse({ ...valid, interest: 'Menu' }).success).toBe(false);
  });
  it('requires a visitor thought for Others', () => {
    expect(contactSchema.safeParse({ ...valid, interest: 'Others' }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, interest: 'Others', thought: 'A community book exchange' }).success).toBe(true);
  });
  it('accepts the other three interests without a thought', () => {
    for (const interest of interests.slice(0,3)) expect(contactSchema.safeParse({ ...valid, interest }).success).toBe(true);
  });
  it('requires name and phone', () => {
    expect(contactSchema.safeParse({ ...valid, name: '', interest: 'Social work' }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, phone: 'invalid', interest: 'Social work' }).success).toBe(false);
  });
  it('requires a handle and caption for photo contest submissions', () => {
    expect(photoSchema.safeParse({ handle: '', caption: 'Great day' }).success).toBe(false);
    expect(photoSchema.safeParse({ handle: 'community', caption: '' }).success).toBe(false);
    expect(photoSchema.safeParse({ handle: 'community', caption: 'Great day' }).success).toBe(true);
  });
});