import { createServerFn } from '@tanstack/react-start';
import { contactSchema, photoSchema } from './community-schemas';
import { addCommunityPhoto, fileToDataUrl, readCommunityPhotos, saveContactSubmission } from './local-community-store';

export const submitContact = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const submission = saveContactSubmission({
      name: data.name,
      email: data.email,
      phone: data.phone,
      interest: data.interest,
      thought: data.interest === 'Others' ? data.thought : '',
    });

    return { id: submission.id, success: true };
  });

export const getPhotos = createServerFn({ method: 'GET' }).handler(async () => {
  const photos = readCommunityPhotos()
    .slice(0, 12)
    .map((photo) => ({
      id: photo.id,
      handle: photo.handle,
      caption: photo.caption,
      url: photo.url,
    }));

  return { photos, error: null };
});

export const uploadPhoto = createServerFn({ method: 'POST' })
  .inputValidator((input: FormData) => {
    if (!(input instanceof FormData)) throw new Error('Please select a photo.');
    return input;
  })
  .handler(async ({ data }) => {
    const file = data.get('photo');
    const meta = photoSchema.parse({ handle: data.get('handle') || '', caption: data.get('caption') || '' });

    if (!(file instanceof File) || !file.size || file.size > 10 * 1024 * 1024) {
      throw new Error('Choose a photo smaller than 10 MB.');
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      throw new Error('Choose a JPG, PNG, or WebP photo.');
    }

    const url = await fileToDataUrl(file);
    const path = `gallery/${globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`}.png`;

    addCommunityPhoto({
      path,
      handle: meta.handle || '@community',
      caption: meta.caption,
      url,
    });

    return { success: true };
  });