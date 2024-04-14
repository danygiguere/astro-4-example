# Just a demo project to learn Astro with react and i18n

### Installation
- npm install
- npm run dev

### More info regarding my I18n ts class
For the translations, it works with json language files and I've created a string interpolation function that you can use like this:

- /locales/en/strings.json has this key
```
{
    "index": {
        "hi": "Hello {username}. Today's date is {today}"
    }
}
```
- /locales/fr/strings.json has 
```
{
    "index": {
        "hi": "Bonjour {username}. Aujourd'hui nous sommes le {today}"
    }
}
```

- Then you need to import and initialize my i18n class (with the Astro.currentLocale). It will load the translations files only once per initializations:
```
import I18n from "../../i18n";
const i18n = new I18n(Astro.currentLocale);
```

- afer that you can do the translations like this: 
```
const hi = i18n.t("strings.index.hi", {
  username: "John",
  today: today,
}); 
// Will return Hello John. Today's date is Sun Apr 14 2024 10:54:15 GMT-0400 (Eastern Daylight Time)

const aboutPageTitle = i18n.t("strings.about.title")
// example with no parameters. Will return the text for about.title in the strings.json file
```


### Regarding Astro.build
Visit https://astro.build for more info regarding Astro