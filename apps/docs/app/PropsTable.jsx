import React from "react";

export default function PropsTable({ rows, className }) {
  return (
    <div
      className={`
        mt-6 overflow-x-auto rounded-xl border shadow-lg
        border-neutral-200 bg-gradient-to-br from-white via-neutral-50 to-white
        dark:border-neutral-800 dark:bg-gradient-to-br dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900
        ${className || ""}
      `}
      style={{ fontFamily: "inherit" }}
    >
      <table className="min-w-full text-sm text-left text-neutral-800 dark:text-neutral-200">
        <thead>
          <tr className="
            border-b border-neutral-200 bg-neutral-100/80
            dark:border-neutral-800 dark:bg-neutral-700/80
          ">
            <th className="
              px-5 py-3 font-semibold rounded-tl-xl
              text-neutral-700
              dark:text-neutral-300
            ">
              Name
            </th>
            <th className="
              px-5 py-3 font-semibold
              text-neutral-700
              dark:text-neutral-300
            ">
              Type
            </th>
            <th className="
              px-5 py-3 font-semibold rounded-tr-xl
              text-neutral-700
              dark:text-neutral-300
            ">
              Default
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`
                align-top border-b transition-colors group
                border-neutral-200 hover:border-blue-400
                dark:border-neutral-800 dark:hover:border-blue-700
                ${
                  i % 2 === 0 
                    ? `bg-white hover:bg-blue-50/40
                       dark:bg-neutral-900 dark:hover:bg-blue-950/40`
                    : `bg-neutral-50 hover:bg-blue-50/40
                       dark:bg-neutral-800 dark:hover:bg-blue-950/40`
                }
              `}
            >
              <td className="
                px-5 py-4 whitespace-nowrap align-top font-mono text-xs items-center
                text-neutral-900
                dark:text-neutral-100
              ">
                <span className="inline-flex items-center gap-2">
                  <code
                    className={`
                      px-2 py-0.5 rounded font-mono text-xs
                      ${
                        i % 2 === 0
                          ? `bg-neutral-100 text-neutral-900
                             dark:bg-neutral-800 dark:text-neutral-100`
                          : `bg-white text-neutral-900
                             dark:bg-neutral-900 dark:text-neutral-100`
                      }
                    `}
                  >
                    {row.name}
                  </code>
                </span>
              </td>
              <td className="px-5 py-4 align-top min-w-[450px]">
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-2 mb-1">
                    <code
                      className={`
                        px-2 py-0.5 rounded font-mono text-xs
                        ${
                          i % 2 === 0
                            ? `bg-neutral-100 text-blue-600
                               dark:bg-neutral-800 dark:text-blue-300`
                            : `bg-white text-blue-600
                               dark:bg-neutral-900 dark:text-blue-300`
                        }
                      `}
                    >
                      {row.type}
                    </code>
                  </span>
                  <div className="
                    text-xs leading-relaxed
                    text-neutral-600
                    dark:text-neutral-400
                  ">
                    {row.description}
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 whitespace-nowrap align-center">
                <pre>
                  <code
                    className={`
                      px-2 py-0.5 rounded font-mono text-xs
                      ${
                        i % 2 === 0
                          ? `bg-neutral-100 text-neutral-900
                             dark:bg-neutral-800 dark:text-neutral-100`
                          : `bg-white text-neutral-900
                             dark:bg-neutral-900 dark:text-neutral-100`
                      }
                    `}
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