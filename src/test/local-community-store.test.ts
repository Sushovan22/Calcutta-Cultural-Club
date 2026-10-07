import { beforeEach, describe, expect, it } from 'vitest';
import { addCommunityPhoto, readCommunityPhotos, saveContactSubmission } from '@/lib/local-community-store';

describe('local community store', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('stores contact submissions locally', () => {
    const saved = saveContactSubmission({
      name: 'Test Visitor',
      email: 'visitor@example.com',
      phone: '+91 98765 43210',
      interest: 'Social work',
      thought: 'We should help the neighborhood.',
    });

    expect(saved.id).toBeTruthy();
    expect(JSON.parse(localStorage.getItem('cultural-club.contact-submissions') || '[]')).toHaveLength(1);
  });

  it('stores uploaded gallery photos locally', () => {
    addCommunityPhoto({
      handle: '@community',
      caption: 'A joyful afternoon',
      url: 'data:image/png;base64,abc123',
      path: 'gallery/local.png',
    });

    expect(readCommunityPhotos()).toHaveLength(1);
    expect(readCommunityPhotos()[0]?.caption).toBe('A joyful afternoon');
  });
});
