import { useCallback, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

function PhotoCard({ photo }) {
  const [likes, setLikes] = useState(0);
  return <article className="photo-card">
    <img src={photo.download_url} alt={`Photograph by ${photo.author}`} loading="lazy" />
    <div className="photo-footer"><span className="author">Photo by <strong>{photo.author}</strong></span><button className="thumb-button" onClick={() => setLikes(count => count + 1)} aria-label={`Like photo by ${photo.author}`}><FontAwesomeIcon icon={faThumbsUp}/><span>{likes}</span></button></div>
  </article>;
}

export default function PhotoGallery() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState('');
  const observerTarget = useRef(null);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  const loadPhotos = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${page}`);
      if (!response.ok) throw new Error(`Request failed (${response.status}).`);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('The photo service returned an unexpected response.');
      if (data.length === 0) {
        hasMoreRef.current = false;
        setHasMore(false);
      } else {
        setPhotos(current => {
          const knownIds = new Set(current.map(photo => photo.id));
          return [...current, ...data.filter(photo => !knownIds.has(photo.id))];
        });
        setPage(current => current + 1);
      }
    } catch (err) {
      setError(err.message || 'Unable to load photos. Please try again.');
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { loadPhotos(); }, []); // Load the first page on mount.

  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) loadPhotos();
    }, { rootMargin: '300px' });
    observer.observe(target);
    return () => observer.disconnect();
  }, [loadPhotos]);

  return <main className="gallery-page">
    <header className="gallery-header"><div className="gallery-logo">P</div><div><h1>Photo Gallery</h1><p>Discover beautiful moments from around the world</p></div></header>
    <section className="photo-feed" aria-label="Photo feed">
      {photos.map(photo => <PhotoCard key={photo.id} photo={photo} />)}
    </section>
    <div className="feed-status" ref={observerTarget}>
      {loading && <><span className="spinner"/> Loading photos…</>}
      {error && <div className="error-message"><span>{error}</span><button onClick={loadPhotos}>Try again</button></div>}
      {!hasMore && !loading && <p>You’ve reached the end of the gallery.</p>}
    </div>
  </main>;
}
