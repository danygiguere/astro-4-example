import * as fs from "fs";

export default class I18n {
  locale: string;
  defaultLocale = "en";
  supportedLocales = ["en", "fr"];
  translations: { [key: string]: string } = {};

  constructor(locale: string | undefined | null) {
    this.locale = locale || this.defaultLocale;
    this.loadTranslations();
  }

  private loadTranslations() {
    const directory = fs.readdirSync(`./locales/${this.locale}/`, "utf-8");
    for (let file of directory) {
      const key = file.slice(0, -5);
      this.translations[key] = JSON.parse(
        fs.readFileSync(`./locales/${this.locale}/${file}`, "utf-8")
      );
    }
  }

  public t(key: string, params: { [key: string]: string } = {}): string {
    const keys = key.split(".");
    let template: any = this.translations;
    for (const k of keys) {
      template = template[k];
      if (template === undefined) {
        console.error(`Translation not found for key '${key}'`);
        return "";
      }
    }
    return Object.entries(params).reduce(
      (result, [paramKey, value]) =>
        result.replace(new RegExp(`{${paramKey}}`, "g"), value),
      template
    );
  }
}
