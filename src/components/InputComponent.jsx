/* eslint-disable */
export default function InputComponent({handleInputChange, userInputProps}) {
  let evalClick = ( +userInputProps.intRate >0 && +userInputProps.month >0 && +userInputProps.amount >0 && +userInputProps.processingFees>=0);

  return (
    <>
      <div className="bg-[#fb5607] font-sans p-3 drop-shadow-lg rounded-md border-solid border-2 border-[#000814] text-white">
        <h3 className="text-center">Give Input</h3>
        <div className="p-3 grid md:grid-rows-2 md:grid-flow-col gap-2 mx-auto justify-center">
          <div className="">
            <label htmlFor="amount">Amount*</label> <br />
            <input
              className="text-black p-2 rounded-md"
              type="Number"
              id="amount"
              value={+userInputProps.amount}
              onChange={(event)=>{handleInputChange('amount',event.target.value)}}
              disabled={userInputProps.shouldGenerate}
              min={1}
            />
          </div>
          <div className="">
            <label htmlFor="intRt">Interest Rate*</label> <br />
            <input
              className="text-black p-2 rounded-md"
              type="Number"
              id="intRt"
              value={+userInputProps.intRate}
              onChange={(event)=>{handleInputChange('intRate',event.target.value)}}
              disabled={userInputProps.shouldGenerate}
              min={1}
            />
          </div>
          <div className="">
            <label htmlFor="months">Months*</label> <br />
            <input
              className="text-black p-2 rounded-md"
              type="Number"
              id="months"
              value={+userInputProps.month}
              onChange={(event)=>{handleInputChange('month',event.target.value)}}
              disabled={userInputProps.shouldGenerate}
              min={1}
            />
          </div>
          <div className="">
            <label htmlFor="pfee">Processing Fees</label> <br />
            <input
              className="text-black p-2 rounded-md"
              type="Number"
              id="pfee"
              value={+userInputProps.processingFees}
              onChange={(event)=>{handleInputChange('processingFees',event.target.value)}}
              disabled={userInputProps.shouldGenerate}
              min={1}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button className="mx-auto p-3 rounded-md text-white bg-[#14213d]"
          onClick={(!evalClick)?'hi':()=>handleInputChange('shouldGenerate',!userInputProps.shouldGenerate)}>
            {(userInputProps.shouldGenerate === true)?'Edit':'Generate'}
          </button>
        </div>
      </div>
    </>
  );
}
