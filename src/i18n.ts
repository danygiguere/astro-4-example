import * as fs from "fs";

export default class I18n {
    locale: string | undefined;
    defaultLocale = "en"
    supportedLocales = ["en", "fr"]

  constructor(locale: string | undefined) {
    locale == undefined ? this.defaultLocale : locale
    this.supportedLocales.forEach(item => {
      if(locale == item) {
       this.locale = item
      }
    })
  }

  public getTranslations() {
    const directory = fs.readdirSync(`./locales/${this.locale}/`, "utf-8");
    const data: { [key: string]: string | any } = {};
    for (let file of directory) {
      data[file.slice(0, -5)] = JSON.parse(
        fs.readFileSync(`./locales/${this.locale}/${file}`, "utf-8")
      );
    }
    return data;
  }
}