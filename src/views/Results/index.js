import React, { useState } from 'react';
import cx from 'classnames';
import titleize from 'titleize';
import useResults from '../../client/useResults';
import Spinner from '../../components/Spinner';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Results = () => {
  const { isLoading, data: results } = useResults();
  const [showResults, setShowResults] = useState(false);
  const [input, setInput] = useState('');

  const submit = (evt) => {
    evt.preventDefault();
    if (input === 'hotdogs') {
      setShowResults(true);
    }
  }

  if (isLoading) return <Spinner />;

  if (!showResults) {
    return (
      <form onSubmit={submit}> 
        <Input
          placeholder="Password"
          value={input}
          onChange={evt => setInput(evt.target.value)}
        />
        <Button type="submit">Submit</Button>
      </form>
    )
  }

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
                  <td className="py-2 px-3 text-left">{titleize(row.name)}</td>
                  <td className="py-2 px-3 text-right">{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))
      }
      <ul>
        {
          Object.values(results.radio).map((r, idx) => (
            <li className={cx({ 'bg-slate-700/25': idx % 2 === 0 }, 'py-2', 'px-3')} key={r.name}>
              <strong>{r.name}:</strong>{' '}
              <span className="text-slate-400">
                {r.results.map(r => `${titleize(r.name)}: ${r.count}`).join(', ')}
              </span>
            </li>
          ))
        }
      </ul>
    </>
  )
}

export default Results;