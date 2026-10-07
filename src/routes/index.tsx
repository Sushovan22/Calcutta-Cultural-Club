import { createFileRoute } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Camera, Flower2, Heart, HandHeart, Music2, Compass, Sparkles, MessageCircle, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ContactDialog } from '@/components/contact-dialog';
import { PhotoUpload } from '@/components/photo-upload';
import { getPhotos } from '@/lib/community.functions';
import { readActivityPhotos, type ActivityKind } from '@/lib/local-community-store';
import hero from '@/assets/pujo-hero.jpg';
import gathering from '@/assets/community-gathering.asset.json';

const photosOptions = queryOptions({ queryKey: ['community-photos'], queryFn: () => getPhotos(), staleTime: 120000 });
export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Cultural Club — Culture, community & Durga Puja' },
    { name: 'description', content: 'Find your place in our community. Join social work, cultural activities, fun tourism, and share your favourite Pujo moments with Cultural Club.' },
    { property: 'og:title', content: 'Cultural Club — Culture, community & Durga Puja' },
    { property: 'og:description', content: 'A celebration of togetherness. Discover community activities and share your Pujo moments.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(photosOptions),
  component: Index,
});
const activities = [
  { title: 'Social work', subtitle: 'A little care. A lasting impact.', description: 'Join hands in volunteering, support drives, and community care for people who need it most.', icon: HandHeart, kind: 'social' },
  { title: 'Cultural activities', subtitle: 'Our roots. Our rhythm.', description: 'Celebrate tradition through music, art, performances, and festive moments that bring us closer.', icon: Music2, kind: 'cultural' },
  { title: 'Fun tourism', subtitle: 'New places. Shared stories.', description: 'Discover memorable outings, local adventures, and joyful group experiences across the city and beyond.', icon: Compass, kind: 'tourism' },
  { title: 'Others', subtitle: 'Your idea belongs here.', description: 'Share your own initiative, creative idea, or community project and help shape what we do next.', icon: Sparkles, kind: 'others' },
];

const sponsors = [
  { name: 'Kolkata Heritage', short: 'KH', tag: 'Community partner' },
  { name: 'Shonar Pujo', short: 'SP', tag: 'Festive sponsor' },
  { name: 'Nabapatra', short: 'NP', tag: 'Cultural supporter' },
  { name: 'City Lights', short: 'CL', tag: 'Event partner' },
];

