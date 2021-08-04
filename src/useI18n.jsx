import React, { useEffect, useState } from 'react';

export default function useI18n(props) {
    const { supportLang=[], initialLang } = props;
    const [langMessage, setLangMessage] = useState();
    const [lang, setLang] = useState(initialLang);

    const loadMessage = (lang) => {
        import(`./locales/${lang}.json`).then(res=> {
            setLangMessage(res.default);
        })
    }

    const getDefaultLang = () => {
        let browserCode = (navigator.language || navigator.browserLanguage).toLowerCase();
        if (browserCode) {
            let matchLang = supportLang.find(item=>item.toLowerCase()=== browserCode.toLowerCase())
            return matchLang
        }
        return supportLang[0];
    }

    const changeLang = (lang) => {
        loadMessage(lang);
    }

    useEffect(() => {
        if (!initialLang) {
            let defaultLang = getDefaultLang();
            setLang(defaultLang);
        }
    }, []);

    useEffect(() => {
        if (lang) {
            loadMessage(lang);
        }
    }, [lang])

    return { langMessage, changeLang, lang }
}