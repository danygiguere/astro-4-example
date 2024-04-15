# Just a demo project to learn Astro with react and i18n

### Installation
- npm install
- npm run dev

### More info regarding my I18n ts class
For the translations, it works with json language files and I've created a string interpolation function that you can use like this:

- first you need to create a file /locales/en/strings.json with this key
```
{
    "index": {
        "hi": "Hello {username}. Today's date is {today}"
    }
}
```
- and /locales/fr/strings.json with this key 
```
{
    "index": {
        "hi": "Bonjour {username}. Aujourd'hui nous sommes le {today}"
    }
}
```

- Then you need to import and initialize the i18n.ts class (with the Astro.currentLocale). It will load the translations files only once per initializations:
```
import I18n from "../../i18n";
const i18n = new I18n(Astro.currentLocale);
```

- afer that you can do the translations like this: 
```
const hi = i18n.t("strings.index.hi", {
  username: "John",
  today: new Date().toString(),
}); 
// Will return Hello John. Today's date is Sun Apr 14 2024 10:54:15 GMT-0400 (Eastern Daylight Time)

const aboutPageTitle = i18n.t("strings.about.title")
// example with no parameters. Will return the text for about.title in the strings.json file
```

My custom I18n class uses fs to fetch the strings from the language files. As you may expect, that would not be available from the client, in a react component for instance. Therefore we need to pass the component translations beforehand as prop like this:
```
const i18n = new I18n(Astro.currentLocale);
const componentTranslations = i18n.t("strings.signin.component");
...
<SigninForm translations={componentTranslations} client:load />
```
Look at signin.astro and SigninForm.tsx for an example.


### Regarding Astro.build
Visit https://astro.build for more info regarding Astro