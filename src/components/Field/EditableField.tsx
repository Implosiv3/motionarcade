type EditableFieldProps = {
  label: string;
  name: string;
  type: "text" | "number" | "color" | "checkbox" | "select" | "range";
  options?: {
    label: string;
    value: string;
  }[];
  minValue?: number;
  maxValue?: number;
  step: number;
  value: any;
  onChange: (value: any) => void;
};

export default function EditableField({
  label,
  name,
  type,
  options = [],
  minValue = 0,
  maxValue = 100,
  step = 1,
  value,
  onChange,
}: EditableFieldProps) {
  return (
    <div
        key={name}
        className="field"
    >
      <label>{label}</label>

      {type === "checkbox" ? (
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
        />
      ) : type === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options?.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "range" ? (
        <input
          type="range"
          min={minValue}
          max={maxValue}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}