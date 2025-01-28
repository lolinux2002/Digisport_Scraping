import React, { useState } from 'react';

    function App() {
      const [query, setQuery] = useState('');
      const [response, setResponse] = useState('');
      const webhookUrl = 'https://n8n.lolinux2002.com/webhook-test/question';

      const handleInputChange = (event) => {
        setQuery(event.target.value);
      };

      const handleSubmit = async () => {
        try {
          const res = await fetch(webhookUrl, {
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

      return (
        <div className="container">
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
