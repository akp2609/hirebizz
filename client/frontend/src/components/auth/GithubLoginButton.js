import React from 'react';

const GithubLoginButton = () => {
  const handleGitHubLogin = () => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const redirectUri = "http://local:3000/github/callback";

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email`;
    window.location.href = githubAuthUrl;
  };

  return (
    <button
      onClick={handleGitHubLogin}
      className="w-full sm:w-48 h-9 flex items-center justify-center gap-2 bg-black text-white px-4 rounded-full hover:bg-gray-700 transition duration-200 text-sm sm:text-base"
    >
      <img
        src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        alt="GitHub logo"
        className="w-5 h-5"
      />
      <span>GitHub</span>
    </button>

  );
};

export default GithubLoginButton;
