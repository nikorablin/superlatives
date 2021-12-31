import React from 'react';
import cx from 'classnames';
import useResults from '../../client/useResults';
import Spinner from '../../components/Spinner';

const Results = () => {
  const { isLoading, data: results } = useResults();
  if (isLoading) return <Spinner />;

  return (
    <>
      <h1 className="m-8 font-serif text-center text-rose-600 text-3xl font-bold">
        Results
      </h1>
      {
        Object.values(results.text).map(r => (
          <table className="min-w-full mb-4 rounded overflow-hidden" key={r.name}>
            <thead className="bg-slate-900/75">
              <tr>
                <th colSpan="2" className="py-2 px-3 text-left">{r.name}</th>
              </tr>
            </thead>
            <tbody>
              {r.results.map((row, idx) => (
                <tr className={cx({ 'bg-slate-700/25': idx % 2 === 0 })} key={row.name}>
                  <td className="py-2 px-3 text-left">{row.name}</td>
                  <td className="py-2 px-3 text-right">{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))
      }
      <ul>
        {
          Object.values(results.radio).map(r => (
            <li className="mb-2" key={r.name}><strong>{r.name}:</strong> <span className="text-slate-400">{r.result}</span></li>
          ))
        }
      </ul>
    </>
  )
}

export default Results;