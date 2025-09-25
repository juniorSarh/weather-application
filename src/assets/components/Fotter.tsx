import React from 'react'

interface footerProps{
    text:string,
    icon:string,
}

const Fotter: React.FC<footerProps> =( {text, icon}) => {
  return (
   <>
   <p>{text}</p>
   <p>{icon}</p>
   </>
  );
};

export default Fotter;