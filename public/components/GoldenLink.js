import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

export default function GoldenLink() {
  return <Link data-test="golden-link"></Link>;
}

GoldenLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
