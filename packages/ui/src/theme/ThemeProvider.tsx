import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from 'react';
import { Platform, useColorScheme } from 'react-native';

import { useHydrated } from '../hooks/useHydrated';
import { THEME_ATTRIBUTE, THEME_STORAGE_KEY } from './css';
import { cssVarColors, palettes, type ColorScheme, type Colors } from './palette';

export type ThemePreference = 'system' | ColorScheme;

export interface Theme {
  /**
   * Colour tokens. On web these are `var(--kui-*)` references so they are
   * always correct for the active scheme (including during static rendering);
   * on native they are concrete values for the resolved scheme.
   */
  colors: Colors;
  /** The scheme currently in effect. */
  scheme: ColorScheme;
  /** What the user asked for — `system` follows the OS setting. */
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
  /** Toggles between light and dark, based on what is currently shown. */
  toggle: () => void;
}

const isWeb = Platform.OS === 'web';
const PREFERENCES: readonly ThemePreference[] = ['system', 'light', 'dark'];

const noop = () => {};

const ThemeContext = createContext<Theme>({
  colors: isWeb ? cssVarColors : palettes.light,
  scheme: 'light',
  preference: 'system',
  setPreference: noop,
  toggle: noop,
});

/*
 * The preference lives outside React: in localStorage on web (shared across
 * tabs via the `storage` event) with an in-memory fallback for native or when
 * storage is unavailable.
 */
const listeners = new Set<() => void>();
let memoryPreference: ThemePreference | undefined;

function readStoredPreference(): ThemePreference | null | undefined {
  if (!isWeb) return undefined;
  try {
    const value = globalThis.localStorage?.getItem(THEME_STORAGE_KEY);
    return PREFERENCES.includes(value as ThemePreference) ? (value as ThemePreference) : null;
  } catch {
    return undefined; // storage blocked (private mode, disabled cookies)
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (isWeb && typeof window !== 'undefined') window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    if (isWeb && typeof window !== 'undefined') window.removeEventListener('storage', listener);
  };
}

function writePreference(preference: ThemePreference) {
  memoryPreference = preference;
  if (isWeb && typeof document !== 'undefined') {
    const root = document.documentElement;
    if (preference === 'system') root.removeAttribute(THEME_ATTRIBUTE);
    else root.setAttribute(THEME_ATTRIBUTE, preference);
    try {
      if (preference === 'system') localStorage.removeItem(THEME_STORAGE_KEY);
      else localStorage.setItem(THEME_STORAGE_KEY, preference);
    } catch {
      // The in-memory value still applies for this page view.
    }
  }
  listeners.forEach((listener) => listener());
}

export interface ThemeProviderProps {
  children: ReactNode;
  defaultPreference?: ThemePreference;
}

export function ThemeProvider({ children, defaultPreference = 'system' }: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  // Static HTML is rendered without knowledge of the visitor's OS scheme or
  // stored choice, so anything scheme-dependent waits for hydration on web.
  const hydrated = useHydrated();

  const getSnapshot = useCallback((): ThemePreference => {
    const stored = readStoredPreference();
    if (stored !== undefined) return stored ?? 'system';
    return memoryPreference ?? defaultPreference;
  }, [defaultPreference]);

  const preference = useSyncExternalStore(subscribe, getSnapshot, () => defaultPreference);

  const resolvedSystem: ColorScheme = hydrated && systemScheme === 'dark' ? 'dark' : 'light';
  const scheme: ColorScheme = preference === 'system' ? resolvedSystem : preference;

  const toggle = useCallback(() => {
    const next: ColorScheme = scheme === 'dark' ? 'light' : 'dark';
    // Going back to what the OS prefers keeps following the OS from then on.
    writePreference(next === resolvedSystem ? 'system' : next);
  }, [scheme, resolvedSystem]);

  const value = useMemo<Theme>(
    () => ({
      colors: isWeb ? cssVarColors : palettes[scheme],
      scheme,
      preference,
      setPreference: writePreference,
      toggle,
    }),
    [scheme, preference, toggle],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
