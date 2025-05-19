import React from "react";

const Footer = () => {
  return (
    <footer>
      <p className="text-center text-zinc-400">
        Made with ❤️ by
        <a
          href="https://github.com/rjrahul007"
          target="_blank"
          className="text-white"
        >
          {" "}
          Rahul Jaiswal
        </a>
      </p>
      <p className="text-sm text-zinc-400 text-center mb-2">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
