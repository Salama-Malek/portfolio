import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { backgroundLabels, type BackgroundId } from '../../ui/backgrounds';
import { useBackground } from '../../ui/backgrounds/background-provider';

export type PaletteHandle = {
  open: () => void;
  close: () => void;
};

type PaletteAction = {
  id: string;
  group: string;
  label: string;
  keywords: string[];
  shortcut?: string;
  handler: () => void;
};

type CommandPaletteProps = {
  open?: boolean;
  onOpenChange?: (state: boolean) => void;
};

const CommandPalette: React.FC<CommandPaletteProps> = ({ open: openProp, onOpenChange }) => {
  const { t, i18n } = useTranslation();
  const { background, setBackground } = useBackground();
  const navigate = useNavigate();
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const open = openProp ?? internalOpen;

  const toggleOpen = useCallback(
    (next: boolean) => {
      if (openProp === undefined) {
        setInternalOpen(next);
      }
      onOpenChange?.(next);
    },
    [onOpenChange, openProp],
  );

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      const isMod = event.metaKey || event.ctrlKey;
      if (isMod && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        toggleOpen(true);
      } else if (open && event.key === 'Escape') {
        toggleOpen(false);
      }
    },
    [open, toggleOpen],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setActiveIndex(0);
    }
  }, [open]);

  const navigationActions: PaletteAction[] = useMemo(
    () => [
      {
        id: 'nav-home',
        group: t('palette.groups.navigate'),
        label: t('nav.home'),
        keywords: ['home', 'start'],
        shortcut: 'H',
        handler: () => navigate('/'),
      },
      {
        id: 'nav-docs',
        group: t('palette.groups.navigate'),
        label: t('nav.docs'),
        keywords: ['docs', 'documentation'],
        handler: () => navigate('/docs'),
      },
      {
        id: 'nav-examples',
        group: t('palette.groups.navigate'),
        label: t('nav.examples'),
        keywords: ['examples', 'patterns'],
        handler: () => navigate('/examples'),
      },
      {
        id: 'nav-blog',
        group: t('palette.groups.navigate'),
        label: t('nav.blog'),
        keywords: ['blog', 'writing'],
        handler: () => navigate('/blog'),
      },
      {
        id: 'nav-writing',
        group: t('palette.groups.navigate'),
        label: t('nav.writing'),
        keywords: ['writing', 'articles'],
        handler: () => navigate('/writing'),
      },
      {
        id: 'nav-projects',
        group: t('palette.groups.navigate'),
        label: t('nav.projects'),
        keywords: ['projects', 'case studies'],
        handler: () => navigate('/projects'),
      },
    ],
    [navigate, t],
  );

  const backgroundActions: PaletteAction[] = useMemo(
    () =>
      (Object.keys(backgroundLabels) as BackgroundId[]).map((id) => ({
        id: `bg-${id}`,
        group: t('palette.groups.backgrounds'),
        label: t(backgroundLabels[id]),
        keywords: ['background', id],
        shortcut: id === background ? '•' : undefined,
        handler: () => setBackground(id),
      })),
    [background, setBackground, t],
  );

  const languageActions: PaletteAction[] = useMemo(
    () =>
      ['en', 'ar', 'ru', 'fr', 'de'].map((code) => ({
        id: `lang-${code}`,
        group: t('palette.groups.languages'),
        label: t(`i18n.languages.${code}`),
        keywords: ['language', code],
        shortcut: i18n.language === code ? '✓' : undefined,
        handler: () => i18n.changeLanguage(code),
      })),
    [i18n, t],
  );

  const actions = useMemo(() => [...navigationActions, ...backgroundActions, ...languageActions], [
    backgroundActions,
    languageActions,
    navigationActions,
  ]);

  const visibleActions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((action) =>
      [action.label, ...action.keywords].some((token) => token.toLowerCase().includes(q)),
    );
  }, [actions, query]);

  useEffect(() => {
    if (activeIndex >= visibleActions.length) {
      setActiveIndex(Math.max(0, visibleActions.length - 1));
    }
  }, [activeIndex, visibleActions.length]);

  const handleItemKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index + 1) % Math.max(visibleActions.length, 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index - 1 + visibleActions.length) % Math.max(visibleActions.length, 1));
    } else if (event.key === 'Enter') {
      visibleActions[index]?.handler();
      toggleOpen(false);
    }
  };

  const grouped = useMemo(() => {
    const map = new Map<string, PaletteAction[]>();
    visibleActions.forEach((action) => {
      const key = action.group;
      const list = map.get(key) ?? [];
      list.push(action);
      map.set(key, list);
    });
    return Array.from(map.entries());
  }, [visibleActions]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="command-dialog"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          toggleOpen(false);
        }
      }}
    >
      <div role="dialog" aria-modal="true" aria-label={t('palette.label')} className="command-dialog__panel">
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="command-dialog__search"
          placeholder={t('palette.searchPlaceholder')}
          type="search"
        />
        <div className="command-dialog__list" role="listbox" aria-label={t('palette.label')}>
          {grouped.length === 0 && <p>{t('palette.noResults')}</p>}
          {grouped.map(([group, groupActions]) => (
            <div key={group} className="command-dialog__group">
              <div className="command-dialog__group-title">{group}</div>
              {groupActions.map((action) => {
                const index = visibleActions.indexOf(action);
                const isActive = index === activeIndex;
                return (
                  <button
                    key={action.id}
                    type="button"
                    className="command-dialog__item"
                    onClick={() => {
                      action.handler();
                      toggleOpen(false);
                    }}
                    onKeyDown={(event) => handleItemKeyDown(event, index)}
                    role="option"
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                  >
                    <span>{action.label}</span>
                    {action.shortcut && <span className="command-dialog__shortcut">{action.shortcut}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
