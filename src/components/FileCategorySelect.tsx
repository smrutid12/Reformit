import React from "react";
import { ConvertOptions } from "../utils/data";

type ConvertOptionKey = keyof ConvertOptions;

interface Props {
  fileCategory: ConvertOptionKey | "";
  setFileCategory: (value: ConvertOptionKey | "") => void;
  setFileFormat: (value: string) => void;
  setConvertTo: (value: string) => void;
  fileTypes: any;
  validFileTypes: ConvertOptionKey[];
}

const FileCategorySelect: React.FC<Props> = ({
  fileCategory,
  setFileCategory,
  setFileFormat,
  setConvertTo,
  fileTypes,
  validFileTypes,
}) => (
  <div className="form-group">
    <label className="form-label">File Category</label>
    <select
      className="form-select"
      value={fileCategory}
      onChange={(e) => {
        const val = e.target.value as ConvertOptionKey | "";
        if (val === "" || validFileTypes.includes(val as ConvertOptionKey)) {
          setFileCategory(val);
          setFileFormat("");
          setConvertTo("");
        }
      }}
    >
      <option value="">Select file category</option>
      {fileTypes &&
        Object.values(fileTypes).map((value: any, idx: number) => (
          <option key={idx} value={value.key}>
            {value.name}
          </option>
        ))}
    </select>
  </div>
);

export default FileCategorySelect;
