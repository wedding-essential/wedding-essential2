import React, { useState } from "react";

function step1() {
  return <div>WeddingWizard</div>;
}
function step2() {
  return <div>WeddingWizard</div>;
}
function step3() {
  return <div>WeddingWizard</div>;
}

export default function WeddingWizard() {
  const [step, setStep] = useState(0);
  return <div>Create your wedding</div>;
}
