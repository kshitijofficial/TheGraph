import { useEffect, useState } from 'react';
import { createClient } from 'urql';
import './App.css';

function App() {
  const [approvals, setapprovals] = useState([]);
  const QueryURL = "https://api.studio.thegraph.com/query/51640/uniswapcon/version/latest";
  const client = createClient({
    url: QueryURL
  });
  const query =
    `
    {
      approvals(first: 5) {
        id
        owner
        spender
        amount
        transactionHash
        blockTimestamp
        blockNumber
      }
    }
  `;

  useEffect(() => {
    const getapprovals = async () => {
      const { data } = await client.query(query).toPromise();
      setapprovals(data.approvals);
    };
    getapprovals();
  }, []);

  return (
    <>
      <div>
        <h1>approvals Information</h1>
        {approvals !== null && approvals.length > 0 && approvals.map((approval) => {
          return (
            <div key={approval.id}>
              <div><b>Id:</b>{approval.id}</div><br />
              <div><b>Owner:</b>{approval.owner}</div><br />
              <div><b>Spender:</b>{approval.spender}</div><br />
              <div><b>Amount:</b>{approval.amount}</div><br />
              <div><b>TransactionHash:</b>{approval.transactionHash}</div><br />
              <div><b>BlockTimestamp:</b>{approval.blockTimestamp}</div><br />
              <div><b>BlockNumber:</b>{approval.blockNumber}</div><br />
              
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
