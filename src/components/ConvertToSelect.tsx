// ConvertToSelect.tsx
import React from "react";

const ConvertToSelect = ({
  conversions,
  selectedConversion,
  setConvertTo,
}: any) => (
  <div className="form-group">
    <label className="form-label">Convert to</label>
    <select
      className="form-select"
      value={selectedConversion}
      onChange={(e) => setConvertTo(e.target.value)}
    >
      <option value="">Select output format</option>
      {conversions.map((conversion: string) => (
        <option key={conversion} value={conversion}>
          {conversion}
        </option>
      ))}
    </select>
  </div>
);

export default ConvertToSelect;
