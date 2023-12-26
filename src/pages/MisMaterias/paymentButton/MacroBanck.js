import React from 'react';
import { useSelector } from 'react-redux';

function MacroBank() {
    const { html } = useSelector((state) => ({
        html: state.PaymentButton.result,
    }));

    return (

       <iframe
        srcDoc={html}
        width="100%"
      ></iframe>
 
  
  );
}

export default MacroBank;