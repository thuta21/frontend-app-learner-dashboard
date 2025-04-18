'use client';

import { useState } from 'react';
import { Search } from '@openedx/paragon/icons';
import './navbar.scss';
import logo from 'assets/Logo_Green.png';
import PropTypes from 'prop-types';

import urls from 'data/services/lms/urls';

const NavBar = ({
  courseSearchUrl, authenticatedUser, mainMenuItems, userMenuItems,
}) => {
  const getInitials = (string) => string
    .split(/\s+/)
    .reduce((response, word) => `${response}${word.charAt(0).toUpperCase()}`, '')
    .slice(0, 2);

  const searchUrl = `${urls.baseAppUrl(courseSearchUrl)}`;

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="medcenter-header">
      <div className="header-container">
        <div className="logo-container">
          <img src={logo} alt="Medcenter Cambodia" height="40" />
        </div>

        <form
          className="search-container"
          method="get"
          action={searchUrl}
        >
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            name="search_query"
          />
        </form>

        <div className="profile-container">
          <button type="button" className="profile-toggle" onClick={() => setShowDropdown(prev => !prev)}>
            <div className="avatar">
              <span>{getInitials(authenticatedUser.username)}</span>
            </div>
            <div className="dropdown-arrow">
              <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L6 5L11 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>
          {showDropdown && (
            <div className="profile-dropdown">
              {userMenuItems.map((section) => section.items.map((item) => {
                const key = `${item.content}`;
                return (
                  <a
                    key={key}
                    href={item.href}
                    className="dropdown-item"
                  >
                    {item.content}
                  </a>
                );
              }))}
            </div>
          )}
        </div>
      </div>

      <form
        className="search-mobile"
        method="get"
        action={searchUrl}
      >
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          name="search_query"
        />
      </form>

      <div className="nav-tabs">
        {mainMenuItems.map((item) => (
          <div className="nav-tab-wrapper" key={item.content}>
            <a
              href={item.href}
              className={`nav-tab ${item.isActive ? 'active' : ''}`}
            >
              {item.content}
            </a>
            {item.isActive && <div className="nav-underline" />}
          </div>
        ))}
      </div>
    </header>
  );
};
NavBar.propTypes = {
  courseSearchUrl: PropTypes.string.isRequired,
  authenticatedUser: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  mainMenuItems: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['item']).isRequired,
      href: PropTypes.string,
      content: PropTypes.string.isRequired,
      isActive: PropTypes.bool,
      onClick: PropTypes.func,
    }),
  ).isRequired,
  userMenuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      link: PropTypes.string,
    }),
  ).isRequired,
};

export default NavBar;