function Index() {
  const [contactOpen, setContactOpen] = useState(false);
  const [selected, setSelected] = useState('Social work');
  const [dialogKey, setDialogKey] = useState(0);
  const [activityPhotos, setActivityPhotos] = useState<Record<ActivityKind, { url: string; title: string; caption: string } | null>>({
    'Social work': null,
    'Cultural activities': null,
    'Fun tourism': null,
    Others: null,
  });
  const { data, refetch } = useSuspenseQuery(photosOptions);

  useEffect(() => {
    const sync = () => setActivityPhotos(readActivityPhotos());
    sync();
    window.addEventListener('storage', sync);
    window.addEventListener('activity-photos-updated', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('activity-photos-updated', sync);
    };
  }, []);

  function contact(interest = 'Social work') { setSelected(interest); setDialogKey(key => key + 1); setContactOpen(true); }
  return <>
    <header className="site-header"><div className="site-container header-inner">
      <a className="brand" href="#"><Flower2 className="brand-symbol" strokeWidth={1.1} /><div><div className="brand-title">Calcutta Cultural Club</div><div className="brand-subtitle">Culture · Community · Connection</div></div></a>
      <nav className="nav" aria-label="Main navigation"><a href="#activities">Our activities</a><a href="#gallery">Photo contest</a><Button variant="festiveOutline" onClick={() => contact()}>Contact us <ArrowUpRight /></Button></nav>
    </div></header>
    <main>
      <section className="hero"><img className="hero-image" src={hero} alt="Durga idol surrounded by marigolds in a festive Kolkata pandal" width={1920} height={1024} fetchPriority="high" /><div className="site-container hero-inner">
        <div className="eyebrow"><Flower2 size={15} /> Sharodiya · A celebration of togetherness</div>
        <h1>CalcuttaCultural Club<span>Where we belong.</span></h1>
        <p>From the rhythm of the dhak to the joy of giving — celebrating our culture, our people, and the moments that bring us together.</p>
        <div className="hero-actions"><Button variant="festival" asChild><a href="#activities">Explore our activities <ArrowUpRight /></a></Button><Button variant="festiveOutline" asChild><a href="#gallery"><Camera /> Share a Pujo moment</a></Button></div>
      </div><div className="hero-note">THE SPIRIT OF PUJO, ALL YEAR ROUND <ArrowDown size={12} /></div></section>
      <div className="alpona-divider" aria-hidden="true" />
      <section className="activities" id="activities"><div className="site-container">
        <div className="section-heading"><div><div className="eyebrow">Different passions. One community.</div><h2>Find your kind of together.</h2></div><p>Something to give. Something to celebrate.<br />Something new to discover.</p></div>
        <TooltipProvider delayDuration={150}>
          <div className="activity-grid">{activities.map(item => {
            const media = activityPhotos[item.title as ActivityKind];
            const mediaStyle = media?.url ? { backgroundImage: `linear-gradient(180deg, rgba(14, 24, 20, 0.2), rgba(14, 24, 20, 0.7)), url(${media.url})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' } : undefined;
            return <Tooltip key={item.title}>
              <TooltipTrigger asChild>
                <Button variant="activity" data-kind={item.kind} onClick={() => contact(item.title)} style={mediaStyle}>
                  <item.icon className="activity-icon" />
                  <ArrowUpRight className="tile-arrow" />
                  <div className="activity-title">{item.title}<span className="activity-subtitle">{item.subtitle}</span></div>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[220px] rounded-md border border-border/80 bg-background px-3 py-2 text-left text-xs text-foreground shadow-lg">
                {item.description}
              </TooltipContent>
            </Tooltip>;
          })}</div>
        </TooltipProvider>
      </div></section>
      <section className="photo-section" id="gallery"><div className="site-container">
        <div className="section-heading"><div><div className="eyebrow"><Camera size={14} /> The Pujo photo contest</div><h2>Your lens. Our celebration.</h2></div><p>The lights, the laughter, the little moments.<br />Let us see Pujo through your eyes.</p></div>
        <div className="photo-layout"><div className="photo-story"><Sparkles className="photo-sparkle" /><figure className="photo-print"><img src={gathering.url} alt="A community gathering from the original Cultural Club gallery" loading="lazy" width={1280} height={720} /><figcaption>Better when we're together.</figcaption></figure><figure className="photo-print second"><img src={hero} alt="A festive Durga Puja celebration" loading="lazy" width={1920} height={1024} /><figcaption>A little Pujo magic.</figcaption></figure><div className="photo-story-note"><Heart size={13} /> Every picture has a story. What's yours?</div></div><PhotoUpload onUploaded={refetch} /></div>
      </div></section>
      <section className="gallery"><div className="site-container"><div className="section-heading"><div><div className="eyebrow">Through our community's eyes</div><h2>Moments that bring us closer.</h2></div><span className="form-hint">Our community album</span></div>
        {data.error && <p role="alert" className="form-error">{data.error}</p>}
        <div className="gallery-grid">{data.photos.map(photo => <figure className="gallery-item" key={photo.id}><img src={photo.url} alt={photo.caption || 'A photo shared by our community'} loading="lazy" /><figcaption><strong>{photo.handle || 'From our community'}</strong>{photo.caption && <p>{photo.caption}</p>}</figcaption></figure>)}</div>
      </div></section>
      <section className="community-band"><div className="site-container"><div><h2>A shared passion starts something beautiful.</h2><p>Have an idea, a helping hand, or a little curiosity? There's a place for you here.</p></div><Button variant="festiveOutline" onClick={() => contact()}><MessageCircle /> Let's connect <ArrowUpRight /></Button></div></section>
      <section className="sponsors"><div className="site-container">
        <div className="section-heading"><div><div className="eyebrow">Our supporters</div><h2>Proudly backed by our community partners.</h2></div><p>Local organisations and kind hearts helping us celebrate together.</p></div>
        <div className="sponsor-grid">{sponsors.map(sponsor => <div className="sponsor-card" key={sponsor.name}><div className="sponsor-mark">{sponsor.short}</div><div className="sponsor-copy"><strong>{sponsor.name}</strong><span>{sponsor.tag}</span></div></div>)}</div>
      </div></section>
    </main>
    <footer className="site-footer"><div className="site-container"><span>Cultural Club · Made with love for our community.</span><a href="https://instagram.com/caltural.club" target="_blank" rel="noopener noreferrer"><Instagram size={14} /> @caltural.club <ArrowUpRight size={12} /></a></div></footer>
    <ContactDialog key={dialogKey} open={contactOpen} onOpenChange={setContactOpen} initialInterest={selected} />
  </>;
}
