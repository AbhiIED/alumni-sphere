import React from "react";

export function Table({ children, className = "" }) {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">{children}</table>
    </div>
  );
}

export function TableHeader({ children }) {
  return <thead className="bg-gray-100">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>;
}

export function TableRow({ children }) {
  return <tr className="hover:bg-gray-50">{children}</tr>;
}

export function TableHead({ children }) {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
      {children}
    </th>
  );
}

export function TableCell({ children }) {
  return <td className="px-6 py-4 text-sm text-gray-700">{children}</td>;
}
