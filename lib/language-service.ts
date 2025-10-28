class LanguageService {
  private static instance: LanguageService;
  private currentLanguage: string = 'en-us'; // Default language

  private constructor() { }

  public static getInstance(): LanguageService {
    if (!LanguageService.instance) {
      LanguageService.instance = new LanguageService();
    }
    return LanguageService.instance;
  }

  public setLanguage(language: string): void {
    this.currentLanguage = language;
  }

  public getLanguage(): string {
    return this.currentLanguage;
  }

  public isLanguageSupported(language: string): boolean {
    //Need to check if contentstack has the language code api
    //https://www.contentstack.com/docs/developers/multilingual-content/list-of-supported-languages
    const supportedLanguages = ['es', 'en', 'en-us']; // Add more as needed
    return supportedLanguages.includes(language);
  }
}

export const languageService = LanguageService.getInstance(); 