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

      <p class='copyright'>
        <a
          href='https://github.com/JingHuang-Su/Career-Project'
          target='_blank'
          rel='noopener noreferrer'
        >
          Version 1.0
        </a>{' '}
        &copy; Copyright 2019 by{' '}
        <a href='https://github.com/JingHuang-Su'>JingHuang-Su</a>.
      </p>
    </footer>
  );
};

export default Footer;
