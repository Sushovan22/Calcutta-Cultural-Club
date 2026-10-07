export const activityKinds = ['Social work', 'Cultural activities', 'Fun tourism', 'Others'] as const;
export type ActivityKind = (typeof activityKinds)[number];

export type LocalContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  thought: string;
  createdAt: string;
};

export type LocalCommunityPhoto = {
  id: string;
  handle: string;
  caption: string;
  path: string;
  url: string;
  createdAt: string;
};

export type ActivityPhoto = {
  id: string;
  kind: ActivityKind;
  url: string;
  title: string;
  caption: string;
  createdAt: string;
};

const CONTACT_KEY = 'cultural-club.contact-submissions';
const PHOTOS_KEY = 'cultural-club.community-photos';
const ACTIVITY_PHOTOS_KEY = 'cultural-club.activity-photos';

const memoryStore: {
  contacts: LocalContactSubmission[];
  photos: LocalCommunityPhoto[];
} = {
  contacts: [],
  photos: [],
};

function getStorage(): Storage | undefined {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  return undefined;
}

function readJson<T>(key: string, fallback: T): T {
  const storage = getStorage();

  if (storage) {
    try {
      const raw = storage.getItem(key);
      if (raw) return JSON.parse(raw) as T;
    } catch (error) {
      console.warn(`[local-store] Unable to read ${key}`, error);
    }
  }

  return fallback;
}

function notifyStoreChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('community-store-updated'));
  }
}

function writeJson<T>(key: string, value: T) {
  const storage = getStorage();

  if (storage) {
    try {
      storage.setItem(key, JSON.stringify(value));
      notifyStoreChange();
    } catch (error) {
      console.warn(`[local-store] Unable to write ${key}`, error);
    }
  }
}

export function readContactSubmissions(): LocalContactSubmission[] {
  const records = readJson(CONTACT_KEY, memoryStore.contacts);
  memoryStore.contacts = records;
  return [...records];
}

export function saveContactSubmission(input: Omit<LocalContactSubmission, 'id' | 'createdAt'>): LocalContactSubmission {
  const record: LocalContactSubmission = {
    ...input,
    id: globalThis.crypto?.randomUUID?.() || `contact-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
  };

  const next = [record, ...readContactSubmissions()];
  memoryStore.contacts = next;
  writeJson(CONTACT_KEY, next);
  return record;
}

export function readCommunityPhotos(): LocalCommunityPhoto[] {
  const records = readJson(PHOTOS_KEY, memoryStore.photos);
  memoryStore.photos = records;
  return [...records];
}

export function addCommunityPhoto(input: Omit<LocalCommunityPhoto, 'id' | 'createdAt'>): LocalCommunityPhoto {
  const record: LocalCommunityPhoto = {
    ...input,
    id: globalThis.crypto?.randomUUID?.() || `photo-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
  };

  const next = [record, ...readCommunityPhotos()];
  memoryStore.photos = next;
  writeJson(PHOTOS_KEY, next);
  return record;
}

export async function fileToDataUrl(file: Blob): Promise<string> {
  const bytes = new Uint8Array(await file.arrayBuffer());

  let base64: string;
  if (typeof btoa === 'function') {
    const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
    base64 = btoa(binary);
  } else if (typeof Buffer !== 'undefined') {
    base64 = Buffer.from(bytes).toString('base64');
  } else {
    throw new Error('The selected photo could not be processed.');
  }

  return `data:${file.type || 'image/png'};base64,${base64}`;
}

export function readActivityPhotos(): Record<ActivityKind, ActivityPhoto | null> {
  const stored = readJson<Record<string, ActivityPhoto | null>>(ACTIVITY_PHOTOS_KEY, {});
  const output: Record<ActivityKind, ActivityPhoto | null> = {
    'Social work': null,
    'Cultural activities': null,
    'Fun tourism': null,
    Others: null,
  };

  for (const kind of activityKinds) {
    const value = stored[kind];
    output[kind] = value ?? null;
  }

  return output;
}

export function saveActivityPhoto(kind: ActivityKind, input: Omit<ActivityPhoto, 'id' | 'kind' | 'createdAt'>): ActivityPhoto {
  const photo: ActivityPhoto = {
    ...input,
    kind,
    id: globalThis.crypto?.randomUUID?.() || `activity-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
  };

  const next = readActivityPhotos();
  next[kind] = photo;
  writeJson(ACTIVITY_PHOTOS_KEY, Object.fromEntries(Object.entries(next).filter(([, value]) => Boolean(value))));
  return photo;
}
