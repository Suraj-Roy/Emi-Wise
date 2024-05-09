/* eslint-disable */
export default function EmiBreakupComponent({ emiBreakup}) {
  return (
    <>
      <div className="overflow-auto bg-[#fb5607] font-sans p-3 drop-shadow-lg rounded-md border-solid border-2 border-[#000814] row-span-2 max-w-[800px] max-h-[850px]">
        <div className="p-3">
          <h3 className="text-center text-white">Amortisation Schedule</h3>
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead>
              <tr>
                <th className="p-3 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  Month
                </th>
                <th className="p-3  text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  Principal
                </th>
                <th className="p-3  text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  Interest
                </th>
                <th className="p-3  text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  Gst
                </th>
                <th className="p-3  text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                  Total Amount
                </th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">
              {/* Table rows */}
              {emiBreakup.map((monthlyEmi, index) => (
                <tr key={index}>
                  <td className="p-3 whitespace-no-wrap text-white">
                    {index + 1}
                  </td>
                  <td className="p-3 whitespace-no-wrap text-white">
                    {(+monthlyEmi.principal || 0).toFixed(2)}
                  </td>
                  <td className="p-3 whitespace-no-wrap text-white">
                    {monthlyEmi.interest.toFixed(2)}
                  </td>
                  <td className="p-3 whitespace-no-wrap text-white">
                    {monthlyEmi.gst.toFixed(2)}
                  </td>
                  <td className="p-3 whitespace-no-wrap text-white">{(+((index===0)?(+monthlyEmi.total+199+0.18*199).toFixed(2):+monthlyEmi.total) || 0.00).toFixed(2)}</td>
                </tr>
              ))}

              {/* More table rows */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
