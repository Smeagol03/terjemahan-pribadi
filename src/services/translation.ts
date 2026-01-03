import { API_BASE_URL } from '../config';
import type { TranslationRequest, TranslationResponse } from '../types';

/**
 * Translates text using the MyMemory API
 */
export async function translateText(request: TranslationRequest): Promise<TranslationResponse> {
  const { text, sourceLang, targetLang } = request;
  
  if (!text.trim()) {
    throw new Error('Text cannot be empty');
  }

  const url = `${API_BASE_URL}/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Translation request failed');
  }

  const data = await response.json();
  
  if (!data.responseData) {
    throw new Error('Invalid response from translation API');
  }

  return {
    translatedText: data.responseData.translatedText,
    match: data.responseData.match,
  };
}
