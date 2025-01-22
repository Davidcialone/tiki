import React from 'react';
import { formatDateTime } from '../../utils/dateFormatter';

const DataTable = ({ 
  data, 
  columns, 
  onRowClick,
  isLoading = false,
  emptyMessage = "Aucune donnée disponible"
}) => {
  if (isLoading) {
    return <div className="text-center py-4">Chargement...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="text-center py-4">{emptyMessage}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr
              key={item.id || index}
              onClick={() => onRowClick && onRowClick(item)}
              className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
            >
              {columns.map((column) => (
                <td
                  key={`${item.id || index}-${column.key}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {column.format 
                    ? column.format(item[column.key])
                    : column.type === 'datetime'
                      ? formatDateTime(item[column.key])
                      : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
