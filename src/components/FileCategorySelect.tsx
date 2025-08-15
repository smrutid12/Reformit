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

const FileCategorySelect: React.FC<Props> = ({ fileCategory }) => (
  <div className="form-group">
    <label className="form-label">File Category</label>
    <input className="form-select" type="text" value={fileCategory} disabled defaultValue="Select the file"/>
  </div>
);

export default FileCategorySelect;
