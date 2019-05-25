  //key : value .  store the translations for the key.
let  translations = {
    "section-1"         : "Basic Information"
}


export function getTranslation(key){
    if(translations[key]){
      return translations[key];
    }else{
      return key;
    }
}
