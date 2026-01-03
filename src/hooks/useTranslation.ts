import { useState, useCallback } from 'react';
import { translateText } from '../services';
import { LANGUAGES, DEFAULT_SOURCE_LANG, DEFAULT_TARGET_LANG } from '../constants';
import type { TranslationState } from '../types';

export function useTranslation() {
  const [state, setState] = useState<TranslationState>({
    sourceText: '',
    translatedText: '',
    sourceLang: DEFAULT_SOURCE_LANG,
    targetLang: DEFAULT_TARGET_LANG,
    isLoading: false,
    error: null,
  });

  const setSourceText = useCallback((text: string) => {
    setState(prev => ({ ...prev, sourceText: text, error: null }));
  }, []);

  const setSourceLang = useCallback((lang: string) => {
    setState(prev => ({ ...prev, sourceLang: lang }));
  }, []);

  const setTargetLang = useCallback((lang: string) => {
    setState(prev => ({ ...prev, targetLang: lang }));
  }, []);

  const translate = useCallback(async () => {
    if (!state.sourceText.trim()) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await translateText({
        text: state.sourceText,
        sourceLang: state.sourceLang,
        targetLang: state.targetLang,
      });

      setState(prev => ({
        ...prev,
        translatedText: result.translatedText,
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Translation failed',
        isLoading: false,
      }));
    }
  }, [state.sourceText, state.sourceLang, state.targetLang]);

  const swapLanguages = useCallback(() => {
    setState(prev => ({
      ...prev,
      sourceLang: prev.targetLang,
      targetLang: prev.sourceLang,
      sourceText: prev.translatedText,
      translatedText: prev.sourceText,
    }));
  }, []);

  const clearAll = useCallback(() => {
    setState(prev => ({
      ...prev,
      sourceText: '',
      translatedText: '',
      error: null,
    }));
  }, []);

  return {
    ...state,
    languages: LANGUAGES,
    setSourceText,
    setSourceLang,
    setTargetLang,
    translate,
    swapLanguages,
    clearAll,
  };
}
