import React, { useEffect, useState } from "react";
import axios from "axios";

function Detailcard({ selectedValue, setunitprice, shoudfetch }) {
  const [vegeobject, setVegeobject] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/vegetabledata/byVegeType/${selectedValue}`)
      .then((response) => {
        const data = response.data;

        if (Array.isArray(data) && data.length > 0) {
          setVegeobject(data[0]);
          setunitprice(data[0].unitprice);
        }
      });
  }, [selectedValue, shoudfetch]);

  return (
    <div className="grid grid-row-3 space-y-3 font-medium text-lg">
      <div className="grid grid-cols-3 space-x-5 items-center">
        <div className="text-gray-600 w-36 pr-2">Vegetable</div>
        <div className="text-gray-500">:</div>
        <div
          onChange={() => setunitprice(vegeobject.unitprice)}
          className="text-gray-500"
        >
          {selectedValue}
        </div>
      </div>
      {Object.keys(vegeobject).length > 0 && (
        <>
          <div className="grid grid-cols-3 items-center space-x-5 ">
            <div className="text-gray-600 w-36 pr-2">Available Qty</div>
            <div className="text-gray-500">:</div>
            <div className="text-gray-500">{vegeobject.qty}</div>
          </div>
          <div className="grid grid-cols-3 items-center space-x-5 ">
            <div className="text-gray-600 w-36 pr-2">Unit Price</div>
            <div className="text-gray-500">:</div>
            <div className="text-gray-500">{vegeobject.unitprice}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default Detailcard;
