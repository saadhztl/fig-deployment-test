'use client';

import { cn } from '@/utils/cn';
import React, { useEffect, useState } from 'react';
import { Loader } from '../primitives/Loader';

interface Cell {
  value?: string | number | null;
  style?: React.CSSProperties;
  variant?: 'hours' | 'prices';
  rowSpan?: number;
  colSpan?: number;
  sheetName: string;
  sheetId: string;
  sheetRange: string;
  locationName?: string;
}

export const SheetTable = ({
  sheetName,
  sheetId,
  sheetRange,
  locationName,
  variant = 'hours',
}: Cell) => {
  const [data, setData] = useState<(Cell | null)[][]>([]);
  const [loading, setLoading] = useState(true);
  const [firstRow, setFirstRow] = useState<(Cell | null)[] | undefined>([]);
  const [validIndex, setvalidIndex] = useState<number>(0);
  const [tableSplit, setTableSplit] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/sheets?sheet=${sheetName}&id=${sheetId}&range=${sheetRange}`);
        const json = await res.json();
        setData(json.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [sheetName]);

  useEffect(() => {
    setFirstRow(data.find((f) => f.find((v) => v?.value !== '')));
  }, [data]);

  useEffect(() => {
    if (firstRow !== undefined) {
      const sliceIndex = firstRow.filter((h) => h?.value).at(1);
      setvalidIndex(data.indexOf(firstRow) + 1);
      setTableSplit(firstRow.indexOf(sliceIndex || null));
    }
  }, [firstRow]);

  return (
    <>
      {loading && (
        <div className="w-28 h-28">
          <Loader />
        </div>
      )}
      {!loading && variant === 'hours' ? (
        <div className="hours-table overflow-y-auto">
          <table className="">
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => {
                    if (!cell) return null; // skip merged cells
                    return (
                      <td
                        key={j}
                        style={cell.style}
                        rowSpan={cell.rowSpan}
                        colSpan={cell.colSpan}
                        className="px-2 py-1"
                      >
                        {cell.value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {!loading && variant === 'prices' ? (
        <div className="overflow-y-auto overflow-x-auto">
          <h4 className="text-orange-bright  mb-4 text-4xl font-bold font-rawson uppercase">
            {locationName ? locationName : sheetRange} Individual Lessons & Packages
          </h4>
          <table className="boder-collaspe border tracking-[2px] border-white table-fixed w-full mb-10">
            <thead className="text-left hidden lg:table-header-group">
              <tr>
                <th className="px-2 py-1 border border-white"></th>
                {data[validIndex]
                  .map((head) => head)
                  .slice(2, tableSplit)
                  .map((v, i) => {
                    return (
                      <th
                        key={i}
                        style={undefined}
                        rowSpan={v?.rowSpan}
                        colSpan={v?.colSpan}
                        className="px-2 py-1 bg-orange-bright font-rawson font-black uppercase text-base text-dark p-2.5 text-left border border-white"
                      >
                        {v?.value}
                      </th>
                    );
                  })}
              </tr>
            </thead>
            <tbody>
              {data.slice(validIndex + 1).map((row, i) => (
                <tr key={i}>
                  {row.slice(1, tableSplit).map((cell, j) => {
                    if (!cell) return null; // skip merged cells
                    return (
                      <td
                        key={j}
                        style={undefined}
                        rowSpan={cell.rowSpan}
                        colSpan={cell.colSpan}
                        className={cn(
                          'block lg:table-cell',
                          'px-2 py-1 border-2 border-white',
                          j === 0 &&
                            'px-2 py-1 bg-orange-bright uppercase text-base font-black text-dark p-2.5 text-center lg:text-left border border-white'
                        )}
                      >
                        {j + 1 > 1 && (
                          <strong className="inline-block lg:hidden pe-2">
                            {data[validIndex][j + 1]?.value}
                          </strong>
                        )}
                        {cell.value || '---'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          <h4 className="text-orange-bright  mb-4 text-4xl font-bold font-rawson uppercase flex w-full">
            {locationName ? locationName : sheetRange} Small Group Lessons & Packages
          </h4>
          <table className="border-2 border-white w-full table-fixed tracking-[2px]">
            <thead className="text-left hidden lg:table-header-group">
              <tr>
                <th style={undefined}></th>
                {data[validIndex]
                  .map((head) => head)
                  .slice(tableSplit)
                  .map((v, i) => {
                    return (
                      <th
                        key={i}
                        style={undefined}
                        rowSpan={v?.rowSpan}
                        colSpan={v?.colSpan}
                        className="px-2 py-1 bg-orange-bright uppercase text-base font-black font-rawson text-dark p-2.5 text-left border border-white"
                      >
                        {v?.value}
                      </th>
                    );
                  })}
              </tr>
            </thead>
            <tbody>
              {data.slice(validIndex + 1).map((row, i) => {
                return (
                  <tr key={i}>
                    {row.slice(1).map((cell, j) => {
                      if (!cell) return null; // skip merged cells
                      if (j > 0 && j < tableSplit - 1) return null;
                      return (
                        <td
                          key={j}
                          style={undefined}
                          rowSpan={cell.rowSpan}
                          colSpan={cell.colSpan}
                          className={cn(
                            'block lg:table-cell',
                            'px-2 py-1 border-2 border-white',
                            j === 0 &&
                              'px-2 py-1 bg-orange-bright uppercase text-base font-black text-dark p-2.5 text-center lg:text-left border border-white'
                          )}
                        >
                          {j + 1 > 1 && (
                            <strong className="inline-block lg:hidden pe-2">
                              {data[validIndex][j + 1]?.value}
                            </strong>
                          )}
                          {cell.value || '---'}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};
