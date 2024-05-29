export default function Stocks(props) { return (
  <tr>
    <td>{props.name}</td>
    <td>{props.symbol}</td>
    <td>{props.industry}</td>
  </tr>
)
}