import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { posts } from '../../content/posts';
import EmailCapture from './EmailCapture';
import MdxRenderer from '../../components/mdx/MdxRenderer';

const WritingRoute: React.FC = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState<string | null>(null);
  const [activeSlug, setActiveSlug] = useState(posts[0]?.slug ?? '');

  const tags = useMemo(() => Array.from(new Set(posts.flatMap((post) => post.tags))).sort(), []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag = tag ? post.tags.includes(tag) : true;
      const tokens = `${t(post.titleKey)} ${t(post.excerptKey)} ${post.tags.join(' ')}`.toLowerCase();
      const matchesSearch = tokens.includes(search.toLowerCase());
      return matchesTag && matchesSearch;
    });
  }, [search, tag, t]);

  const activePost = useMemo(
    () => posts.find((post) => post.slug === activeSlug) ?? posts[0],
    [activeSlug],
  );

  return (
    <section className="typography-prose">
      <header>
        <h1>{t('writing.title')}</h1>
        <p>{t('writing.subtitle')}</p>
      </header>
      <div className="filter-row" role="toolbar" aria-label={t('writing.filters.label')}>
        <label className="sr-only" htmlFor="writing-search">
          {t('writing.filters.search')}
        </label>
        <input
          id="writing-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t('writing.filters.placeholder')}
        />
        <button type="button" onClick={() => setTag(null)} aria-pressed={tag === null}>
          {t('writing.filters.all')}
        </button>
        {tags.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setTag(value)}
            aria-pressed={tag === value}
          >
            {t(`writing.tags.${value}`, { defaultValue: value })}
          </button>
        ))}
      </div>
      <section aria-labelledby="start-here">
        <h2 id="start-here">{t('writing.startHere.title')}</h2>
        <p>{t('writing.startHere.copy')}</p>
        <div className="list-grid">
          {posts
            .filter((post) => post.startHere)
            .map((post) => (
              <article key={post.slug} className="card">
                <header>
                  <h3>{t(post.titleKey)}</h3>
                </header>
                <p>{t(post.excerptKey)}</p>
                <div className="card__meta">
                  {post.tags.map((item) => (
                    <span className="tag" key={item}>
                      {t(`writing.tags.${item}`, { defaultValue: item })}
                    </span>
                  ))}
                </div>
                <button type="button" onClick={() => setActiveSlug(post.slug)} className="command-button">
                  {t('writing.startHere.read')}
                </button>
              </article>
            ))}
        </div>
      </section>
      <section aria-labelledby="all-posts" style={{ marginTop: '2rem' }}>
        <h2 id="all-posts">{t('writing.allPosts.title')}</h2>
        <div className="list-grid">
          {filteredPosts.map((post) => (
            <article key={post.slug} className="card">
              <header>
                <h3>{t(post.titleKey)}</h3>
              </header>
              <p>{t(post.excerptKey)}</p>
              <div className="card__meta">
                {post.tags.map((item) => (
                  <span className="tag tag--muted" key={item}>
                    {t(`writing.tags.${item}`, { defaultValue: item })}
                  </span>
                ))}
              </div>
              <button type="button" className="command-button" onClick={() => setActiveSlug(post.slug)}>
                {t('writing.allPosts.open')}
              </button>
            </article>
          ))}
        </div>
      </section>
      {activePost && (
        <article style={{ marginTop: '2.5rem' }} aria-live="polite">
          <header>
            <h2>{t(activePost.titleKey)}</h2>
          </header>
          <MdxRenderer content={t(activePost.bodyKey)} />
        </article>
      )}
      <EmailCapture />
    </section>
  );
};

export default WritingRoute;
