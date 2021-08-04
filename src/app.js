import React, { useEffect, useState } from 'react';
import {IntlProvider, FormattedMessage, FormattedNumber, useIntl} from 'react-intl';
import useI18n from './useI18n.jsx';

const supportLang = ['zh-CN', 'en-US', 'ja-JP'];

function HomePage() {
    const intl = useIntl();
    
    return <div>
        {intl.formatMessage({ id: 'state.pending'})}
    </div>
}

const App = () => {
    const { langMessage, changeLang, lang } = useI18n({ supportLang });

    const handleChangeLang = (e) => {
        changeLang(e.target.value);
    }

    if (!langMessage) return <div>Loading</div>;

    return <div>
        <IntlProvider messages={langMessage} locale={lang}>
            <select onChange={handleChangeLang}>
                {supportLang.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
            <h1>
                <FormattedMessage id="state.pending" />
            </h1>
            <HomePage />
        </IntlProvider>
    </div>
}

export default App;