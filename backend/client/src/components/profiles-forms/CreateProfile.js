import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions';
import sprite from '../img/sprite.svg';
const CreateProfile = ({
  createProfile,
  getCurrentProfile,
  profile: { profile, loading },
  history
}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    githubusername: '',
    about: '',
    twitter: '',
    linkedin: '',
    youtube: '',
    medium: ''
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const {
    company,
    website,
    location,
    status,
    githubusername,
    about,
    twitter,
    linkedin,
    youtube,
    medium
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Redirect to='/dashboard' />
  ) : (
    <Fragment>
      <section className='something'>
        <h2 className='something__title'>建立個人資料</h2>
        <p className='something__paragraph'>添加一些資訊讓別人深入了解您!</p>
        <small className='something__required'>* = 必填</small>
        <form className='form something__form' onSubmit={e => onSubmit(e)}>
          <div className='form__group'>
            <select
              className='form__input'
              value={status}
              onChange={e => onChange(e)}
              name='status'
            >
              <option disabled selected value=''>
                * 選擇您的職稱
              </option>
              <option value='軟體開發人員'>軟體開發人員 (Developer)</option>
              <option value='資淺工程師'>資淺工程師 (Junior Developer)</option>
              <option value='資深工程師'>資深工程師 (Senior Developer)</option>
              <option value='經理'>經理 (Manager)</option>
              <option value='講師或教授'>
                講師或教授 (Instructor or Professor)
              </option>
              <option value='實習生'>實習生 (Intern)</option>
              <option value='其他'>其他 (Other)</option>
            </select>
          </div>
          <div className='form__group'>
            <input
              type='text'
              placeholder='* 公司'
              name='company'
              value={company}
              onChange={e => onChange(e)}
              required
              className='form__input'
              autoComplete='off'
            />
            <label for='name' className='form__label'>
              公司
            </label>
          </div>
          <div className='form__group'>
            <input
              type='text'
              placeholder='個人網站'
              name='website'
              className='form__input'
              autoComplete='off'
              value={website}
              onChange={e => onChange(e)}
            />
            <label for='name' className='form__label'>
              個人網站
            </label>
          </div>
          <div className='form__group'>
            <input
              type='text'
              placeholder='地點'
              name='location'
              className='form__input'
              autoComplete='off'
              value={location}
              onChange={e => onChange(e)}
            />
            <label for='name' className='form__label'>
              地點
            </label>
          </div>
          <div className='form__group'>
            <input
              type='text'
              value={githubusername}
              onChange={e => onChange(e)}
              placeholder='Github 會員名稱'
              name='githubusername'
              className='form__input'
              autoComplete='off'
            />
            <label for='name' className='form__label'>
              Github 會員名稱
            </label>
          </div>
          <div className='form__group'>
            <textarea
              name='about'
              cols='10'
              rows='5'
              value={about}
              onChange={e => onChange(e)}
              placeholder='簡介'
              className='form__input'
            ></textarea>
          </div>

          <div>
            <button
              type='button'
              className='btn__optional'
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
            >
              <svg>
                <use xlinkHref={`${sprite}#plus`}></use>
              </svg>
            </button>
            <span>Optional</span>
          </div>
          {displaySocialInputs && (
            <Fragment>
              <div className='form__social '>
                <svg>
                  <use xlinkHref={`${sprite}#twitter`}></use>
                </svg>
                <input
                  type='text'
                  className='form__input'
                  placeholder='Twitter URL'
                  name='twitter'
                  value={twitter}
                  onChange={e => onChange(e)}
                />
              </div>

              <div className='form__social '>
                <svg>
                  <use xlinkHref={`${sprite}#youtube`}></use>
                </svg>
                <input
                  type='text'
                  className='form__input'
                  placeholder='YouTube URL'
                  name='youtube'
                  value={youtube}
                  onChange={e => onChange(e)}
                />
              </div>

              <div className='form__social '>
                <svg>
                  <use xlinkHref={`${sprite}#linkedin`}></use>
                </svg>
                <input
                  type='text'
                  className='form__input'
                  placeholder='Linkedin URL'
                  name='linkedin'
                  value={linkedin}
                  onChange={e => onChange(e)}
                />
              </div>

              <div className='form__social '>
                <svg>
                  <use xlinkHref={`${sprite}#medium`}></use>
                </svg>
                <input
                  type='text'
                  className='form__input'
                  placeholder='Medium URL'
                  name='medium'
                  value={medium}
                  onChange={e => onChange(e)}
                />
              </div>
            </Fragment>
          )}

          <div className='form__group mt-sm'>
            <button type='submit' className='btn btn__login'>
              新增 &rarr;
            </button>
            <Link className='  btn btn__login mt-md' to='/dashboard'>
              回主頁
            </Link>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
