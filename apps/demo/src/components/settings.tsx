export enum ParentType {
  DOCUMENT,
  SCROLLABLE_CONTAINER,
}

export type SettingsValues = {
  parentType: ParentType;
  isContentVisible: boolean;
};

type SettingsProps = {
  values: SettingsValues;
  onChange: (values: SettingsValues) => void;
};

export function Settings({ values, onChange }: SettingsProps) {
  return (
    <div className="rounded border p-2">
      <label
        className="block select-none font-semibold [&>*]:ml-2"
        htmlFor="parentType"
      >
        Parent Type
        <select
          id="parentType"
          className="rounded border p-1"
          value={values.parentType}
          onChange={(e) => {
            onChange({
              ...values,
              parentType: e.target.value as unknown as ParentType,
            });
          }}
        >
          <option value={ParentType.DOCUMENT}>Document</option>
          <option value={ParentType.SCROLLABLE_CONTAINER}>
            Scrollable Container
          </option>
        </select>
      </label>
      <label className="block select-none font-semibold [&>*]:ml-2">
        <input
          type="checkbox"
          className="mb-1 mr-2 mt-2"
          checked={values.isContentVisible}
          onChange={(e) => {
            onChange({ ...values, isContentVisible: e.target.checked });
          }}
        />
        Show Content
      </label>
    </div>
  );
}
