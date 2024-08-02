const apiKey = 'YOUR_GOOGLE_CLOUD_TRANSLATE_API_KEY';
const languageToolApiUrl = 'https://api.languagetool.org/v2/check';

function translateText() {
    const inputText = document.getElementById('inputText').value;
    const targetLanguage = 'en'; // Código de idioma para o qual você deseja traduzir

    fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            q: inputText,
            target: targetLanguage
        })
    })
    .then(response => response.json())
    .then(data => {
        const translatedText = data.data.translations[0].translatedText;
        document.getElementById('translatedText').value = translatedText;
    })
    .catch(error => console.error('Erro na tradução:', error));
}

function checkGrammar() {
    const inputText = document.getElementById('translatedText').value;

    fetch(languageToolApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            text: inputText,
            language: 'en-US'
        })
    })
    .then(response => response.json())
    .then(data => {
        const matches = data.matches;
        let grammarCheckResult = inputText;

        matches.forEach(match => {
            const { message, offset, length } = match;
            const before = grammarCheckResult.substring(0, offset);
            const errorText = grammarCheckResult.substring(offset, offset + length);
            const after = grammarCheckResult.substring(offset + length);

            grammarCheckResult = `${before}[${message}: ${errorText}]${after}`;
        });

        document.getElementById('grammarCheckResult').value = grammarCheckResult;
    })
    .catch(error => console.error('Erro na revisão gramatical:', error));
}
