import { z } from 'zod';

export const interests = ['Social work', 'Cultural activities', 'Fun tourism', 'Others'] as const;
export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.').max(100),
  email: z.string().trim().email('Please enter a valid email address.').max(255),
  phone: z.string().trim().regex(/^\+?[0-9 ()-]{7,25}$/, 'Please enter a valid phone number.').refine(v => v.replace(/\D/g, '').length >= 7, 'Please enter a valid phone number.'),
  interest: z.enum(interests),
  thought: z.string().trim().max(1000).default(''),
}).superRefine((value, ctx) => {
  if (value.interest === 'Others' && !value.thought) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['thought'], message: 'Please tell us your thought.' });
});
export type ContactInput = z.infer<typeof contactSchema>;
export const photoSchema = z.object({
  handle: z.string().trim().min(1, 'Please enter your Instagram handle.').max(100),
  caption: z.string().trim().min(1, 'Please tell us a little about your moment.').max(200),
});