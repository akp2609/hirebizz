import React from 'react'

const GithubLoginButton = () => {
  const handleGitHubLogin = () => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID
    const redirectUri = "http://local:3000/github/callback";

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email`;

    window.location.href = githubAuthUrl;
  }
  return (
    <button
      onClick={handleGitHubLogin}
      className="flex items-center gap-1 bg-black text-white px-2 py-1 rounded-2xl hover:bg-gray-600 transition"
    >
      <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub logo" className="w-6 h-6" />
      <span>Sign in with GitHub</span>
    </button>
  )
}

export default GithubLoginButton
