import { cn } from "@/lib/utils";

export function SpecTable({
  caption,
  headers,
  rows,
  note,
}: {
  caption: string;
  headers: string[];
  rows: string[][];
  note?: string;
}) {
  return (
    <figure className="mt-6">
      <figcaption className="mb-3 text-sm font-medium text-ink">{caption}</figcaption>
      <div className="spec-table-wrap">
        <table className="spec-table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row[0]}-${index}`}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${index}-${cellIndex}`}
                    className={cn(cellIndex === 0 && "font-medium text-ink")}
                  >
                    {cell || "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note ? <p className="mt-3 text-sm text-muted">{note}</p> : null}
    </figure>
  );
}
