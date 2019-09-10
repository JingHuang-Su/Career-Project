import React from 'react';
import sprite from '../img/sprite.svg';

const Footer = () => {
  return (
    <footer class='footer mt-md'>
      {/* //   <ul class='footer__icons'>
    //     <li>
    //       <svg>
    //         <use xlinkHref={`${sprite}#medium`} class='footer__icons--medium' />
    //       </svg>
    //     </li>
    //     <li>
    //       <svg>
    //         <use xlinkHref={`${sprite}#linkedin`} />
    //       </svg>
    //     </li>
    //     <li>
    //       <svg>
    //         <use xlinkHref={`${sprite}#twitter`} />
    //       </svg>
    //     </li>
    //     <li>
    //       <svg>
    //         <use xlinkHref={`${sprite}#youtube`} />
    //       </svg>
    //     </li>
    //   </ul> */}
      <p class='copyright '>Version 1.0</p>
      <p class='copyright '>&copy; Copyright 2019 by JingHuang-Su.</p>
    </footer>
  );
};

export default Footer;
