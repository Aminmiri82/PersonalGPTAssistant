// sseHandler.js
export const connectToSSE = (url, onMessage, onError, onEnd) => {
    let eventSource;
  
    const start = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'text/event-stream',
          },
        });
  
        if (response.ok) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder("utf-8");
  
          let buffer = '';
  
          while (true) {
            const { value, done } = await reader.read();
  
            if (done) {
              onEnd();
              break;
            }
  
            buffer += decoder.decode(value, { stream: true });
  
            let boundary = buffer.indexOf("\n\n");
  
            while (boundary !== -1) {
              const chunk = buffer.slice(0, boundary);
              buffer = buffer.slice(boundary + 2);
  
              if (chunk.startsWith("data:")) {
                const data = chunk.slice(5);
                onMessage(JSON.parse(data));
              }
  
              boundary = buffer.indexOf("\n\n");
            }
          }
        } else {
          throw new Error("Failed to connect to SSE stream");
        }
      } catch (error) {
        onError(error);
      }
    };
  
    start();
  
    return {
      close: () => {
        if (eventSource) {
          eventSource.close();
        }
      },
    };
  };
  