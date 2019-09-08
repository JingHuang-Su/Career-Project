import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import sprite from '../img/sprite.svg';

const DashboardAdd = ({ profile: { profile, loading }, auth }) => {
  return (
    <div className='dashboard__buttons'>
      {auth.isAuth &&
      auth.loading === false &&
      profile === null &&
      loading === false &&
      profile.user._id === auth.user._id ? (
        <Link to='/create-profile' className='dashboard__buttons--button'>
          <svg>
            <use xlinkHref={`${sprite}#plus`}></use>
          </svg>
          新增個人資訊
        </Link>
      ) : (
        <Link to='/edit-profile' className='dashboard__buttons--button'>
          <svg>
            <use xlinkHref={`${sprite}#plus`}></use>
          </svg>
          編輯個人資訊
        </Link>
      )}
      <Link to='/add-experience' className='dashboard__buttons--button'>
        <svg>
          <use xlinkHref={`${sprite}#plus`}></use>
        </svg>
        新增工作經歷
      </Link>
      <Link to='/add-education' className='dashboard__buttons--button'>
        <svg>
          <use xlinkHref={`${sprite}#plus`}></use>
        </svg>
        新增教育背景
      </Link>
      <Link to='/add-other' className='dashboard__buttons--button'>
        <svg>
          <use xlinkHref={`${sprite}#plus`}></use>
        </svg>
        新增其他經歷
      </Link>
      <Link to='/add-certification' className='dashboard__buttons--button'>
        <svg>
          <use xlinkHref={`${sprite}#plus`}></use>
        </svg>
        新增專業證照
      </Link>
      <Link to='/add-skill' className='dashboard__buttons--button'>
        <svg>
          <use xlinkHref={`${sprite}#plus`}></use>
        </svg>
        新增工作技能
      </Link>
    </div>
  );
};

export default DashboardAdd;
