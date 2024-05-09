import { useState } from "react";
/* eslint-disable */
export default function SummaryComponent({ userInputProps, emiBreakup }) {
  const [inputClosure, setClosure] = useState({
    month: 0,
    isEditable: true,
  });
  function handleClick(field, val) {
    setClosure((prevInput) => {
      return { ...prevInput, [field]: +val };
    });
  }

  let totalGst = 0;
  let totalInterest = 0;
  let forclosureAmt = 0;
  let principal = 0;
  let foreclosureGst = 0;
  let foreClosureCharge = 0;
  let intOfForMonth = 0;
  let gstOfForcloseMonth = 0;
  let gstOnPreoceesingFee = +userInputProps.processingFees * 0.18 || 0;
  let foreclosureTag = <></>;
  if (+userInputProps.month < +inputClosure.month) {
    foreclosureTag = (
      <p className="text-[#71fb07]">
        Input Month Should be less than equal to total tenure month
      </p>
    );
  } else if(emiBreakup && emiBreakup.length > 0) {
    if (inputClosure.month === 0) {
      for (let items of emiBreakup) {
        console.log(items)
        totalGst += +items.gst;
        totalInterest += +items.interest;
      }
    } else {
      for (let i = 0; i < Number(inputClosure.month) - 1; i++) {
        totalGst += +emiBreakup[i].gst;
        totalInterest += +emiBreakup[i].interest;
        principal += +emiBreakup[i].principal;
      }
      console.log(principal);
      foreClosureCharge = (+userInputProps.amount - principal) * 0.03;
      foreclosureGst = foreClosureCharge * 0.18;
      intOfForMonth = +emiBreakup[+inputClosure.month - 1].interest;
      gstOfForcloseMonth = +emiBreakup[+inputClosure.month - 1].gst;
      forclosureAmt = (
        +userInputProps.amount -
        principal +
        foreClosureCharge +
        foreclosureGst +
        intOfForMonth +
        gstOfForcloseMonth
      ).toFixed(2);
    }

    if (Number(inputClosure.month) === 1) {
      forclosureAmt = Number(forclosureAmt)+
        (Number(gstOnPreoceesingFee) + (Number(userInputProps.processingFees) || 0));
    }

    if (inputClosure.month > 0 && inputClosure.isEditable) {
      foreclosureTag = (
        <>
          <p>Foreclousure Month Interest: {intOfForMonth.toFixed(2)} </p>
          <p>Foreclousure Month Gst: {gstOfForcloseMonth.toFixed(2)} </p>
          <p>Foreclousure Charge: {foreClosureCharge.toFixed(2)} </p>
          <p>Foreclousure Gst On Charge: {foreclosureGst.toFixed(2)} </p>
          <p>Foreclousure Toatl Amount: {Number(forclosureAmt).toFixed(2)} </p>
        </>
      );
    }
  }

  return (
    <>
      <div className="bg-[#fb5607] font-sans p-3 drop-shadow-lg rounded-md border-solid border-2 border-[#000814] text-white ">
        <h3 className="text-center">Summary</h3>
        <div className="">
          <p>Current Interest Rate : {userInputProps.intRate}</p>
          <p>Total Interest : {totalInterest.toFixed(2)}</p>
          <p>Total Interest : {totalInterest.toFixed(2)}</p>
          <p>Total Gst : {(totalGst + gstOnPreoceesingFee).toFixed(2)}</p>
          <p>
            Total Payable Amount :
            {(
              (+userInputProps.amount || 0) +
              totalInterest +
              totalGst +
              gstOnPreoceesingFee
            ).toFixed(2)}
          </p>
          <p>
            Foreclousure Month :
            <input
              type="Number"
              className="max-w-10 rounded-md text-black p-1 mx-2"
              value={inputClosure.month}
              disabled={inputClosure.isEditable}
              onChange={(event) => handleClick("month", event.target.value)}
              min={1}
            />
            <button
              className="p-1 rounded-md bg-[#14213d] "
              onClick={() =>
                handleClick("isEditable", !inputClosure.isEditable)
              }
            >
              {inputClosure.isEditable ? "Edit" : "Save"}
            </button>
          </p>
          {foreclosureTag}
          <small>
            For first month total is accumalation of monthly component +
            precessing fee and gst acting on processing fees.
          </small>
          <br />
          <small>
            In order to gerenare Amortization schedule all fields should be positive (processing fees can be equal to 0).
          </small>
          <br />
          <small>Total gst includes gst on processing fees as well.</small>
          <br />
          <small>
            For first month foreclosure will contain processing fees and gst
            acting on it.
          </small>
        </div>
      </div>
    </>
  );
}
