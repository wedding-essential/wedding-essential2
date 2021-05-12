import React from "react";
import Image from "next/image";

export default function WELogo() {
  return (
    <div className=" w-3/4">
      <Image
        src="/we-circle-01.svg"
        layout="responsive"
        width={300}
        height={300}
      />
    </div>
  );
}
