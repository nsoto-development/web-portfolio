import type { CSSProperties } from "react";
import type { ConstraintRow, OptionsMatrixRow } from "@/lib/case-studies/types";

type OptionsTableProps = {
  mode: "constraints";
  rows: ConstraintRow[];
};

type OptionsMatrixProps = {
  mode: "options";
  rows: OptionsMatrixRow[];
};

type Props = OptionsTableProps | OptionsMatrixProps;

const tableStyle: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontFamily: "var(--font-sans)",
  fontSize: "var(--text-sm)",
};

const thStyle: CSSProperties = {
  textAlign: "left",
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-2xs)",
  fontWeight: "var(--weight-semibold)",
  letterSpacing: "var(--tracking-wide)",
  textTransform: "uppercase",
  color: "var(--text-tertiary)",
  padding: "var(--space-3) var(--space-4)",
  borderBottom: "1px solid var(--border-default)",
  verticalAlign: "bottom",
};

const tdStyle: CSSProperties = {
  padding: "var(--space-4)",
  color: "var(--text-secondary)",
  lineHeight: "var(--leading-relaxed)",
  borderBottom: "1px solid var(--border-subtle)",
  verticalAlign: "top",
};

const firstColStyle: CSSProperties = {
  ...tdStyle,
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-xs)",
  color: "var(--text-primary)",
  whiteSpace: "nowrap",
};

export function OptionsTable(props: Props) {
  if (props.mode === "constraints") {
    return (
      <div className="case-study-table-wrap">
        <table style={tableStyle}>
          <caption className="case-study-sr-only">Architecture constraints</caption>
          <thead>
            <tr>
              <th scope="col" style={thStyle}>
                Constraint
              </th>
              <th scope="col" style={thStyle}>
                Implication
              </th>
            </tr>
          </thead>
          <tbody>
            {props.rows.map((row) => (
              <tr key={row.constraint}>
                <th scope="row" style={firstColStyle}>
                  {row.constraint}
                </th>
                <td style={tdStyle}>{row.implication}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="case-study-table-wrap">
      <table style={tableStyle}>
        <caption className="case-study-sr-only">Consumption options matrix</caption>
        <thead>
          <tr>
            <th scope="col" style={thStyle}>
              Option
            </th>
            <th scope="col" style={thStyle}>
              Pros
            </th>
            <th scope="col" style={thStyle}>
              Cons
            </th>
            <th scope="col" style={thStyle}>
              Verdict
            </th>
          </tr>
        </thead>
        <tbody>
          {props.rows.map((row) => (
            <tr key={row.option}>
              <th scope="row" style={firstColStyle}>
                {row.option}
              </th>
              <td style={tdStyle}>{row.pros}</td>
              <td style={tdStyle}>{row.cons}</td>
              <td style={{ ...tdStyle, fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)" }}>
                {row.verdict}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
