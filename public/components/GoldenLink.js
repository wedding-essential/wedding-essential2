import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

export default function GoldenLink({ href, children }) {
  return (
    <a
      className="bg-gold text-gray text-lg xl:text-xl 2xl:text-4xl rounded-full py-6 px-6 my-4 text-center"
      href={href}
      data-test="golden-link"
    >
      {children}
    </a>
  );
}

GoldenLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
