import React from "react";

export default function PropsTable({ rows, className }) {
  return (
    <div
      className={`mt-6 overflow-x-auto rounded-xl border border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 shadow-lg ${className || ""}`}
      style={{ fontFamily: "inherit" }}
    >
      <table className="min-w-full text-sm text-left text-neutral-200">
        <thead>
          <tr className="border-b border-neutral-800 bg-neutral-700/80">
            <th className="px-5 py-3 font-semibold text-neutral-300  rounded-tl-xl ">Name</th>
            <th className="px-5 py-3 font-semibold text-neutral-300 ">Type</th>
            <th className="px-5 py-3 font-semibold text-neutral-300 rounded-tr-xl">Default</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`
                align-top border-b border-neutral-800 transition-colors
                ${i % 2 === 0 ? "bg-neutral-900" : "bg-neutral-800"}
                hover:bg-blue-950/40 hover:border-blue-700
                group
              `}
            >
              <td className="px-5 py-4 whitespace-nowrap align-top font-mono text-xs text-neutral-100  items-center">
                <span className="inline-flex  items-center gap-2">
                  <code
                    className={`${
                      i % 2 === 0
                        ? "bg-neutral-800 text-neutral-100"
                        : "bg-neutral-900 text-neutral-100"
                    } px-2 py-0.5 rounded font-mono text-xs`}
                  >
                    {row.name}
                  </code>
                </span>
              </td>
              <td className="px-5 py-4 align-top min-w-[450px]">
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-2 mb-1">
                    <code
                      className={`${
                        i % 2 === 0
                          ? "bg-neutral-800 text-blue-300"
                          : "bg-neutral-900 text-blue-300"
                      } px-2 py-0.5 rounded font-mono text-xs`}
                    >
                      {row.type}
                    </code>
                  </span>
                  <div className="text-neutral-400 text-xs leading-relaxed">
                    {row.description}
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 whitespace-nowrap align-center ">
                <pre>

                <code
                  className={`${
                    i % 2 === 0
                    ? "bg-neutral-800 text-neutral-100"
                    : "bg-neutral-900 text-neutral-100"
                  } px-2 py-0.5 rounded font-mono text-xs`}
                >
                  {row.default}
                </code>
                  </pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
