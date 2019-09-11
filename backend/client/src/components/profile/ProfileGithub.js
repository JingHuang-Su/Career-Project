import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../actions';

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return repos === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='profile__github'>
        <div className='profile__title'>Github Repo</div>

        {repos.map(repo => (
          <div className='profile__box'>
            <div className='profile__box--reponame'>
              <a
                href={`https://github.com/${repo.full_name}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {repo.name}
              </a>
            </div>
            <div className='profile__box--repoinfo'>
              <div className='profile__box--repoinfo-star'>
                Star: <span>{repo.stargazers_count}</span>
              </div>
              <div className='profile__box--repoinfo-fork'>
                Fork: <span>{repo.forks_count}</span>
              </div>
              <div className='profile__box--repoinfo-watch'>
                Watch: <span>{repo.watchers_count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  repos: state.profile.repos
});

export default connect(
  mapStateToProps,
  { getGithubRepos }
)(ProfileGithub);
