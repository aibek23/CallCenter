import React, { useState, useEffect } from 'react';

const HtmlViewer = ({ htmlContent }) => {
  console.log(htmlContent);
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default HtmlViewer;