import React, { useState } from 'react';

    function App() {
      const [query, setQuery] = useState('');
      const [response, setResponse] = useState('');
      const questionWebhookUrl = 'https://n8n.lolinux2002.com/webhook/question';
      const gspWebhookUrl = 'https://n8n.lolinux2002.com/webhook-test/gsp';
      const digiSportWebhookUrl = 'https://n8n.lolinux2002.com/webhook-test/digisport';

      const handleInputChange = (event) => {
        setQuery(event.target.value);
      };

      const handleSubmit = async () => {
        try {
          const res = await fetch(questionWebhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: query }),
          });

          if (!res.ok) {
            const message = `Error: ${res.status} - ${res.statusText}`;
            setResponse(message);
            return;
          }

          const text = await res.text();
          setResponse(text);
        } catch (error) {
          setResponse(`Error: ${error.message}`);
        }
      };

      const handleGspClick = async () => {
        try {
          const res = await fetch(gspWebhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: 'https://www.gsp.ro/google-news.xml' }),
          });

          if (!res.ok) {
            const message = `Error: ${res.status} - ${res.statusText}`;
            setResponse(message);
            return;
          }

          const text = await res.text();
          setResponse(text);
        } catch (error) {
          setResponse(`Error: ${error.message}`);
        }
      };

      const handleDigiSportClick = async () => {
        try {
          const res = await fetch(digiSportWebhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
             body: JSON.stringify({ url: 'https://www.digisport.ro/sitemap/news.xml' }),
          });

          if (!res.ok) {
            const message = `Error: ${res.status} - ${res.statusText}`;
            setResponse(message);
            return;
          }

          const text = await res.text();
          setResponse(text);
        } catch (error) {
          setResponse(`Error: ${error.message}`);
        }
      };

      return (
        <div className="container">
          <div className="button-group">
            <button onClick={handleGspClick}>GSP</button>
            <button onClick={handleDigiSportClick}>DigiSport</button>
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter your question"
              value={query}
              onChange={handleInputChange}
            />
            <button onClick={handleSubmit}>Find the answer</button>
          </div>
          <div className="response-area">
            <pre>{response}</pre>
          </div>
        </div>
      );
    }

    export default App;
