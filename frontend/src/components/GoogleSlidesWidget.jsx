import React from 'react';

function GoogleSlidesWidget() {
  return (
    <div className="widget">
      <iframe 
        src="YOUR_GOOGLE_SLIDES_EMBED_URL" 
        frameBorder="0" 
        width="100%" 
        height="400px"
        title="Google Slides"
      ></iframe>
    </div>
  );
}

export default GoogleSlidesWidget;
